var Z=Object.defineProperty;var Ee=Object.getOwnPropertyDescriptor;var Se=Object.getOwnPropertyNames;var xe=Object.prototype.hasOwnProperty;var We=(i,r)=>{for(var e in r)Z(i,e,{get:r[e],enumerable:!0})},Ce=(i,r,e,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of Se(r))!xe.call(i,o)&&o!==e&&Z(i,o,{get:()=>r[o],enumerable:!(t=Ee(r,o))||t.enumerable});return i};var Pe=i=>Ce(Z({},"__esModule",{value:!0}),i);var De={};We(De,{default:()=>Q});module.exports=Pe(De);var R=require("obsidian");var C=require("obsidian");var ee=Symbol.for("v1.to-use.peak-dev.org"),te=Symbol.for("v1.factory.to-use.peak-dev.org"),M,N,y=function(){return Object.defineProperties(i(),{this:{get(){if(M)return M;throw new TypeError("No current context")}},me:{value:ee},factory:{value:te}});function i(o){let n=new Map;n.prev=o;let a=Object.assign(o?s=>{let c=n.get(s);if(!c){for(let w=n.prev;w;w=w.prev)if(c=w.get(s)){c=Object.assign(Object.assign({},c),{s:c.s||1});break}c=c||{s:2,v:e},n.set(s,c)}let f,u,m;for(;;)switch(c.s){case 0:return M===a&&N&&N.push(s),c.v;case 1:if(f=c.d,!f||p(()=>f.k.every(w=>a(w)===f.c(w)))){c.s=0;break}c.v=f.f;case 2:c.s=4;try{r(n,s,0,p(u=c.v,s,m=[])),m.length&&(c.d={c:a,f:u,k:m});break}catch(w){c.s=3,c.v=w,c.d=null}case 3:throw c.v;case 4:throw new Error(`Factory ${String(c.v)} didn't resolve ${String(s)}`)}}:s=>y.this(s),{def(s,c){return r(n,s,2,c),a},set(s,c){return r(n,s,1,c),a},fork(s){let c=i(n);return s!=null?c(s):c}});return o?a.use=a:a;function p(s,c,f){let u=M,m=N;try{return M=a,N=f,s(c)}finally{M=u,N=m}}}function r(o,n,a,p){if(o.has(n)){let s=o.get(n);if(!s.s)throw new Error(`Already read: ${String(n)}`);s.s=a,s.v=p,s.d=null}else o.set(n,{s:a,v:p})}function e(o){if(typeof o[ee]=="function")return o[ee](o);if(t(o))return typeof o.prototype[te]=="function"?o.prototype[te]():new o;throw new ReferenceError(`No config for ${String(o)}`)}function t(o){return typeof o=="function"&&o.prototype!==void 0&&(Object.getPrototypeOf(o.prototype)!==Object.prototype||Object.getOwnPropertyNames(o.prototype).length>1||o.toString().startsWith("class"))}}();var pe,k=(pe=window.queueMicrotask)!=null?pe:(i=>r=>i.then(r))(Promise.resolve());y.def(C.Plugin,()=>{throw new Error("Plugin not created yet")});var g=class extends C.Component{constructor(){super(...arguments);this.use=y.service(this)}};y.service=function(i){return y(j).addChild(i),y.this};y.plugin=function(i){let r=y.fork().set(C.Plugin,i).set(i.constructor,i);return i.addChild(r.use(j)),r};var j=class extends C.Component{constructor(){super(...arguments);this.children=new Set([this])}onload(){this.loaded=!0}onunload(){this.loaded=!1,this.children.clear()}addChild(e){return this.children.has(e)||(this.children.add(e),this.loaded?k(()=>super.addChild(e)):super.addChild(e)),e}};function J(i,r){i._loaded&&i.removeChild(r)}function le(i,r){let e=new C.Component;e.onload=()=>{J(i,e),r()},i.addChild(e)}function h(i,r){let e=Object.keys(r).map(t=>Te(i,t,r[t]));return e.length===1?e[0]:function(){e.forEach(t=>t())}}function Te(i,r,e){let t=i[r],o=i.hasOwnProperty(r),n=e(t);return t&&Object.setPrototypeOf(n,t),Object.setPrototypeOf(a,n),i[r]=a,p;function a(...s){return n===t&&i[r]===a&&p(),n.apply(this,s)}function p(){i[r]===a&&(o?i[r]=t:delete i[r]),n!==t&&(n=t,Object.setPrototypeOf(a,t||Function))}}function K(i,r,e){return t[i]=i,t;function t(...o){return(r[i]===i?r:e).apply(this,o)}}var O=require("obsidian");var q=require("obsidian");function $(i){let r=app.workspace;switch(i==null?void 0:i.getRoot()){case r.rootSplit:case r.floatingSplit:case r.leftSplit:case r.rightSplit:return!0;default:return!1}}function P(i,r){if(!i)return!1;if(typeof i=="function"&&(r=i,i=app.workspace),r(i))return!0;if(i instanceof q.Workspace)return P(i.rootSplit,r)||P(i.floatingSplit,r)||P(i.leftSplit,r)||P(i.rightSplit,r);if(i instanceof q.WorkspaceParent){for(let e of i.children)if(P(e,r))return!0}return!1}function oe(i){return i&&typeof i=="object"?JSON.parse(JSON.stringify(i)):i}var A=class{constructor(r,e,t,o){this.key=e;this.defaultValue=t;this.owner=o;this.store=r.use(D)}of(r){return new A(this.store,this.key,this.defaultValue,r)}get(r=this.owner){return this.store.get(this.requires(r),this.key,this.defaultValue)}set(r,e=this.owner){this.store.set(this.requires(e),this.key,r)}unset(r=this.owner){this.store.unset(this.requires(r),this.key)}requires(r){if(r&&(r instanceof O.Workspace||r instanceof O.WorkspaceItem))return r;throw new TypeError("Setting method requires a workspace or workspace item")}onSet(r,e){return this.owner?this.store.onSet(this.key,(t,o,n)=>{t===this.owner&&r.call(e,o,n)}):this.store.onSet(this.key,r,e)}onLoadWorkspace(r,e){return this.store.onLoadWorkspace(r,e)}offref(r){this.store.offref(r)}},D=class extends g{constructor(){super(...arguments);this.loading=!1}get(e,t,o){var n,a;return(a=(n=e==null?void 0:e[L])==null?void 0:n[t])!=null?a:o}set(e,t,o){let n=e[L]||(e[L]={}),a=n[t];n[t]=o,!this.loading&&a!==o&&(app.workspace.trigger(fe+t,e,o,a),app.workspace.requestSaveLayout())}unset(e,t){let o=e[L];o!=null&&o.hasOwnProperty(t)&&(delete o[t],this.loading||app.workspace.requestSaveLayout())}onSet(e,t,o){return app.workspace.on(fe+e,t,o)}onLoadItem(e,t){return!this.loading&&app.workspace.layoutReady&&k(()=>{P(o=>{try{e.call(t)}catch(n){console.error(n)}})}),app.workspace.on(T,e,t)}onSaveItem(e,t){return app.workspace.on(de,e,t)}onLoadWorkspace(e,t){return!this.loading&&app.workspace.layoutReady&&k(()=>{try{e.call(t)}catch(o){console.error(o)}}),app.workspace.on(T+":workspace",e,t)}offref(e){app.workspace.offref(e)}onload(){let e=app.workspace;this.registerEvent(e.on(T+":start",()=>this.loading=!0)),this.registerEvent(e.on(T+":workspace",()=>this.loading=!1)),this.register(h(O.WorkspaceItem.prototype,{serialize:ue})),this.register(h(app.workspace,{getLayout:ue,setLayout(t){return K(re,t,async function(n,...a){e.trigger(T+":start");try{return he(this,n),await t.call(this,n,...a)}finally{e.trigger(T+":workspace")}})},deserializeLayout(t){return K(re,t,async function(n,...a){let p=await t.call(this,n,...a);return he(p,n),p})}}))}},ne=2,re=Symbol.for(`v${ne}.layout-storage-events.ophidian.peak-dev.org`),L="ophidian:layout-settings",T=`ophidian-layout-storage:v${ne}:item-load`,de=`ophidian-layout-storage:v${ne}:item-save`,fe="ophidian-layout-storage:set:";function ue(i){return K(re,i,function(){let e=i.call(this);return app.workspace.trigger(de,this,e),this[L]&&(e[L]=oe(this[L])),e})}function he(i,r){if(!i)return;let e=r==null?void 0:r[L];e&&(i[L]=oe(e)),app.workspace.trigger(T,i,r)}var me=require("obsidian");var B=class extends me.Component{constructor(e,t){super();this.use=e;this.container=t;this.win=this.container.win}[y.factory](){return new ie(this.constructor)}static onload(e){}static onunload(e){}},ie=class extends g{constructor(e){super();this.factory=e;this.instances=new Map;this.watching=!1;this.layoutReadyCallbacks=[]}onload(){var e,t;this.registerEvent(app.workspace.on("layout-change",()=>{app.workspace.layoutReady&&this.layoutReadyCallbacks.length&&(this.layoutReadyCallbacks.forEach(k),this.layoutReadyCallbacks=[])})),(t=(e=this.factory).onload)==null||t.call(e,this)}onLeafChange(e,t){return this.onLayoutReady(()=>e.call(t,app.workspace.activeLeaf)),app.workspace.on("active-leaf-change",o=>{app.workspace.layoutReady&&e.call(t,o)})}onLayoutReady(e){app.workspace.layoutReady?k(e):this.layoutReadyCallbacks.push(e)}onunload(){var e,t;(t=(e=this.factory).onunload)==null||t.call(e,this)}watch(){if(!this._loaded)le(this,()=>this.watch());else if(!this.watching){let{workspace:e}=app,t=this;this.watching=!0,this.registerEvent(e.on("window-open",o=>{this.onLayoutReady(()=>this.forContainer(o))})),this.register(h(e,{clearLayout(o){return async function(){try{return await o.call(this)}finally{t.onLayoutReady(()=>t.forAll())}}}})),this.onLayoutReady(()=>this.forAll())}return this}forWindow(e=(o=>(o=window.activeWindow)!=null?o:window)(),t=!0){let n=He(e);if(n)return this.forContainer(n,t)}forContainer(e,t=!0){e=e.getContainer();let o=this.instances.get(e);return!o&&t&&(o=new this.factory(this.use,e),o&&(this.instances.set(e,o),this.addChild(o),e.component.addChild(o),o.register(()=>{J(this,o),J(e.component,o),this.instances.delete(e)}))),o}forDom(e,t=!0){return this.forWindow(Ae(e),t)}forLeaf(e=app.workspace.activeLeaf,t=!0){if($(e))return this.forContainer(e.getContainer(),t)}forView(e,t=!0){return this.forLeaf(e.leaf,t)}forAll(e=!0){return ge().map(t=>this.forContainer(t,e)).filter(t=>t)}};function ge(){return[app.workspace.rootSplit].concat(app.workspace.floatingSplit.children)}function Me(){return ge().map(i=>i.win)}function v(){var i,r;return 1+((r=(i=app.workspace.floatingSplit)==null?void 0:i.children.length)!=null?r:0)}function we(i){for(let r of Me())if(r.event&&i(r,r.event))return r.event}function Ae(i){return i.win||(i.ownerDocument||i).defaultView||window}function He(i){if(i===window)return app.workspace.rootSplit;let{floatingSplit:r}=app.workspace;if(r){for(let e of r.children)if(i===e.win)return e}}var ye=require("obsidian"),U=class extends g{onload(){let r=this,e=this.use(ye.Plugin);this.register(h(e,{loadCSS(t){return async function(){await t.call(this),r.triggerReparse(),this.register(()=>r.triggerReparse())}}}))}triggerReparse(){app.workspace.layoutReady&&app.workspace.trigger("parse-style-settings")}};function F(i,r,e){let t=i.classList.contains(r);return e=e!=null?e:!t,e!==t&&(e?i.classList.add(r):i.classList.remove(r)),e}var Ie=require("obsidian");var ve={};function l(i,r,e=[],t={}){typeof e=="string"&&(e=[e]),typeof e=="object"&&e.key&&(e=[e]);let o=e.map(function(a){if(typeof a=="object")return a;let p=a.split("+");return{modifiers:p,key:p.pop()||"+"}});Object.assign(t,{id:i,name:r,hotkeys:o});let n=Symbol("cmd:"+i);return ve[n]=t,n}function _(i,r=i.constructor.prototype){Object.getOwnPropertySymbols(r).forEach(e=>{let t=ve[e],o=r[e];t&&i.addCommand(Object.assign({},t,{checkCallback(n){let a=o.call(i);return n||typeof a!="function"?!!a:(a(),!0)}}))})}var W=require("obsidian");var E=require("obsidian");var b=require("obsidian");var S="pane-relief:history-v1",ae="pane-relief:history-v1",se=new WeakMap,V=class{constructor(r){this.setState(r)}get viewState(){return JSON.parse(this.raw.state||"{}")}setState(r){var e;this.raw=r,this.eState=JSON.parse(r.eState||"null"),this.path=(e=this.viewState.state)==null?void 0:e.file}onRename(r,e){if(this.path===e){let t=this.viewState;this.path=t.state.file=r.path,this.raw.state=JSON.stringify(t)}}go(r){let{viewState:e,path:t,eState:o}=this,n=t&&(app==null?void 0:app.vault.getAbstractFileByPath(t));t&&!n&&(new b.Notice("Missing file: "+t),e={type:"empty",state:{}},o=void 0),r.setViewState({...e,active:!0,popstate:!0},o)}isEmpty(){return JSON.parse(this.raw.state||"{}").type==="empty"}replaceState(r){var e;if(r.state!==this.raw.state){let t=JSON.parse(r.state||"{}");if(t.type==="empty")return!0;if(this.path&&this.path!==((e=t==null?void 0:t.state)==null?void 0:e.file))return!1;if(t.type==="media-view"){let o=JSON.stringify(this.viewState.state.info),n=JSON.stringify(t.state.info);if(o!==n)return!1}}return this.setState(r),!0}},d=class{constructor(r,{pos:e,stack:t}={pos:0,stack:[]}){this.leaf=r;this.leaf=r,this.pos=e,this.stack=t.map(o=>new V(o))}static current(){return this.forLeaf(app.workspace.activeLeaf)||new this}static forLeaf(r){var e;if(r&&se.set(r.containerEl,r),r)return r[S]instanceof this?r[S]:r[S]=new this(r,((e=r[S])==null?void 0:e.serialize())||void 0)}cloneTo(r){return r[S]=new d(r,this.serialize())}onRename(r,e){for(let t of this.stack)t.onRename(r,e)}serialize(){return{pos:this.pos,stack:this.stack.map(r=>r.raw)}}get state(){var r;return((r=this.stack[this.pos])==null?void 0:r.raw)||null}get length(){return this.stack.length}back(){this.go(-1)}forward(){this.go(1)}lookAhead(){return this.stack.slice(0,this.pos).reverse()}lookBehind(){return this.stack.slice(this.pos+1)}announce(){var r;(r=app==null?void 0:app.workspace)==null||r.trigger("pane-relief:update-history",this.leaf,this)}goto(r){var e;if(!!this.leaf){if(this.leaf.pinned)return new b.Notice("Pinned pane: unpin before going forward or back"),void 0;if(this.leaf.working)return new b.Notice("Pane is busy: please wait before navigating further"),void 0;r=this.pos=Math.max(0,Math.min(r,this.stack.length-1)),(e=this.stack[r])==null||e.go(this.leaf),this.announce()}}go(r,e){if(!this.leaf||!r)return;let t=Math.max(0,Math.min(this.pos-r,this.stack.length-1));e||t!==this.pos?this.goto(t):new b.Notice(`No more ${r<0?"back":"forward"} history for pane`)}replaceState(r,e,t){let o=this.stack[this.pos];o?o.replaceState(r)||this.pushState(r,e,t):this.stack[this.pos]=new V(r)}pushState(r,e,t){let o=this.stack[this.pos];if(o&&o.isEmpty())return this.replaceState(r,e,t);for(this.stack.splice(0,this.pos,new V(r)),this.pos=0;this.stack.length>20;)this.stack.pop();this.announce()}},G=class extends g{onload(){let r=this.use(D);this.registerEvent(r.onSaveItem((o,n)=>{o instanceof b.WorkspaceLeaf&&o[S]&&(n[ae]=o[S].serialize())})),this.registerEvent(r.onLoadItem((o,n)=>{o instanceof b.WorkspaceLeaf&&n[ae]&&(o[S]=new d(o,n[ae]))})),this.register(h(b.WorkspaceLeaf.prototype,{setViewState(o){return function(a,p){var s;return a.popstate&&((s=window.event)==null?void 0:s.type)==="popstate"?Promise.resolve():o.call(this,a,p)}}})),this.register(h(app.workspace,{setActiveLeaf(o){return function(a,...p){let s=h(this,{recordHistory(c){return function(f,u,...m){return c.call(this,f,!1,...m)}}});try{return o.call(this,a,...p)}finally{s()}}}}));function e(o){return!!we((n,a)=>{if(a.type==="mousedown"&&a.button===o)return a.preventDefault(),a.stopImmediatePropagation(),!0})}let t=window.history;this.register(()=>window.history=t),Object.defineProperty(window,"history",{enumerable:!0,configurable:!0,writable:!0,value:{get state(){return d.current().state},get length(){return d.current().length},back(){e(3)||this.go(-1)},forward(){e(4)||this.go(1)},go(o){d.current().go(o)},replaceState(o,n,a){d.current().replaceState(o,n,a)},pushState(o,n,a){d.current().pushState(o,n,a)},get scrollRestoration(){return t.scrollRestoration},set scrollRestoration(o){t.scrollRestoration=o}}})}};var Re={markdown:"document",image:"image-file",audio:"audio-file",video:"audio-file",pdf:"pdf-file",localgraph:"dot-network",outline:"bullet-list",backlink:"link",kanban:"blocks",excalidraw:"excalidraw-icon","media-view":"audio-file"},ke={graph:["dot-network","Graph View"],"file-explorer":["folder","File Explorer"],starred:["star","Starred Files"],tag:["tag","Tags View"],"recent-files":["clock","Recent Files"],calendar:["calendar-with-checkmark","Calendar"],empty:["cross","No file"]},H=class extends B{constructor(){super(...arguments);this.historyIsOpen=!1}display(e=this.latestLeaf()){if(!this.historyIsOpen){if(!this._loaded){this.load();return}this.win.requestAnimationFrame(()=>{let t=e?d.forLeaf(e):new d;this.back.setHistory(t),this.forward.setHistory(t),e&&this.updateLeaf(e,t)})}}leaves(){var n;let e=new Set,t=a=>{e.add(a)};app.workspace.iterateLeaves(t,this.container);let o=(n=app.plugins.plugins["obsidian-hover-editor"])==null?void 0:n.activePopovers;if(o)for(let a of o)a.hoverEl.ownerDocument.defaultView===this.win&&(a.rootSplit?app.workspace.iterateLeaves(t,a.rootSplit):a.leaf&&t(a.leaf));return[...e.values()]}latestLeaf(){let e=app.workspace.activeLeaf;return e&&this.use(H).forLeaf(e)===this?e:this.leaves().reduce((t,o)=>!t||t.activeTime<o.activeTime?o:t,null)}onload(){let{document:e}=this.win;e.addEventListener("mouseup",t,!0),e.addEventListener("mousedown",t,!0),this.register(()=>{e.removeEventListener("mouseup",t,!0),e.removeEventListener("mousedown",t,!0)});function t(o){if(o.button!==3&&o.button!==4)return;o.preventDefault(),o.stopPropagation();let n=o.target.matchParent(".workspace-leaf");if(n&&o.type==="mouseup"){let a=se.get(n);if(a||app.workspace.iterateAllLeaves(p=>a=p.containerEl===n?p:a),!a)return!1;o.button==3&&d.forLeaf(a).back(),o.button==4&&d.forLeaf(a).forward()}return!1}app.workspace.onLayoutReady(()=>{this.addChild(this.back=new x(this,"back",-1)),this.addChild(this.forward=new x(this,"forward",1)),this.display(),this.numberPanes(),this.registerEvent(app.workspace.on("layout-change",this.numberPanes,this))})}onunload(){this.unNumberPanes(),this.win.document.body.findAll(".workspace-leaf").forEach(e=>{let t=e.find(".view-header > .view-actions"),o=t==null?void 0:t.find('.view-action[class*=" app:go-forward"]'),n=t==null?void 0:t.find('.view-action[class*=" app:go-back"]');o&&I(o,this.forward.oldLabel),n&&I(o,this.back.oldLabel)})}unNumberPanes(e=".workspace-leaf"){this.win.document.body.findAll(e).forEach(t=>{t.style.removeProperty("--pane-relief-label"),t.toggleClass("has-pane-relief-label",!1),t.style.removeProperty("--pane-relief-forward-count"),t.style.removeProperty("--pane-relief-backward-count")})}updateLeaf(e,t=d.forLeaf(e)){e.containerEl.style.setProperty("--pane-relief-forward-count",'"'+(t.lookAhead().length||"")+'"'),e.containerEl.style.setProperty("--pane-relief-backward-count",'"'+(t.lookBehind().length||"")+'"');let o=e.containerEl.find(".view-header > .view-actions"),n=o==null?void 0:o.find('.view-action[class*=" app:go-forward"]'),a=o==null?void 0:o.find('.view-action[class*=" app:go-back"]');n&&this.forward.updateDisplay(t,n),a&&this.back.updateDisplay(t,a)}numberPanes(){this.win.requestAnimationFrame(()=>{this.win===window&&this.unNumberPanes(".workspace-tabs > .workspace-leaf");let e=0,t=null;this.leaves().forEach(o=>{o.containerEl.style.setProperty("--pane-relief-label",++e<9?""+e:""),o.containerEl.toggleClass("has-pane-relief-label",e<9),t=o,this.updateLeaf(o)}),e>8&&(t==null||t.containerEl.style.setProperty("--pane-relief-label","9"),t==null||t.containerEl.toggleClass("has-pane-relief-label",!0))})}onUpdateHistory(e,t){this.win.requestAnimationFrame(()=>{this.updateLeaf(e),t===this.forward.history&&this.forward.setHistory(t),t===this.back.history&&this.back.setHistory(t)})}},ce=class extends E.Component{constructor(e,t,o){super();this.owner=e;this.kind=t;this.dir=o;this.history=null}onload(){this.containerEl=this.owner.win.document.body.find(`.titlebar .titlebar-button-container.mod-left .titlebar-button.mod-${this.kind}`)||this.owner.win.createDiv(),this.count=this.containerEl.createSpan({prepend:this.kind==="back",cls:"history-counter"}),this.history=null,this.oldLabel=this.containerEl.getAttribute("aria-label"),this.registerDomEvent(this.containerEl,"contextmenu",this.openMenu.bind(this));let e=t=>{var o;t.preventDefault(),t.stopImmediatePropagation(),(o=this.history)==null||o[this.kind]()};this.register(()=>this.containerEl.removeEventListener("click",e,!0)),this.containerEl.addEventListener("click",e,!0),this.register(Ne(this.owner.win.document.body,"contextmenu",`.view-header > .view-actions > .view-action[class*="app:go-${this.kind}"]`,(t,o)=>{let n=o.matchParent(".workspace-leaf"),a=this.owner.leaves().filter(p=>p.containerEl===n).pop();!a||(t.preventDefault(),t.stopImmediatePropagation(),this.openMenu(t,d.forLeaf(a)))},{capture:!0}))}onunload(){I(this.containerEl,this.oldLabel),this.count.detach(),this.containerEl.toggleClass("mod-active",!1)}setCount(e){this.count.textContent=""+(e||"")}setHistory(e=d.current()){this.updateDisplay(this.history=e)}updateDisplay(e,t=this.containerEl){let o=e[this.dir<0?"lookBehind":"lookAhead"]();t===this.containerEl&&this.setCount(o.length),I(t,o.length?this.oldLabel+`
`+this.formatState(o[0]).title:`No ${this.kind} history`),t.toggleClass("mod-active",o.length>0)}openMenu(e,t=this.history){var a;let o=t[this.dir<0?"lookBehind":"lookAhead"]();if(!o.length)return;let n=new E.Menu;(a=n.setUseNativeMenu)==null||a.call(n,!1),n.dom.addClass("pane-relief-history-menu"),n.dom.on("mousedown",".menu-item",p=>{p.stopPropagation()},!0),o.map(this.formatState.bind(this)).forEach((p,s)=>this.menuItem(p,s,n,t)),n.showAtPosition({x:e.clientX,y:e.clientY+20}),this.owner.historyIsOpen=!0,n.onHide(()=>{this.owner.historyIsOpen=!1,this.owner.display()})}menuItem(e,t,o,n){let{dir:a,kind:p}=this;o.addItem(f=>{s(f),e.file&&c(f.dom)});return;function s(f,u=""){f.setIcon(e.icon).setTitle(u+e.title).onClick(m=>{E.Keymap.isModEvent(m)&&(n=n.cloneTo(app.workspace.splitActiveLeaf())),n.go((t+1)*a,!0)})}function c(f){f.addEventListener("mouseover",u=>{app.workspace.trigger("hover-link",{event:u,source:ce.hoverSource,hoverParent:o.dom,targetEl:f,linktext:e.file.path})}),f.setAttr("draggable","true"),f.addEventListener("dragstart",u=>{let m=app.dragManager,w=m.dragFile(u,e.file);m.onDragStart(u,w)}),f.addEventListener("dragend",u=>o.hide()),f.addEventListener("contextmenu",u=>{let m=new E.Menu;m.addItem(w=>s(w,`Go ${p} to `)).addSeparator(),app.workspace.trigger("file-menu",m,e.file,"link-context-menu"),m.showAtPosition({x:u.clientX,y:u.clientY}),u.stopPropagation()},!0)}}formatState(e){var c,f,u;let{viewState:{type:t,state:o},eState:n,path:a}=e,p=a&&app.vault.getAbstractFileByPath(a),s={icon:"",title:"",file:p,type:t,state:o,eState:n};return ke[t]?[s.icon,s.title]=ke[t]:a&&!p?[s.icon,s.title]=["trash","Missing file "+a]:p instanceof E.TFile&&(s.icon=(c=Re[t])!=null?c:"document",t==="markdown"&&o.mode==="preview"&&(s.icon="lines-of-text"),s.title=p?p.basename+(p.extension!=="md"?"."+p.extension:""):"No file",t==="media-view"&&!p&&(s.title=(u=(f=o.info)==null?void 0:f.filename)!=null?u:s.title)),app.workspace.trigger("pane-relief:format-history-item",s),s}},x=ce;x.hoverSource="pane-relief:history-menu";function Ne(i,r,e,t,o){return i.on(r,e,t,o),()=>i.off(r,e,t,o)}function I(i,r){r?i.setAttribute("aria-label",r||void 0):i.removeAttribute("aria-label")}var X=class extends g{constructor(){super(...arguments);this.setting=new A(this,"pane-relief:focus-lock").of(app.workspace);this.plugin=this.use(W.Plugin);this.statusEl=this.plugin.addStatusBarItem();this.iconEl=this.statusEl.createSpan("pane-relief-focus-lock icon",e=>{e.setAttribute("aria-label-position","top")});this.isLocked=null;this.installed=!1}onload(){this.registerDomEvent(this.iconEl,"click",()=>this.toggle()),_(this.plugin,{[l("focus-lock","Toggle focus lock (Enable/disable sidebar focusing)")]:()=>()=>this.toggle()}),this.registerEvent(this.setting.onLoadWorkspace(this.onChange,this))}install(){this.installed=!0;let e=this;this.register(h(app.workspace,{setActiveLeaf(t){return function(o,n,a){if(!e.isLocked||z(o))return t.call(this,o,n,a);if(!this.activeLeaf||!$(this.activeLeaf))return t.call(this,this.getLeaf(),n,a)}},revealLeaf(t){return function(o){let n=o.getContainer();if(!e.isLocked||z(o)||!n)return t.call(this,o);let a=h(n,{focus(){return function(){}}});try{return t.call(this,o)}finally{a()}}}})),this.register(h(W.WorkspaceLeaf.prototype,{canNavigate(t){return function(){return t.call(this)&&(!e.isLocked||z(this))}}})),this.register(h(app.internalPlugins.plugins["file-explorer"].instance,{init(t){return function(...n){try{return t.apply(this,n)}finally{e.blockFileExplorerReveal()}}}})),this.blockFileExplorerReveal()}blockFileExplorerReveal(){let e=this,t=app.commands.commands["file-explorer:reveal-active-file"];t&&this.register(h(t,{checkCallback(o){return function(...n){var a;if(e.isLocked){for(let p of app.workspace.getLeavesOfType("file-explorer"))if(!z(p)){let s=(a=p.view.dom)==null?void 0:a.navFileContainerEl;s&&k(h(s,{focus(c){return function(){}}}))}}return o==null?void 0:o.apply(this,n)}}}))}toggle(){this.setting.set(!this.setting.get()),this.onChange()}onChange(){let e=this.setting.get();e&&!this.installed&&this.install(),this.isLocked!==e&&(this.isLocked!=null&&document.body.appendChild(new W.Notice(e?"Sidebar focusing disabled":"Sidebar focusing enabled").noticeEl.parentElement),this.isLocked=e,(0,W.setIcon)(this.iconEl,e?"lucide-lock":"lucide-unlock",13),I(this.iconEl,e?"Sidebar focus disabled: click to enable":"Sidebar focus enabled: click to disable"),e&&!z(app.workspace.activeLeaf)&&app.workspace.layoutReady&&app.workspace.setActiveLeaf(app.workspace.getUnpinnedLeaf(),!1,!0))}};function z(i){let r=i==null?void 0:i.getRoot();return!!(r&&r!==app.workspace.leftSplit&&r!==app.workspace.rightSplit)}var Le=require("obsidian"),Y=class extends g{constructor(){super(...arguments);this.fixSlidingPanes=(0,Le.debounce)(()=>{app.plugins.plugins["sliding-panes-obsidian"]&&(app.workspace.onLayoutChange(),app.workspace.requestActiveLeafEvents())},5)}onload(){this.registerEvent(app.workspace.on("layout-change",()=>{for(let t of this.parents())this.refresh(t)}));let e=this;this.register(h(app.workspace,{setActiveLeaf(t){return function(n,a,p){let s=e.parentForLeaf(n),c=e.parentForLeaf(app.workspace.activeLeaf);return s&&c&&s!==c&&c.matchParent(".hover-popover.is-active.snap-to-viewport")&&s.ownerDocument===c.ownerDocument&&!s.matchParent(".hover-popover")&&app.commands.executeCommandById("obsidian-hover-editor:restore-active-popover"),s&&e.refresh(s,s.hasClass("should-maximize")?n.containerEl:null),t.call(this,n,a,p)}}}))}onunload(){for(let e of this.parents())this.refresh(e,null)}toggleMaximize(e=app.workspace.activeLeaf){let t=this.parentForLeaf(e);if(!t)return;let o=t.matchParent(".hover-popover");if(o&&app.plugins.plugins["obsidian-hover-editor"]&&o.findAll(".workspace-leaf").length===1){app.commands.executeCommandById("obsidian-hover-editor:"+(o.hasClass("snap-to-viewport")?"restore-active-popover":"snap-active-popover-to-viewport"));return}t&&this.refresh(t,F(t,"should-maximize")?e.containerEl:null)}lastMaximized(e){return e.find(".workspace-leaf.is-maximized")||app.workspace.getMostRecentLeaf().containerEl}refresh(e,t=e.hasClass("should-maximize")?this.lastMaximized(e):null){let o=e.hasClass("has-maximized");e.findAllSelf(".workspace-split, .workspace-tabs").forEach(n=>{(n===e||this.parentFor(n)===e)&&F(n,"has-maximized",t?n.contains(t):!1)}),e.findAll(".workspace-leaf").forEach(n=>{this.parentFor(n)===e&&F(n,"is-maximized",n===t)}),(!t||!e.contains(t))&&(F(e,"should-maximize",!1),o&&this.fixSlidingPanes())}parents(){var o,n,a;let e=[app.workspace.rootSplit.containerEl];e.concat(((n=(o=app.workspace.floatingSplit)==null?void 0:o.children)!=null?n:[]).map(p=>p.containerEl));let t=(a=app.plugins.plugins["obsidian-hover-editor"])==null?void 0:a.activePopovers;if(t)for(let p of t)p.rootSplit&&e.push(p.rootSplit.containerEl);return e}parentForLeaf(e){return this.parentFor(e==null?void 0:e.containerEl)}parentFor(e){return e==null?void 0:e.matchParent(".workspace-split.mod-root, .hover-popover > .popover-content > .workspace-split")}};var Q=class extends R.Plugin{constructor(){super(...arguments);this.use=y.plugin(this);this.nav=this.use(H).watch();this.max=this.use(Y)}onload(){this.use(G).load(),this.app.workspace.registerHoverLinkSource(x.hoverSource,{display:"History dropdowns",defaultMod:!0}),this.app.workspace.onLayoutReady(()=>{this.registerEvent(this.app.vault.on("rename",(e,t)=>{e instanceof R.TFile&&this.app.workspace.iterateAllLeaves(o=>d.forLeaf(o).onRename(e,t))})),this.registerEvent(app.workspace.on("active-leaf-change",e=>this.nav.forLeaf(e).display(e))),this.registerEvent(app.workspace.on("pane-relief:update-history",(e,t)=>this.nav.forLeaf(e).onUpdateHistory(e,t)))}),_(this),(0,R.requireApiVersion)("0.15.6")&&this.use(X),this.use(U)}[l("swap-prev","Swap pane with previous in split","Mod+Shift+PageUp")](){return this.leafPlacer(-1)}[l("swap-next","Swap pane with next in split","Mod+Shift+PageDown")](){return this.leafPlacer(1)}[l("go-prev","Cycle to previous workspace pane","Mod+PageUp")](){return()=>this.gotoNthLeaf(-1,!0)}[l("go-next","Cycle to next workspace pane","Mod+PageDown")](){return()=>this.gotoNthLeaf(1,!0)}[l("win-prev","Cycle to previous window",[])](){if(v()>1)return()=>this.gotoNthWindow(-1,!0)}[l("win-next","Cycle to next window",[])](){if(v()>1)return()=>this.gotoNthWindow(1,!0)}[l("go-1st","Jump to 1st pane in the workspace","Alt+1")](){return()=>this.gotoNthLeaf(0)}[l("go-2nd","Jump to 2nd pane in the workspace","Alt+2")](){return()=>this.gotoNthLeaf(1)}[l("go-3rd","Jump to 3rd pane in the workspace","Alt+3")](){return()=>this.gotoNthLeaf(2)}[l("go-4th","Jump to 4th pane in the workspace","Alt+4")](){return()=>this.gotoNthLeaf(3)}[l("go-5th","Jump to 5th pane in the workspace","Alt+5")](){return()=>this.gotoNthLeaf(4)}[l("go-6th","Jump to 6th pane in the workspace","Alt+6")](){return()=>this.gotoNthLeaf(5)}[l("go-7th","Jump to 7th pane in the workspace","Alt+7")](){return()=>this.gotoNthLeaf(6)}[l("go-8th","Jump to 8th pane in the workspace","Alt+8")](){return()=>this.gotoNthLeaf(7)}[l("go-last","Jump to last pane in the workspace","Alt+9")](){return()=>this.gotoNthLeaf(99999999)}[l("win-1st","Switch to 1st window",[])](){if(v()>1)return()=>this.gotoNthWindow(0)}[l("win-2nd","Switch to 2nd window",[])](){if(v()>1)return()=>this.gotoNthWindow(1)}[l("win-3rd","Switch to 3rd window",[])](){if(v()>2)return()=>this.gotoNthWindow(2)}[l("win-4th","Switch to 4th window",[])](){if(v()>3)return()=>this.gotoNthWindow(3)}[l("win-5th","Switch to 5th window",[])](){if(v()>4)return()=>this.gotoNthWindow(4)}[l("win-6th","Switch to 6th window",[])](){if(v()>5)return()=>this.gotoNthWindow(5)}[l("win-7th","Switch to 7th window",[])](){if(v()>6)return()=>this.gotoNthWindow(6)}[l("win-8th","Switch to 8th window",[])](){if(v()>7)return()=>this.gotoNthWindow(7)}[l("win-last","Switch to last window",[])](){if(v()>1)return()=>this.gotoNthWindow(99999999)}[l("put-1st","Place as 1st pane in the split","Mod+Alt+1")](){return()=>this.placeLeaf(0,!1)}[l("put-2nd","Place as 2nd pane in the split","Mod+Alt+2")](){return()=>this.placeLeaf(1,!1)}[l("put-3rd","Place as 3rd pane in the split","Mod+Alt+3")](){return()=>this.placeLeaf(2,!1)}[l("put-4th","Place as 4th pane in the split","Mod+Alt+4")](){return()=>this.placeLeaf(3,!1)}[l("put-5th","Place as 5th pane in the split","Mod+Alt+5")](){return()=>this.placeLeaf(4,!1)}[l("put-6th","Place as 6th pane in the split","Mod+Alt+6")](){return()=>this.placeLeaf(5,!1)}[l("put-7th","Place as 7th pane in the split","Mod+Alt+7")](){return()=>this.placeLeaf(6,!1)}[l("put-8th","Place as 8th pane in the split","Mod+Alt+8")](){return()=>this.placeLeaf(7,!1)}[l("put-last","Place as last pane in the split","Mod+Alt+9")](){return()=>this.placeLeaf(99999999,!1)}[l("maximize","Maximize active pane (Toggle)",[])](){if(this.max.parentForLeaf(app.workspace.activeLeaf))return()=>this.max.toggleMaximize()}[l("ordered-close","Close pane and go to adjacent pane")](){return()=>{let e=app.workspace.activeLeaf,t=this.nav.forLeaf(e).leaves(),o=t.indexOf(e),n;o>-1&&(t.length>o+1?n=t[o+1]:o>0&&(n=t[o-1])),n&&app.workspace.setActiveLeaf(n,!1,!0),e.detach()}}onunload(){this.app.workspace.unregisterHoverLinkSource(x.hoverSource)}gotoNthLeaf(e,t){let o=app.workspace.activeLeaf,n=o.getRoot();(n===app.workspace.leftSplit||n===app.workspace.rightSplit)&&(o=app.workspace.getMostRecentLeaf(app.workspace.rootSplit));let a=this.nav.forLeaf(o);o=be(a.leaves(),o,e,t),!o||this.app.workspace.setActiveLeaf(o,!0,!0)}gotoNthWindow(e,t){var a,p,s,c,f;let o=be(this.nav.forAll(),this.nav.forLeaf(app.workspace.activeLeaf),e,t),n=o==null?void 0:o.latestLeaf();n&&app.workspace.setActiveLeaf(n,!0,!0),(f=(c=(s=(p=(a=o==null?void 0:o.win).require)==null?void 0:p.call(a,"electron"))==null?void 0:s.remote)==null?void 0:c.getCurrentWindow())==null||f.focus()}placeLeaf(e,t=!0){let o=this.leafPlacer(e,t);o&&o()}leafPlacer(e,t=!0){let o=this.app.workspace.activeLeaf;if(!o)return!1;let n=o.parentSplit,a=n.children,p=a.indexOf(o);if(p==-1)return!1;if(a.length===1){let s=o.containerEl.matchParent(".hover-popover");if(s&&t&&Math.abs(e)===1){let c=s;for(;c&&(c===s||!c.matches(".hover-popover"));)c=e<0?c.previousElementSibling:c.nextElementSibling;if(c)return()=>{e<0?c.parentElement.insertBefore(s,c):c.parentElement.insertBefore(c,s),app.workspace.onLayoutChange()}}}if(t){if(e+=p,e<0||e>=a.length)return!1}else e>=a.length&&(e=a.length-1),e<0&&(e=0);return p==e?!1:()=>{let s=a[e];a.splice(p,1),a.splice(e,0,o),n.selectTab?n.selectTab(o):(s.containerEl.insertAdjacentElement(p>e?"beforebegin":"afterend",o.containerEl),n.recomputeChildrenDimensions(),o.onResize(),this.app.workspace.onLayoutChange(),this.app.workspace.activeLeaf=null,this.app.workspace.setActiveLeaf(o,!1,!0))}}};function be(i,r,e,t){return t&&(e+=i.indexOf(r),e=(e+i.length)%i.length),i[e>=i.length?i.length-1:e]}
