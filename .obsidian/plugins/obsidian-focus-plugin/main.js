/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => FocusPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// utils/log.ts
var FocusPluginLogger = class {
  static log(level, message) {
    console.log(`focus-plugin: [${level}] ${message}`);
  }
};

// utils/info.ts
function isHeaderFocusInfo(info) {
  return !!info && info.type.startsWith("H");
}
function isListFocusInfo(info) {
  return !!info && info.type === "LI";
}
function isIntermediateFocusInfo(info) {
  return !!info && info.type === "UNKNOWN";
}
function toIntermediateFocusInfo(info) {
  return {
    block: info.block,
    type: "UNKNOWN",
    before: /* @__PURE__ */ new Set(),
    after: /* @__PURE__ */ new Set(),
    metadata: null,
    level: null
  };
}
function getFocusInfo(el) {
  var _a;
  let focusType = null;
  let focusBlock = null;
  let focusTarget = null;
  let cursor = el;
  while (cursor !== null && !cursor.hasClass("markdown-preview-section")) {
    if (cursor.tagName.match(/^H[1-6]$/)) {
      focusType = cursor.tagName;
    } else if (cursor.tagName === "LI") {
      focusType = "LI";
      focusTarget = cursor;
    }
    if ((_a = cursor.parentElement) == null ? void 0 : _a.hasClass("markdown-preview-section")) {
      focusBlock = cursor;
      break;
    }
    cursor = cursor.parentElement;
  }
  if (focusBlock === null)
    return null;
  if (focusType === null)
    return {
      before: /* @__PURE__ */ new Set(),
      after: /* @__PURE__ */ new Set(),
      block: focusBlock,
      type: "UNKNOWN",
      metadata: null,
      level: null
    };
  else if (focusType.match(/^H[1-6]$/))
    return {
      block: focusBlock,
      type: focusType,
      body: /* @__PURE__ */ new Set(),
      content: /* @__PURE__ */ new Set()
    };
  else if (focusType === "LI")
    return {
      block: focusBlock,
      type: focusType,
      target: focusTarget,
      body: /* @__PURE__ */ new Set()
    };
  else
    FocusPluginLogger.log("Error", `Unexpected focus type: ${focusType}`);
  return null;
}

// utils/focusManager.ts
var FocusManager = class {
  constructor() {
    this.paneInfo = /* @__PURE__ */ new WeakMap();
    this.indicator = document.createElement("div");
    this.classes = {
      "enabled": "focus-plugin-enabled",
      "dimmed": "focus-plugin-dimmed",
      "focus-animation": "focus-plugin-focus-animation",
      "dim-animation": "focus-plugin-dim-animation"
    };
    this.includeBody = true;
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          const pane = mutation.target;
          const info = this.paneInfo.get(pane);
          if (!info) {
            this.clear(pane, false);
            return;
          }
          if (isIntermediateFocusInfo(info))
            this.processIntermediate(pane, info, false);
          else
            this.process(pane, info, false);
        }
      });
    });
    this.init();
    this.indicator.onclick = () => this.toggle();
  }
  init() {
    this.clearAll();
    document.body.classList.add(this.classes["enabled"]);
    this.indicator.innerHTML = "Focus: on";
    this.enabled = true;
  }
  getIndicator() {
    return this.indicator;
  }
  isEnabled() {
    return this.enabled;
  }
  dim(elements, animation) {
    if (animation) {
      elements.forEach((element) => {
        if (!element.classList.contains(this.classes["dimmed"])) {
          element.addEventListener("animationend", () => {
            element.classList.remove(this.classes["dim-animation"]);
          }, { once: true });
          element.classList.add(this.classes["dim-animation"]);
        }
      });
    }
    elements.forEach((element) => element.classList.add(this.classes["dimmed"]));
  }
  undim(elements, animation, children = true) {
    let dimmed_elements = [];
    elements.forEach((element) => {
      if (element.classList.contains(this.classes["dimmed"]))
        dimmed_elements.push(element);
      if (children)
        dimmed_elements.push(...Array.from(element.querySelectorAll(`.${this.classes["dimmed"]}`)));
    });
    if (animation) {
      dimmed_elements.forEach((element) => {
        if (element.classList.contains(this.classes["dimmed"])) {
          element.addEventListener("animationend", () => {
            element.classList.remove(this.classes["focus-animation"]);
          }, { once: true });
          element.classList.add(this.classes["focus-animation"]);
        }
      });
    }
    dimmed_elements.forEach((element) => element.classList.remove(this.classes["dimmed"]));
  }
  process(pane, info, animation) {
    var _a;
    if (isHeaderFocusInfo(info)) {
      this.undim([info.block], animation);
    } else if (isListFocusInfo(info)) {
      this.undim([info.block], animation, false);
    } else {
      FocusPluginLogger.log("Error", "Unknown focus info type");
    }
    if (isHeaderFocusInfo(info)) {
      [info.block, ...info.body].forEach((element) => {
        var _a2;
        let cursor = element.nextElementSibling;
        let cursorTag;
        while (cursor !== null) {
          cursorTag = (_a2 = cursor.firstElementChild) == null ? void 0 : _a2.tagName;
          if (cursorTag && cursorTag.match(/^H[1-6]$/)) {
            if (this.includeBody && cursorTag > info.type)
              info.content.add(cursor);
            break;
          }
          info.body.add(cursor);
          cursor = cursor.nextElementSibling;
        }
      });
      info.content.forEach((element) => {
        var _a2;
        let cursor = element.nextElementSibling;
        let cursorTag;
        while (cursor !== null) {
          cursorTag = (_a2 = cursor.firstElementChild) == null ? void 0 : _a2.tagName;
          if (cursorTag && (cursorTag.match(/^H[1-6]$/) && cursorTag <= info.type))
            break;
          info.content.add(cursor);
          cursor = cursor.nextElementSibling;
        }
      });
      this.undim([...info.body, ...info.content], animation);
      this.dim(Array.from(pane.children || []).filter((element) => element !== info.block && !info.body.has(element) && !info.content.has(element)), animation);
    } else if (isListFocusInfo(info)) {
      this.undim([info.target], animation);
      this.dim(Array.from(((_a = info.target.parentElement) == null ? void 0 : _a.children) || []).filter((element) => element !== info.target), animation);
      this.dim(Array.from(pane.children || []).filter((element) => element !== info.block), animation);
    }
  }
  processIntermediate(pane, info, animation = true) {
    var _a, _b;
    if (info.metadata) {
      const after = [info.block, ...info.after];
      for (const element of after) {
        if (element.nextElementSibling !== null) {
          let cursor = element;
          while (cursor !== null) {
            if ((_a = cursor.firstElementChild) == null ? void 0 : _a.tagName.match(/^H[1-6]$/)) {
              let headings = info.metadata.headings || [];
              let headingIndex = headings.map((heading) => heading.heading).indexOf(cursor.firstElementChild.getAttribute("data-heading"));
              if (headingIndex === -1)
                FocusPluginLogger.log("Error", `Heading '${cursor.firstElementChild.getAttribute("data-heading")}' not found in metadata`);
              if (info.level === null) {
                if (headingIndex === 0)
                  info.level = 0;
                else {
                  let prevHeading = headings[headingIndex - 1];
                  info.level = prevHeading.level;
                }
              }
              if (headings[headingIndex].level >= info.level) {
                break;
              }
              info.after.add(info.block);
              break;
            }
            info.after.add(cursor);
            this.undim([cursor], animation);
            cursor = cursor.nextElementSibling;
          }
        }
      }
      ;
      const before = [info.block, ...info.before];
      for (const element of before) {
        if (element.previousElementSibling !== null) {
          let cursor = element.previousElementSibling;
          while (cursor !== null) {
            if ((_b = cursor.firstElementChild) == null ? void 0 : _b.hasAttribute("data-heading")) {
              let focusInfo = {
                type: cursor.firstElementChild.tagName,
                block: cursor,
                body: /* @__PURE__ */ new Set(),
                content: /* @__PURE__ */ new Set()
              };
              this.focus(pane, focusInfo);
              return true;
            }
            info.before.add(cursor);
            this.undim([cursor], animation);
            cursor = cursor.previousElementSibling;
          }
        }
      }
    }
    this.dim(Array.from(pane.children || []).filter((element) => element !== info.block && !info.before.has(element) && !info.after.has(element)), animation);
    return false;
  }
  isSameFocus(pane, info) {
    const currentFocus = this.paneInfo.get(pane);
    if (!currentFocus)
      return false;
    else if (isHeaderFocusInfo(currentFocus)) {
      if (isHeaderFocusInfo(info))
        return currentFocus.block === info.block;
      else if (isIntermediateFocusInfo(info))
        return currentFocus.body.has(info.block);
      else
        return false;
    } else if (isListFocusInfo(currentFocus))
      return isListFocusInfo(info) && currentFocus.target === info.target;
    else if (isIntermediateFocusInfo(currentFocus))
      return currentFocus.block === info.block || currentFocus.before.has(info.block) || currentFocus.after.has(info.block);
    else
      return false;
  }
  focus(pane, info) {
    var _a;
    if (isIntermediateFocusInfo(info)) {
      if (info.metadata === null) {
        this.undim([info.block], true);
        this.dim(Array.from(((_a = info.block.parentElement) == null ? void 0 : _a.children) || []).filter((element) => element !== info.block), true);
        this.paneInfo.set(pane, info);
      } else {
        if (!this.processIntermediate(pane, info))
          this.paneInfo.set(pane, info);
      }
    } else {
      this.process(pane, info, true);
      this.paneInfo.set(pane, info);
    }
    this.observer.observe(pane, { childList: true });
  }
  changePane(pane) {
    if (!this.paneInfo.has(pane))
      return;
    this.observer.observe(pane, { childList: true });
  }
  getFocus(pane) {
    return this.paneInfo.get(pane);
  }
  clear(pane, animation = true) {
    this.undim(Array.from(pane.querySelectorAll(`.${this.classes["dimmed"]}`)), animation);
    this.paneInfo.delete(pane);
  }
  clearAll(animation = false) {
    this.undim(Array.from(document.querySelectorAll(`.${this.classes["dimmed"]}`)), animation);
    this.paneInfo = /* @__PURE__ */ new WeakMap();
  }
  destroy() {
    this.clearAll();
    document.body.classList.remove(this.classes["enabled"]);
    this.indicator.innerHTML = "Focus: off";
    this.enabled = false;
  }
  toggle() {
    if (this.enabled)
      this.destroy();
    else
      this.init();
  }
};

// main.ts
var DEFAULT_SETTINGS = {
  clearMethod: "click-again",
  contentBehavior: "none",
  focusScope: "content",
  enableList: false,
  focusSensitivity: 1600,
  indicator: true
};
var FocusPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.focusManager = new FocusManager();
    this.lastClick = 0;
    this.indicator = null;
  }
  getPaneState() {
    let view = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
    if (!view)
      return null;
    return {
      mode: view.getMode(),
      head: view.contentEl.querySelector(".markdown-preview-section")
    };
  }
  onload() {
    return __async(this, null, function* () {
      yield this.loadSettings();
      this.addCommand({
        id: "clear-focus",
        name: "Clear Focus",
        callback: () => {
          this.focusManager.clearAll();
        }
      });
      this.addCommand({
        id: "toggle-focus-mode",
        name: "Toggle Focus Mode",
        callback: () => {
          this.focusManager.toggle();
        }
      });
      this.addSettingTab(new FocusPluginSettingTab(this.app, this));
      this.registerEvent(this.app.workspace.on("layout-change", () => {
        let paneState = this.getPaneState();
        if (!paneState || paneState.mode !== "preview")
          return;
        this.focusManager.clear(paneState.head);
      }));
      this.registerEvent(this.app.workspace.on("active-leaf-change", () => {
        let paneState = this.getPaneState();
        if (!paneState || paneState.mode !== "preview")
          return;
        this.focusManager.changePane(paneState.head);
      }));
      this.registerDomEvent(document, "pointerdown", (evt) => {
        this.lastClick = evt.timeStamp;
      });
      this.registerDomEvent(document, "pointerup", (evt) => {
        if (!this.focusManager.isEnabled())
          return;
        if (evt.timeStamp - this.lastClick > this.settings.focusSensitivity)
          return;
        if (!(evt.target instanceof Element))
          return;
        let paneState = this.getPaneState();
        if (!paneState || paneState.mode !== "preview")
          return;
        let focusInfo = getFocusInfo(evt.target);
        if (!this.settings.enableList && isListFocusInfo(focusInfo))
          focusInfo = toIntermediateFocusInfo(focusInfo);
        if (isIntermediateFocusInfo(focusInfo) && this.settings.contentBehavior === "none")
          return;
        let currentFocus = this.focusManager.getFocus(paneState.head);
        if (currentFocus !== void 0) {
          switch (this.settings.clearMethod) {
            case "click-again":
              if (focusInfo && this.focusManager.isSameFocus(paneState.head, focusInfo)) {
                this.focusManager.clear(paneState.head);
                return;
              }
              break;
            case "click-outside":
              if (evt.target.classList.contains("markdown-preview-view")) {
                this.focusManager.clear(paneState.head);
                return;
              }
              break;
          }
        }
        if (isIntermediateFocusInfo(focusInfo)) {
          let activeFile = this.app.workspace.getActiveFile();
          let metadata = activeFile !== null ? this.app.metadataCache.getFileCache(activeFile) : null;
          if (metadata) {
            switch (this.settings.contentBehavior) {
              case "content":
                focusInfo.metadata = metadata;
              case "element":
                this.focusManager.focus(paneState.head, focusInfo);
                break;
              default:
                break;
            }
          } else {
            FocusPluginLogger.log("Error", "No metadata found for active file");
          }
        } else if (focusInfo != null)
          this.focusManager.focus(paneState.head, focusInfo);
      });
    });
  }
  onunload() {
    this.focusManager.destroy();
  }
  settingsPreprocessor(settings) {
    return __async(this, null, function* () {
      this.focusManager.clearAll();
      this.focusManager.includeBody = settings.focusScope === "content";
      if (settings.indicator && !this.indicator) {
        this.indicator = this.addStatusBarItem();
        this.indicator.appendChild(this.focusManager.indicator);
        this.indicator.classList.add("mod-clickable");
      } else if (!settings.indicator && this.indicator) {
        this.indicator.remove();
        this.indicator = null;
      }
    });
  }
  loadSettings() {
    return __async(this, null, function* () {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
      yield this.settingsPreprocessor(this.settings);
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
      yield this.settingsPreprocessor(this.settings);
    });
  }
};
var FocusPluginSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Focus and Highlight Settings" });
    new import_obsidian.Setting(containerEl).setName("Clear Method").setDesc("How to clear the focused elements").addDropdown((dropdown) => dropdown.addOptions({
      "click-again": "Click again",
      "click-outside": "Click outside"
    }).setValue(this.plugin.settings.clearMethod).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.clearMethod = value;
      yield this.plugin.saveSettings();
      FocusPluginLogger.log("Debug", "clear method changed to " + value);
    })));
    new import_obsidian.Setting(containerEl).setName("Focus Scope").setDesc("What to focus when clicking").addDropdown((dropdown) => dropdown.addOptions({
      "block": "Only one block",
      "content": "Also the content"
    }).setValue(this.plugin.settings.focusScope).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.focusScope = value;
      yield this.plugin.saveSettings();
      FocusPluginLogger.log("Debug", "focus scope changed to " + value);
    })));
    new import_obsidian.Setting(containerEl).setName("Content Behavior").setDesc("What to do when clicking on the content elements, e.g. pure text, callout block").addDropdown((dropdown) => dropdown.addOptions({
      "element": "Only focus on the element",
      "content": "Focus related contents",
      "none": "Do nothing"
    }).setValue(this.plugin.settings.contentBehavior).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.contentBehavior = value;
      yield this.plugin.saveSettings();
      FocusPluginLogger.log("Debug", "content behavior changed to " + value);
    })));
    new import_obsidian.Setting(containerEl).setName("Enable List").setDesc("Focus on the list item (experimental, only works on the first level list)").addToggle((toggle) => toggle.setValue(this.plugin.settings.enableList).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.enableList = value;
      yield this.plugin.saveSettings();
      FocusPluginLogger.log("Debug", "enable list changed to " + value);
    })));
    new import_obsidian.Setting(containerEl).setName("Enable Status Indicator").setDesc("Show the status indicator in the status bar").addToggle((toggle) => toggle.setValue(this.plugin.settings.indicator).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.indicator = value;
      yield this.plugin.saveSettings();
      FocusPluginLogger.log("Debug", "indicator changed to " + value);
    })));
    new import_obsidian.Setting(containerEl).setName("Focus Sensitivity").setDesc("Focus only when the mouse is 'not' still for a while (larger means longer)").addSlider((slider) => slider.setLimits(100, 10100, 500).setValue(this.plugin.settings.focusSensitivity).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.focusSensitivity = value;
      yield this.plugin.saveSettings();
      FocusPluginLogger.log("Debug", "focus delay changed to " + value);
    })));
  }
};
