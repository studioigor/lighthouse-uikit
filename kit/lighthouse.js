/**
 * Lighthouse UIKit · v1.0 · no dependencies
 * import { initLighthouse, toast, openDialog, closeDialog } from './kit/lighthouse.js';
 * const destroy = initLighthouse(document); // call again after mounting new content
 * toast('Build saved', { tone: 'success', duration: 4000 });
 *
 * Tabs: [data-lh-tabs] owns [role="tab"][aria-controls="panel-id"].
 * Dialogs: [data-lh-open-dialog="dialog-id"], [data-lh-close-dialog].
 * Dismiss: [data-lh-dismiss] inside a .lh-toast or [data-lh-notification].
 */

const initializedRoots = new WeakMap();
const dialogReturnFocus = new WeakMap();
const activeToasts = new WeakMap();

function getDocument(node) {
  return node?.ownerDocument || (node?.nodeType === 9 ? node : document);
}

function resolveDialog(value, doc = document) {
  if (typeof value === 'string') return doc.getElementById(value.replace(/^#/, ''));
  return value;
}

/** Open a native modal dialog. Returns false for invalid/already-open targets. */
export function openDialog(value) {
  const dialog = resolveDialog(value);
  if (!dialog || dialog.tagName !== 'DIALOG' || dialog.open) return false;
  const doc = getDocument(dialog);
  dialogReturnFocus.set(dialog, doc.activeElement);
  dialog.addEventListener('close', () => {
    const target = dialogReturnFocus.get(dialog);
    dialogReturnFocus.delete(dialog);
    if (target?.isConnected && typeof target.focus === 'function') target.focus({ preventScroll: true });
  }, { once: true });
  dialog.showModal();
  return true;
}

/** Close a dialog, preserving native returnValue and focus restoration. */
export function closeDialog(value, returnValue = '') {
  const dialog = resolveDialog(value);
  if (!dialog || dialog.tagName !== 'DIALOG' || !dialog.open) return false;
  dialog.close(returnValue);
  return true;
}

function groupTabs(group) {
  return [...group.querySelectorAll('[role="tab"]')]
    .filter(tab => tab.closest('[data-lh-tabs]') === group);
}

function enabledTabs(group) {
  return groupTabs(group).filter(tab => !tab.disabled && tab.getAttribute('aria-disabled') !== 'true');
}

function selectTab(tab, focus = false, notify = true) {
  const group = tab.closest('[data-lh-tabs]');
  if (!group || tab.disabled || tab.getAttribute('aria-disabled') === 'true') return;
  const doc = getDocument(group);
  for (const candidate of groupTabs(group)) {
    const selected = candidate === tab;
    candidate.setAttribute('aria-selected', String(selected));
    candidate.tabIndex = selected ? 0 : -1;
    const panelId = candidate.getAttribute('aria-controls');
    const panel = panelId ? doc.getElementById(panelId) : null;
    if (panel) {
      panel.hidden = !selected;
      if (!panel.hasAttribute('role')) panel.setAttribute('role', 'tabpanel');
      if (candidate.id && !panel.hasAttribute('aria-labelledby')) panel.setAttribute('aria-labelledby', candidate.id);
    }
  }
  if (focus) tab.focus();
  if (notify) group.dispatchEvent(new CustomEvent('lh:tabchange', { bubbles: true, detail: { tab, panelId: tab.getAttribute('aria-controls') } }));
}

function updateRange(range) {
  const min = Number(range.min) || 0;
  const max = range.max === '' ? 100 : Number(range.max);
  const fill = max > min ? (Number(range.value) - min) / (max - min) * 100 : 0;
  range.style.setProperty('--lh-range-fill', `${Math.min(100, Math.max(0, fill))}%`);
}

function within(root, selector) {
  const found = [...root.querySelectorAll(selector)];
  if (root.matches?.(selector)) found.unshift(root);
  return found;
}

/**
 * Install delegated behavior. Safe to call repeatedly on the same root;
 * repeated calls initialize newly mounted tabs/ranges without duplicate listeners.
 * Returns a cleanup function for the listeners attached to that root.
 */
export function initLighthouse(root = document) {
  for (const group of within(root, '[data-lh-tabs]')) {
    const tabs = enabledTabs(group);
    const selected = tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0];
    if (selected) selectTab(selected, false, false);
  }
  for (const range of within(root, 'input.lh-range[type="range"]')) updateRange(range);
  if (initializedRoots.has(root)) return initializedRoots.get(root);

  const onClick = event => {
    if (!(event.target instanceof Element)) return;
    const target = event.target;
    const disabled = target.closest('[aria-disabled="true"]');
    if (disabled?.matches('.lh-button, .lh-tab, [role="tab"]')) {
      event.preventDefault();
      return;
    }
    const tab = target.closest('[role="tab"]');
    if (tab?.closest('[data-lh-tabs]')) {
      event.preventDefault();
      selectTab(tab);
      return;
    }
    const opener = target.closest('[data-lh-open-dialog]');
    if (opener) {
      event.preventDefault();
      openDialog(resolveDialog(opener.dataset.lhOpenDialog, getDocument(root)));
      return;
    }
    const closer = target.closest('[data-lh-close-dialog]');
    if (closer) {
      event.preventDefault();
      closeDialog(closer.closest('dialog'));
      return;
    }
    const dismiss = target.closest('[data-lh-dismiss]');
    if (dismiss) {
      const notification = dismiss.closest('.lh-toast, [data-lh-notification]');
      if (notification) {
        const dispose = activeToasts.get(notification);
        if (dispose) dispose();
        else notification.remove();
      }
    }
  };

  const onKeyDown = event => {
    if (!(event.target instanceof Element)) return;
    const tab = event.target.closest('[role="tab"]');
    const group = tab?.closest('[data-lh-tabs]');
    if (!group) return;
    const tabs = enabledTabs(group);
    const current = tabs.indexOf(tab);
    if (current < 0) return;
    const tablist = tab.closest('[role="tablist"]');
    const vertical = (tablist || group).getAttribute('aria-orientation') === 'vertical';
    const rtl = getComputedStyle(group).direction === 'rtl';
    let next;
    if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else if (event.key === (vertical ? 'ArrowDown' : rtl ? 'ArrowLeft' : 'ArrowRight')) next = (current + 1) % tabs.length;
    else if (event.key === (vertical ? 'ArrowUp' : rtl ? 'ArrowRight' : 'ArrowLeft')) next = (current - 1 + tabs.length) % tabs.length;
    if (next !== undefined) {
      event.preventDefault();
      selectTab(tabs[next], true);
    }
  };

  const onInput = event => {
    if (event.target?.matches?.('input.lh-range[type="range"]')) updateRange(event.target);
  };
  const onReset = event => {
    // A form's native values reset after dispatching its reset event.
    queueMicrotask(() => {
      if (event.defaultPrevented) return;
      for (const range of within(event.target, 'input.lh-range[type="range"]')) updateRange(range);
    });
  };
  root.addEventListener('click', onClick);
  root.addEventListener('keydown', onKeyDown);
  root.addEventListener('input', onInput);
  root.addEventListener('reset', onReset);
  const cleanup = () => {
    root.removeEventListener('click', onClick);
    root.removeEventListener('keydown', onKeyDown);
    root.removeEventListener('input', onInput);
    root.removeEventListener('reset', onReset);
    initializedRoots.delete(root);
  };
  initializedRoots.set(root, cleanup);
  return cleanup;
}

/**
 * Announce safe plain text in a dismissible toast. Returns { element, dismiss }.
 * tone: info | success | warning | danger | error. duration: ms, 0 = persistent.
 * Expiration pauses while the notification is hovered or keyboard-focused.
 */
export function toast(message, { tone = 'success', duration = 4000 } = {}) {
  const allowedTones = new Set(['info', 'success', 'warning', 'danger', 'error']);
  const safeTone = allowedTones.has(tone) ? tone : 'info';
  let region = document.querySelector('.lh-toast-region');
  if (!region) {
    region = document.createElement('div');
    region.className = 'lh-toast-region';
    region.setAttribute('aria-label', 'Уведомления');
    document.body.append(region);
  }
  const element = document.createElement('div');
  element.className = `lh-toast lh-toast--${safeTone}`;
  element.setAttribute('role', safeTone === 'error' || safeTone === 'danger' ? 'alert' : 'status');
  element.setAttribute('aria-atomic', 'true');
  const text = document.createElement('span');
  text.className = 'lh-toast__message';
  text.textContent = String(message);
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'lh-toast__close';
  close.setAttribute('aria-label', 'Закрыть уведомление');
  close.textContent = '×';
  element.append(text, close);
  region.append(element);

  let remaining = Math.max(0, Number(duration) || 0);
  let startedAt = 0;
  let timer;
  let removed = false;
  let hovered = false;
  let focused = false;
  const dismiss = () => {
    if (removed) return;
    removed = true;
    clearTimeout(timer);
    activeToasts.delete(element);
    element.remove();
    if (!region.children.length) region.remove();
  };
  const pause = () => {
    if (!timer) return;
    remaining = Math.max(0, remaining - (performance.now() - startedAt));
    clearTimeout(timer);
    timer = undefined;
  };
  const resume = () => {
    if (!remaining || removed || hovered || focused || timer) return;
    startedAt = performance.now();
    timer = setTimeout(dismiss, remaining);
  };
  close.addEventListener('click', dismiss);
  element.addEventListener('pointerenter', () => { hovered = true; pause(); });
  element.addEventListener('pointerleave', () => { hovered = false; resume(); });
  element.addEventListener('focusin', () => { focused = true; pause(); });
  element.addEventListener('focusout', event => {
    if (!element.contains(event.relatedTarget)) { focused = false; resume(); }
  });
  activeToasts.set(element, dismiss);
  resume();
  return { element, dismiss };
}
