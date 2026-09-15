/** Lighthouse reference game UI. Native, resizable markup + optional game state.
 * mountGameUI(element, options) returns { setScreen, setLongText, reset, destroy }.
 * onAction(action, detail) is the integration point for your game engine.
 */
import {icon} from './icons.js';
import {toast} from './lighthouse.js';
const asset = new URL('../assets/sprites/', import.meta.url).href;
const escapeHTML = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sprite=(name,cls='',alt='')=>`<img src="${asset}${name}.png" class="${cls}" alt="${escapeHTML(alt)}" draggable="false">`;
const bird=`<svg class="ref-bird" aria-hidden="true" viewBox="0 0 40 24"><path d="M4 10q9-10 16 2 9-12 17-2" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>`;
const header=(title,id)=>`<header class="lh-panel__header">${sprite('header-lighthouse')}<h2 class="lh-panel__title">${escapeHTML(title)}</h2><button class="lh-panel__close" data-ref-close="${id}" aria-label="Close ${escapeHTML(title)}">${icon('close')}</button></header>`;
const dots=(level,count=6)=>`<span class="ref-dots" aria-label="Level ${level} of ${count}">${Array.from({length:count},(_,i)=>`<i class="ref-dot${i<level?' filled':''}"></i>`).join('')}</span>`;
const done=(complete,label='DONE')=>`<span class="ref-done${complete?'':' is-locked'}" ${complete?'':'aria-label="Locked"'}>${icon(complete?'check':'lock')}${complete?`<span>${label}</span>`:''}</span>`;
export const defaultAchievements=[
 {icon:'wave',name:'First Light',description:'Survive 1 wave',done:true},
 {icon:'moon',name:'First Night',description:'Survive 5 waves',done:true},
 {icon:'wind',name:'Holding the Line',description:'Survive 10 waves',done:true},
 {icon:'cloud',name:'Weathered',description:'Survive 15 waves',done:true},
 {icon:'wind2',name:'Steadfast',description:'Survive 25 waves',done:true},
 {icon:'owl',name:'Night Owl',description:'Survive 50 waves',done:false},
 {icon:'storm',name:'unyielding',description:'Survive 75 waves',done:false}
];
export function renderAchievements(items=defaultAchievements,title='ACHIEVEMENTS'){
 return `<section class="lh-panel reference-achievements" data-panel="achievements">${header(title,'achievements')}<div class="lh-panel__body"><div class="ref-achievements-list">${items.map(item=>`<div class="ref-achievement">${sprite(item.icon,'ref-achievement__art')}<div class="ref-achievement__copy"><strong>${escapeHTML(item.name)}</strong><span>${escapeHTML(item.description)}</span></div>${done(item.done)}</div>`).join('')}</div></div></section>`;
}
const lighthouses=[['Harbor','harbor-art','COMMON'],['Classic','classic-art','COMMON'],['Frost','frost-art','UNCOMMON']];
const equipment=[['Turret','turret','COMMON'],['Mine','mine','UNCOMMON'],['Arc tower','bolt','RARE']];
export function renderEquipment({category='lighthouses',selected=-1,longText=false}={}){
 const items=category==='lighthouses'?lighthouses:equipment;
 return `<section class="lh-panel reference-equipment" data-panel="equipment">${header('LIGHTHOUSES & EQUIPMENT','equipment')}<div class="lh-panel__body ref-equipment-layout"><div class="ref-collection-tabs" role="tablist" aria-label="Collection category"><button class="ref-collection-tab" role="tab" id="ref-lighthouses-tab" aria-controls="ref-collection-items" aria-selected="${category==='lighthouses'}" tabindex="${category==='lighthouses'?0:-1}" data-ref-category="lighthouses">${sprite('header-lighthouse')}<span>Lighthouses</span></button><button class="ref-collection-tab" role="tab" id="ref-equipment-tab" aria-controls="ref-collection-items" aria-selected="${category==='equipment'}" tabindex="${category==='equipment'?0:-1}" data-ref-category="equipment">${icon('bag')}<span>Equipment</span></button></div><div class="ref-collection-content" id="ref-collection-items" role="tabpanel" aria-labelledby="ref-${category}-tab">${items.map(([name,art,rarity],i)=>`<article class="ref-item"><div class="ref-item__art"><span class="ref-rarity ${rarity.toLowerCase()}">${rarity}</span>${sprite(art,'',name)}${bird}</div><h3>${escapeHTML(name)}</h3><button class="lh-button lh-button--${selected===i?'success':'primary'} ref-equip-button" data-ref-equip="${i}" aria-pressed="${selected===i}">${selected===i?'EQUIPPED':longText?'EQUIP FOR THE NEXT ADVENTURE':'EQUIP'}</button></article>`).join('')}</div></div></section>`;
}
const rewardItems=[['gem','100 Credits'],['drop','200 Credits'],['gem','300 Credits'],['gem','400 Credits'],['gem','500 Credits'],['lantern','700 Credits'],['lighthouse','The Lighthouse']];
export function renderDailyRewards({claimed=true}={}){
 return `<section class="lh-panel reference-daily" data-panel="daily">${header('DAILY REWARDS','daily')}<div class="lh-panel__body"><div class="ref-rewards">${rewardItems.map(([ico,label],i)=>`<div class="ref-reward${!claimed&&i===2?' is-current':''}"><span class="ref-reward__day">DAY ${i+1}</span><span class="ref-reward__coin">${ico==='lighthouse'?sprite('header-lighthouse'):sprite(ico==='drop'?'drop-reward':ico==='lantern'?'lantern-reward':'gem-reward','ref-medallion')}</span><strong class="ref-reward__label">${label}</strong>${done(claimed||i<2,claimed||i<2?'CLAIMED':'')}</div>`).join('')}</div><p class="ref-streak">Streak: 3 <small>(best: 7)</small></p><p class="ref-reward-next">${claimed?'Next reward in ~20h (server time)':'Your day 3 reward is ready to collect!'}</p><button class="lh-button lh-button--${claimed?'secondary':'success'} ref-claim" data-ref-claim ${claimed?'disabled':''}>${icon('gift')}${claimed?'CLAIMED':'CLAIM REWARD'}</button><div class="ref-daily-water"></div>${bird}</div></section>`;
}
const upgradeSprites=['rotate','target','flame','bag','range','burst','oil'];
export const upgradeItems=[['Rotation Speed','rotate'],['Focus Efficiency','target'],['Flame Regen','flame'],['Equipment Slots','bag'],['Beam Range','arrow-right'],['Beam Damage','burst'],['Oil Capacity','drop']];
export function renderUpgrades({active=0,levels=[1,0,0,0,0,0,0],balance=36792}={}){
 const level=levels[active],cost=115+Math.max(0,level-1)*65;
 return `<section class="lh-panel reference-upgrades" data-panel="upgrades">${header('UPGRADES','upgrades')}<div class="lh-panel__body ref-upgrade-layout"><div class="ref-upgrade-list" role="tablist" aria-orientation="vertical" aria-label="Upgrades">${upgradeItems.map(([name,ico],i)=>`<button class="ref-upgrade-option" id="upgrade-tab-${i}" data-ref-upgrade-type="${i}" aria-label="${name}" role="tab" aria-controls="ref-upgrade-details" aria-selected="${i===active}" tabindex="${i===active?0:-1}"><span class="ref-upgrade-option__icon">${sprite(upgradeSprites[i]+'-badge')}</span><span class="ref-upgrade-option__info"><strong>${name}</strong>${dots(levels[i])}</span></button>`).join('')}</div><div class="ref-upgrade-details" id="ref-upgrade-details" role="tabpanel" aria-labelledby="upgrade-tab-${active}"><div class="ref-upgrade-detail-title"><span class="ref-upgrade-option__icon">${sprite(upgradeSprites[active]+'-badge')}</span><div><h3>${upgradeItems[active][0]}</h3>${dots(level,5)}</div></div><div class="ref-upgrade-compare"><span>+${level*2}%</span><strong>${icon('chevron')} ${level===10?'MAX':`+${(level+1)*2}%`}</strong></div><div class="ref-upgrade-level">Level ${level} / 10</div><div class="ref-upgrade-buy"><button class="lh-button lh-button--primary" data-ref-upgrade ${level>=10||balance<cost?'disabled':''}>${level>=10?'MAX LEVEL':`UPGRADE · <strong>${cost}</strong>`}</button><p class="ref-upgrade-balance">Balance: ${balance} ${icon('coin')}</p></div><div class="ref-upgrade-sea"></div>${bird}</div></div></section>`;
}
const buildItems=[{name:'Turret',art:'turret',stats:'DMG 10  ·  RNG 55',description:'Auto-fires at the nearest enemy in range.'},{name:'Mine',art:'mine',stats:'DMG 40  ·  AOE 10',description:'Detonates when enemies enter its blast radius.'},{name:'Arc Tower',art:'bolt',stats:'DMG 25  ·  CHAIN 3',description:'Strikes nearby enemies with a chain of lightning.'}];
export function renderBuild({active=0,level=1,category='turret',saved=false,balance=36792}={}){
 const item=buildItems[active],cost=360+(level-1)*140;
 return `<section class="lh-panel reference-build" data-panel="build">${header('BUILD','build')}<div class="lh-panel__body ref-build-layout"><div><p class="ref-build-prompt">Choose equipment for the next match:</p><div class="ref-build-slots">${buildItems.map((it,i)=>`<button class="ref-build-slot" data-ref-slot="${i}" aria-label="Slot ${i+1}: ${it.name}" aria-pressed="${active===i}">${sprite(it.art)}<span>Slot ${i+1}</span></button>`).join('')}</div><div class="ref-build-tabs" role="tablist" aria-label="Build category"><button role="tab" aria-selected="${category==='turret'}" aria-controls="ref-build-cards" id="ref-build-turret" data-ref-build-category="turret" tabindex="${category==='turret'?0:-1}">${icon('turret')} TURRET</button><button role="tab" aria-selected="${category==='support'}" aria-controls="ref-build-cards" id="ref-build-support" data-ref-build-category="support" tabindex="${category==='support'?0:-1}">${icon('shield')} SUPPORT</button></div><div class="ref-build-cards" id="ref-build-cards" role="tabpanel" aria-labelledby="ref-build-${category}">${(category==='turret'?[0,1]:[1,2]).map(i=>`<button class="ref-build-card" data-ref-slot="${i}" aria-pressed="${active===i}">${sprite(i===0?'turret-card':i===1?'mine-card':buildItems[i].art)}<strong>${buildItems[i].name}</strong><span>${buildItems[i].stats}</span></button>`).join('')}</div></div><div class="ref-build-detail"><div class="ref-build-art ref-sea">${sprite(active===0?'turret-art':item.art)}${bird}</div><div class="ref-build-body"><h3>${item.name}</h3><div class="ref-build-stats">${item.stats}</div><p>${item.description}</p><p>Permanent level: ${level} / 5</p><button class="lh-button lh-button--primary" data-ref-build-upgrade ${level>=5||balance<cost?'disabled':''}>${level>=5?'MAX LEVEL':`UPGRADE · ${cost}`}</button><button class="lh-button lh-button--success" data-ref-save>${saved?'BUILD SAVED':'SAVE BUILD'}</button></div></div></div></section>`;
}
export function renderControls(){return `<div class="components-screen"><section class="lh-panel" data-panel="buttons">${header('BUTTONS & STATES','buttons')}<div class="lh-panel__body"><div class="component-buttons"><button class="lh-button lh-button--primary" data-ref-demo="Ready to sail!">PLAY</button><button class="lh-button lh-button--success" data-ref-demo="Your progress is saved">SAVE BUILD</button><button class="lh-button lh-button--secondary" data-ref-demo="Equipment selected">EQUIPMENT</button><button class="lh-button lh-button--danger" data-ref-demo="Return to the harbor">EXIT</button><button class="lh-button" disabled>CLAIMED</button><button class="lh-panel__close" aria-label="Close example" data-ref-demo="Close button">${icon('close')}</button></div></div></section><section class="lh-panel" data-panel="controls">${header('CONTROLS','controls')}<div class="lh-panel__body component-fields"><label class="lh-field">Captain name<input class="lh-input" placeholder="Captain Lighthouse"></label><label class="lh-switch"><input type="checkbox" checked><span>Ocean sounds</span></label><label class="lh-check"><input type="checkbox" checked><span>Show tutorial</span></label><label class="lh-field">Music volume<input class="lh-range" type="range" min="0" max="100" value="65"></label></div></section><section class="lh-panel" data-panel="progress">${header('PROGRESS','progress')}<div class="lh-panel__body component-progress"><label class="lh-field">Experience<progress class="lh-progress" value="65" max="100">65%</progress></label><label class="lh-field">Lighthouse health<progress class="lh-progress lh-progress--gold" value="80" max="100">80%</progress></label>${dots(3,5)}<div class="component-buttons">${done(true)}${done(false)}</div></div></section><section class="lh-panel" data-panel="stretch">${header('GROWS WITH CONTENT','stretch')}<div class="lh-panel__body"><div class="ref-long-copy" contenteditable="true" role="textbox" aria-label="Editable text" spellcheck="false">Edit this text. The frame grows with its contents. No fixed card size, no stretched screenshots — just your game UI.</div><button class="lh-button lh-button--primary ref-live-button" data-ref-demo="Long labels work too">A BUTTON WITH A LONGER LABEL</button></div></section></div>`;}

export function mountGameUI(root,{screen='collection',initialBalance=36792,rewardsClaimed=true,onAction=()=>{}}={}){
 if(!(root instanceof HTMLElement))throw new TypeError('mountGameUI expects an HTML element');
 const controller=new AbortController();
 let state;
 const fresh=()=>({screen,category:'lighthouses',selected:{lighthouses:-1,equipment:-1},claimed:rewardsClaimed,activeUpgrade:0,levels:[1,0,0,0,0,0,0],balance:initialBalance,activeBuild:0,buildLevels:[1,1,1],buildCategory:'turret',saved:false,closed:[],longText:false});
 state=fresh();
 function action(name,detail){onAction(name,detail);root.dispatchEvent(new CustomEvent('lighthouse:action',{detail:{action:name,...detail},bubbles:true}));}
 function paint(focusKey){
  root.classList.add('ref-ui','ref-screen');
  root.classList.toggle('screen-two',state.screen==='progression');
  if(state.screen==='collection'){
   const items=state.longText?defaultAchievements.map((it,i)=>i===0?{...it,name:'The very first light in a long and unforgettable adventure',description:'Survive the first wave and keep the lighthouse shining through the night'}:it):defaultAchievements;
   root.innerHTML=renderAchievements(items)+renderEquipment({category:state.category,selected:state.selected[state.category],longText:state.longText});
  }else if(state.screen==='progression')root.innerHTML=renderDailyRewards({claimed:state.claimed})+renderUpgrades({active:state.activeUpgrade,levels:state.levels,balance:state.balance})+renderBuild({active:state.activeBuild,level:state.buildLevels[state.activeBuild],category:state.buildCategory,saved:state.saved,balance:state.balance});
  else root.innerHTML=renderControls();
  for(const id of state.closed)root.querySelector(`[data-panel="${id}"]`)?.setAttribute('hidden','');
  if(root.querySelectorAll('[data-panel]').length&&[...root.querySelectorAll('[data-panel]')].every(el=>el.hidden))root.insertAdjacentHTML('beforeend','<div class="preview-empty">All windows are closed.<br><button class="lh-button lh-button--primary" style="margin-top:15px" data-ref-reset>RESTORE WINDOWS</button></div>');
  if(focusKey)root.querySelector(focusKey)?.focus({preventScroll:true});
 }
 root.addEventListener('click',event=>{
  const el=event.target.closest('button');if(!el||el.disabled)return;
  if(el.hasAttribute('data-ref-close')){const panel=el.dataset.refClose;state.closed.push(panel);paint();action('close',{panel});}
  if(el.hasAttribute('data-ref-reset')){state.closed=[];paint();}
  if(el.hasAttribute('data-ref-category')){state.category=el.dataset.refCategory;paint(`[data-ref-category="${state.category}"]`);action('category',{category:state.category});}
  if(el.hasAttribute('data-ref-equip')){const index=Number(el.dataset.refEquip);state.selected[state.category]=index;paint(`[data-ref-equip="${index}"]`);action('equip',{category:state.category,index});toast(`${(state.category==='lighthouses'?lighthouses:equipment)[index][0]} equipped`,{tone:'success'});}
  if(el.hasAttribute('data-ref-claim')&&!state.claimed){state.claimed=true;state.balance+=300;paint();action('claim',{reward:300,balance:state.balance});toast('+300 Credits · Daily reward claimed',{tone:'success'});}
  if(el.hasAttribute('data-ref-upgrade-type')){state.activeUpgrade=Number(el.dataset.refUpgradeType);paint(`[data-ref-upgrade-type="${state.activeUpgrade}"]`);}
  if(el.hasAttribute('data-ref-upgrade')){const i=state.activeUpgrade,cost=115+Math.max(0,state.levels[i]-1)*65;if(state.levels[i]<10&&state.balance>=cost){state.balance-=cost;state.levels[i]++;paint('[data-ref-upgrade]');action('upgrade',{index:i,level:state.levels[i],cost,balance:state.balance});toast(`${upgradeItems[i][0]} · Level ${state.levels[i]}`,{tone:'success'});}}
  if(el.hasAttribute('data-ref-slot')){state.activeBuild=Number(el.dataset.refSlot);state.saved=false;paint(`[data-ref-slot="${state.activeBuild}"]`);}
  if(el.hasAttribute('data-ref-build-category')){state.buildCategory=el.dataset.refBuildCategory;paint(`[data-ref-build-category="${state.buildCategory}"]`);}
  if(el.hasAttribute('data-ref-build-upgrade')){const i=state.activeBuild,cost=360+(state.buildLevels[i]-1)*140;if(state.buildLevels[i]<5&&state.balance>=cost){state.balance-=cost;state.buildLevels[i]++;state.saved=false;paint('[data-ref-build-upgrade]');action('equipment-upgrade',{index:i,level:state.buildLevels[i],cost,balance:state.balance});}}
  if(el.hasAttribute('data-ref-save')){state.saved=true;paint('[data-ref-save]');action('save-build',{active:state.activeBuild,levels:[...state.buildLevels],equipment:{...state.selected}});toast('Build saved. Ready for the next match!',{tone:'success'});}
  if(el.hasAttribute('data-ref-demo'))toast(el.dataset.refDemo,{tone:'success'});
 },{signal:controller.signal});
 root.addEventListener('keydown',event=>{
  const el=event.target.closest('[role="tab"]');if(!el)return;
  if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;
  event.preventDefault();const tabs=[...el.closest('[role="tablist"]').querySelectorAll('[role="tab"]')],i=tabs.indexOf(el),index=event.key==='Home'?0:event.key==='End'?tabs.length-1:(i+(['ArrowLeft','ArrowUp'].includes(event.key)?-1:1)+tabs.length)%tabs.length;tabs[index].click();
 },{signal:controller.signal});
 paint();
 return {
  setScreen(value){if(!['collection','progression','components'].includes(value))throw new RangeError('Unknown screen');state.screen=value;state.closed=[];paint();},
  setLongText(value){state.longText=Boolean(value);paint();},
  setRewardAvailable(value){state.claimed=!value;paint();},
  reset(){const current=state.screen;state=fresh();state.screen=current;paint();},
  getState(){return structuredClone(state);},
  destroy(){controller.abort();root.replaceChildren();}
 };
}
