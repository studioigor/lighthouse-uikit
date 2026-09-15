/**
 * Lighthouse UIKit icon library.
 * `icon('gem')` returns an inline SVG string. Every icon is self-contained,
 * decorative (label the owning button), scalable, and contains no external URLs.
 * Utility icons inherit `color`. Game icons retain their illustrated palette.
 */

const navy = '#184c79';
const artwork = {
  lighthouse: `<path d="M7 55 17 49 47 49 57 55 57 58H7Z" fill="#70b59a"/><path d="m23 22-5 33h28l-5-33Z" fill="#fff2cf"/><path d="m22 30-1 8h22l-1-8ZM20 46l-1 7h26l-1-7" fill="#ff5f62"/><path d="M23 21V12h18v9" fill="#ffdb62"/><path d="M32 12v9"/><path d="M19 12 32 3l13 9Z" fill="#f45559"/><path d="M19 22h26v5H19Z" fill="#ee5760"/><path d="M28 55V45a4 4 0 0 1 8 0v10" fill="#f7bd42"/><path d="M29 30h5v6h-5" fill="#89cce5" stroke-width="1.8"/><path d="m8 57 7-7 8 7m18 0 6-7 9 7" fill="#9db4c0"/><path d="M5 60q8-5 16 0t18 0 20 0" fill="none" stroke="#42b8e6"/>`,
  wave: `<path d="M6 44c7-1 8-8 11-15C24 9 45 11 52 24c6 12-9 19-15 11-3-5 1-10 5-9-13-4-18 14-7 21 10 7 19 3 23-1-5 12-18 16-32 12C17 61 5 55 6 44Z" fill="#39bbef"/><path d="M13 34c4-16 19-25 31-17-9-2-16 3-18 11-1-7-6-5-7 2-2-3-5-2-6 4Z" fill="#f2ffff" stroke="none"/><path d="M9 47q6 5 13-1 5 8 13 5t17-1" fill="none" stroke="#b4f5ff"/><path d="M10 56q12 6 22 1t23-4" fill="none" stroke="#198ede"/>`,
  moon: `<circle cx="32" cy="32" r="27" fill="#3267a7"/><path d="M36 10c-13 0-24 10-24 24s13 25 27 21c7-2 12-6 15-12-12 6-26 0-29-12-2-9 2-17 11-21Z" fill="#ffd348"/><path d="M27 16c-5 9-3 22 5 29" fill="none" stroke="#fff28e"/><path d="m43 15 2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1ZM51 31l2 3 3 1-3 2v4l-3-3-4 1 1-4-2-2 4-1Z" fill="#ffe362" stroke="none"/>`,
  wind: `<path d="M9 25h28c12 0 14-16 4-16-7 0-8 9-3 10M5 34h45c10 0 10-13 2-13M10 43h22c12 0 12 16 2 16-7 0-9-10-2-11" fill="none" stroke="#48bdf3" stroke-width="6"/><path d="M10 25h20M5 34h37M11 43h12" fill="none" stroke="#e7fcff" stroke-width="2.8"/>`,
  cloud: `<path d="M17 49a11 11 0 0 1-2-22c0-11 8-18 18-16 8 1 13 7 14 14 15-2 19 23 3 24Z" fill="#bcefff"/><path d="M19 26c1-10 14-14 21-7" fill="none" stroke="#fff" stroke-width="5"/><path d="M14 43h34" fill="none" stroke="#80d8f4" stroke-width="5"/>`,
  owl: `<path d="m12 21-2-13 17 6h10L54 8l-2 15c9 23-1 36-20 36S5 46 12 21Z" fill="#876fb2"/><path d="M32 30c-8-19-24-10-20 7 2 9 11 17 20 16 10 0 18-7 20-16 4-17-12-26-20-7Z" fill="#fff5dd"/><ellipse cx="23" cy="32" rx="6" ry="8" fill="#17375a" stroke="none"/><ellipse cx="42" cy="32" rx="6" ry="8" fill="#17375a" stroke="none"/><circle cx="24" cy="29" r="2.5" fill="white" stroke="none"/><circle cx="43" cy="29" r="2.5" fill="white" stroke="none"/><path d="m27 41 5 9 5-9-5-3Z" fill="#ffbf41" stroke-width="1.8"/>`,
  storm: `<path d="M14 42C0 40 4 23 17 23c1-17 26-18 30-2 17-1 20 23 3 24Z" fill="#537fba"/><path d="M21 21c4-9 17-9 22 0" fill="none" stroke="#82addc" stroke-width="5"/><path d="m30 32-8 16h9l-4 14 19-24H35l5-6Z" fill="#ffdc59"/><path d="m28 39-3 6h8" fill="none" stroke="#fff4a4" stroke-width="2"/>`,
  gem: `<path d="m19 8 21-2 15 16-5 24-20 14L10 47 6 26Z" fill="#ae6af0"/><path d="m19 8 4 13-7 25-6 1-4-21Zm4 13 17-15-3 14-10 24-11 2Z" fill="#e2b6ff" stroke="#8852c0" stroke-width="1.6"/><path d="m37 20 18 2-5 24-20 14-3-16Z" fill="#9854da" stroke="#8852c0" stroke-width="1.6"/><path d="m23 21 14-1 5 12-15 12-11 2Z" fill="#c78bf8" stroke="#8852c0" stroke-width="1.6"/><path d="m15 25 7-10 12-2" fill="none" stroke="#f8e4ff" stroke-width="3.5"/>`,
  drop: `<path d="M32 5C28 15 11 32 11 42a21 21 0 0 0 42 0C53 32 37 15 32 5Z" fill="#35b7f5"/><path d="M19 38c-3 8 1 16 9 18" fill="none" stroke="#bdf6ff" stroke-width="4.5"/><path d="M45 38c3 8-2 16-8 18" fill="none" stroke="#1b98dc" stroke-width="3"/>`,
  coin: `<circle cx="32" cy="32" r="26" fill="#ffcf45" stroke="#dba632"/><circle cx="32" cy="32" r="20" fill="#ffe179" stroke="#ffefac" stroke-width="3"/><path d="m32 18 4 9 10 1-8 7 2 11-8-6-9 6 2-11-8-7 11-1Z" fill="#f7b92c" stroke="#e5aa28" stroke-width="1.4"/><path d="M12 26a22 22 0 0 1 17-15" fill="none" stroke="#fff9cf" stroke-width="3"/>`,
  lantern: `<path d="M23 14V9a9 9 0 0 1 18 0v5" fill="none"/><path d="m22 15-4 35h28l-4-35Z" fill="#ffd662"/><path d="M23 15h18l-2-7H25Z" fill="#be774b"/><path d="M18 48h28l3 8H15Z" fill="#537ba1"/><path d="M31 24c-6 8-9 14-1 17 10 4 13-6 7-12 0 4-3 4-3 0Z" fill="#fff6c6" stroke="#f3aa37" stroke-width="1.8"/><path d="m22 16 3 33m17-33-3 33" fill="none"/><path d="M19 19h26"/>`,
  turret: `<path d="m27 38-9 17H9l7-5 5-18m16 6 10 17h9l-8-5-5-18" fill="#83a997"/><path d="M23 29h18v16H23Z" fill="#669480"/><path d="M23 39h18"/><path d="M19 12h29q7 0 7 7v11q0 5-7 5H19Z" fill="#9bc4a0"/><path d="M40 15h10v16H40Z" fill="#5e9478"/><path d="M9 18h22v11H9Z" fill="#728d9a"/><ellipse cx="8" cy="23.5" rx="5" ry="7" fill="#455e78"/><ellipse cx="8" cy="23.5" rx="2" ry="3" fill="#223d5c" stroke="none"/><rect x="42" y="19" width="5" height="8" rx="1" fill="#c8f96b" stroke="none"/><path d="M25 17h9" stroke="#d1edbd" stroke-width="3"/>`,
  mine: `<path d="m28 8 4-6 4 6 2 9 10-7 5 3-3 7 7 5 5 5-7 4 3 13-4 5-10-3-5 11h-7l-3-9-11 3-6-4 3-10-10-7 2-6 11-2-4-11 5-4 9 8Z" fill="#c69862"/><circle cx="33" cy="33" r="19" fill="#b0b6b3"/><path d="M19 28c4-12 18-13 25-6" fill="none" stroke="#e9e1c8" stroke-width="4"/><path d="M18 40q15 10 30-1" fill="none" stroke="#747e80"/><circle cx="28" cy="25" r="3" fill="#edb954"/><circle cx="43" cy="32" r="3" fill="#edb954"/><circle cx="29" cy="41" r="3" fill="#edb954"/>`,
  bolt: `<path d="M29 5 11 35h16l-6 24 32-37H35l8-17Z" fill="#ffce45"/><path d="m31 11-12 19h12" fill="none" stroke="#fff1a1" stroke-width="4"/><path d="m36 28 9-1-17 22" fill="none" stroke="#f6b030" stroke-width="2.5"/>`,
  bag: `<path d="M23 15V10a9 9 0 0 1 18 0v5" fill="none" stroke-width="5"/><path d="M17 14h30c7 1 10 37 4 43H13c-6-6-3-42 4-43Z" fill="#438ad0"/><path d="M18 17h27v19H18Z" fill="#78c1ef"/><path d="M15 38h35v16H15Z" fill="#397bbc"/><path d="M29 35h7v9h-7Z" fill="#ffe078"/><path d="M17 20v10" stroke="#bdeaff" stroke-width="3"/>`,
  shield: `<path d="m32 5 23 9v18C55 45 40 55 32 60 24 55 9 45 9 32V14Z" fill="#64a5da"/><path d="m32 12 17 7v13c0 9-10 18-17 23-7-5-17-14-17-23V19Z" fill="#347ab9" stroke="#a4daee" stroke-width="2"/><path d="m32 21 4 8 9 1-7 6 2 9-8-4-8 4 2-9-7-6 9-1Z" fill="#b8e8f4" stroke="none"/>`,
  target: `<circle cx="32" cy="32" r="23" fill="#4cb8ed"/><circle cx="32" cy="32" r="16" fill="none" stroke="#f4ffff" stroke-width="3"/><circle cx="32" cy="32" r="7" fill="none" stroke="#f4ffff" stroke-width="3"/><path d="M32 4v16m0 24v16M4 32h16m24 0h16" stroke="#fff" stroke-width="4"/>`,
  rotate: `<path d="M13 24a21 21 0 0 1 35-9l5 6M51 40A21 21 0 0 1 16 49l-5-6" fill="none" stroke="#44b4ef" stroke-width="8"/><path d="m41 23 15-1-1-15M23 41 8 42l1 15" fill="none" stroke="#44b4ef" stroke-width="7"/><path d="M15 23a18 18 0 0 1 17-13m17 31a18 18 0 0 1-17 13" fill="none" stroke="#b5efff" stroke-width="2.5"/>`,
  flame: `<path d="M34 4C40 20 52 27 53 40c1 13-9 21-21 21S10 53 11 39c0-8 7-17 13-23-1 12 4 15 5 6Z" fill="#50b9ef"/><path d="M33 27c2 10 11 14 10 22-1 7-5 11-11 11-8 0-13-6-12-13 0-4 3-9 6-12-1 6 2 8 4 5Z" fill="#f3ffff" stroke="none"/><path d="M17 41c-1 6 1 10 5 13" fill="none" stroke="#b5efff" stroke-width="3"/>`,
  arrow: `<path d="M8 23h26V12l23 20-23 20V41H8Z" fill="#5abef1"/><path d="M12 28h27V23l10 9" fill="none" stroke="#ccf6ff" stroke-width="3"/>`,
  burst: `<path d="m32 3 7 17 18-8-7 18 12 8-19 5 3 18-14-12-14 12 3-18-19-5 13-8-8-18 18 8Z" fill="#bceeff"/><path d="m32 14 4 14 13-6-6 12 9 3-15 2 2 10-7-7-8 7 2-10-14-2 10-3-7-12 13 6Z" fill="#f3ffff" stroke="none"/>`,
  gift: `<path d="M11 28h42v30H11Z" fill="#48a6de"/><path d="M7 20h50v12H7Z" fill="#7cd0ef"/><path d="M27 20h10v38H27Z" fill="#ffdb6d"/><path d="M32 20C5 19 12 0 23 7c5 3 7 8 9 13Zm0 0C59 19 52 0 41 7c-5 3-7 8-9 13Z" fill="#ffe38a"/><path d="M15 24h9" stroke="#c7f5ff" stroke-width="3"/>`,
  heart: `<path d="M32 58C18 49 5 38 5 23 5 6 25 2 32 17 39 2 59 6 59 23 59 38 46 49 32 58Z" fill="#ff6680"/><path d="M12 23c0-8 8-13 14-6" fill="none" stroke="#ffbdca" stroke-width="4"/>`,
  star: `<path d="m32 4 9 18 20 3-15 15 4 20-18-10-18 10 4-20L3 25l20-3Z" fill="#ffd75a"/><path d="m31 13-7 15-12 1" fill="none" stroke="#fff4ac" stroke-width="4"/>`,
  compass: `<circle cx="32" cy="34" r="25" fill="#fff0b7"/><circle cx="32" cy="34" r="19" fill="#d8f4f3" stroke="#c4a861"/><path d="m22 44 7-13 13-7-7 13Z" fill="#ff6870"/><path d="m22 44 7-13 6 6Z" fill="#71b8d3"/><circle cx="32" cy="34" r="2" fill="#fff8d8" stroke="none"/><path d="M26 8V5h12v3" fill="none"/><path d="M32 17v4m0 26v4M15 34h4m26 0h4" stroke="#6a9cab" stroke-width="2"/>`
};

const utility = {
  check: '<path d="m5 12 4 4L19 6"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  code: '<path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16"/>',
  copy: '<rect x="8" y="8" width="12" height="13" rx="3"/><path d="M15 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  sliders: '<path d="M4 7h5m4 0h7M4 17h10m4 0h2M9 4v6m5 4v6"/><rect x="8" y="5" width="4" height="4" rx="1" fill="currentColor" stroke="none"/><rect x="13" y="15" width="4" height="4" rx="1" fill="currentColor" stroke="none"/>',
  anchor: '<circle cx="12" cy="5" r="3"/><path d="M12 8v13M7 11h10M4 15c0 8 16 8 16 0M2 17l2-2 2 2m12 0 2-2 2 2"/>',
  settings: '<path d="m10 3-.6 3-2.5 1.5L4 7l-2 4 2.3 2-.1 3L3 18l3 3 3-1 3 1 2 1 3-2 .5-3 2.5-1.5 2-1-.5-4-3-1.5-1.5-2-.5-3-4-1Z"/><circle cx="12" cy="12" r="3"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  volume: '<path d="m11 4-6 5H2v6h3l6 5ZM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  'arrow-right': '<path d="M3 12h18m-7-7 7 7-7 7"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  external: '<path d="M14 3h7v7m0-7L10 14m10 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5"/>',
  expand: '<path d="M8 3H3v5m0-5 6 6m7-6h5v5m0-5-6 6M3 16v5h5m-5 0 6-6m12 1v5h-5m5 0-6-6"/>'
};

/** Available icon names, in catalog order. */
export const iconNames = Object.freeze([...Object.keys(artwork), ...Object.keys(utility)]);

function escapeAttribute(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

/**
 * @param {string} name One of iconNames.
 * @param {string} [className=''] Additional CSS classes.
 * @returns {string} Decorative inline SVG. Provide accessible text on its parent.
 */
export function icon(name, className = '') {
  const isArt = Object.hasOwn(artwork, name);
  const isUtility = Object.hasOwn(utility, name);
  const classes = escapeAttribute(`icon ${isArt ? 'icon--art' : 'icon--utility'} ${className}`.trim());
  const body = isArt ? artwork[name] : isUtility ? utility[name] : utility.grid;
  return `<svg xmlns="http://www.w3.org/2000/svg" class="${classes}" viewBox="0 0 ${isArt ? '64 64' : '24 24'}" width="1em" height="1em" fill="none" stroke="${isArt ? navy : 'currentColor'}" stroke-width="${isArt ? '2.5' : '2'}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}
