/**
 * Browser Window.
 * 
 * A Browser Window contains a collection of Browser Tabs.
 */

/**
 * Browser Window Constructor.
 */
var BrowserWindow = function(id) {
  if (id === undefined) {
    return null;
  }
  this.container = document.getElementById('windows');
  this.id = id;
  this.render();
  this.tabCount = 0;
  this.tabs = [];
  this.tabPanels = [];
  this.currentTab = null;
  this.createTab();
  return this;
};

/** 
 * Window View.
 */
BrowserWindow.prototype.view = function() {
  return '<div id="window' + this.id + '"class="browser-window">' +
    '<div class="tab-box">' +
      '<div id="tabs' + this.id + '" class="tabs">' +
        '<button id="new-tab-button' + this.id + '" class="new-tab-button">' +
      '</div>' +
      '<div id="tab-panels' + this.id + '"class="tab-panels">' +
      '</div>' +
    '</div>' +
    '<button type="button" id="close-window-button' + this.id + '" ' +
      'class="close-window-button">' +
  '</div>';
};

/**
 * Render the window.
 */
BrowserWindow.prototype.render = function() {
  this.container.insertAdjacentHTML('beforeend', this.view());
  this.element = document.getElementById('window' + this.id);
  this.closeButton = document.getElementById('close-window-button' + this.id);
  this.closeButton.addEventListener('click', this.close.bind(this));
  this.newTabButton = document.getElementById('new-tab-button' + this.id);
  this.newTabButton.addEventListener('click', this.createTab.bind(this));
};

/**
 * Show the Window.
 */
BrowserWindow.prototype.show = function() {
  this.element.classList.remove('hidden');
};

/**
 * Hide the window.
 */
BrowserWindow.prototype.hide = function() {
  this.element.classList.add('hidden');
};

/**
 * Close the window.
 */
BrowserWindow.prototype.close = function() {
  var e = new CustomEvent('_closewindow', {
    detail: {
      id: this.id
    }
  });
  window.dispatchEvent(e);
};

/**
 * Delete the element from the DOM.
 */
BrowserWindow.prototype.destroy = function() {
  this.container.removeChild(this.element);
};

/**
 * Create a new Browser Tab.
 *
 * @returns Integer ID of new Tab.
 */
BrowserWindow.prototype.createTab = function() {
  var tabId = this.tabCount;
  this.tabs[tabId] = new BrowserTab(tabId, this.id);
  this.tabPanels[tabId] = new BrowserTabPanel(tabId, this.id);
  this.tabCount++;
  this.switchTab(tabId);
  return tabId;
};

/**
 * Switch Browser Tab.
 * 
 * @param Integer id ID of tab to switch to.
 */
BrowserWindow.prototype.switchTab = function(id) {
  if (this.tabs[this.currentTab]) {
    this.tabs[this.currentTab].element.classList.remove('selected');
    this.tabPanels[this.currentTab].element.classList.remove('selected');
  }
  this.tabs[id].element.classList.add('selected');
  this.tabPanels[id].element.classList.add('selected');
  this.currentTab = id;
};
