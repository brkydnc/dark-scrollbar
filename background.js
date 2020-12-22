let state = {
    enabled: true,
};

const css = "html::-webkit-scrollbar {width: 16px;}html::-webkit-scrollbar-track {background: #050505;}html::-webkit-scrollbar-thumb {background: #303030;}html::-webkit-scrollbar-thumb:hover{background: #404040;}html::-webkit-scrollbar-thumb:active{background: #505050;}"

const insertCSS = id => chrome.tabs.insertCSS(id, { code: css });
const removeCSS = id => chrome.tabs.removeCSS(id, { code: css });
const insertCSSAllTabs = () => chrome.tabs.query({}, tabs => tabs.forEach(tab => insertCSS(tab.id)))
const removeCSSAllTabs = () => chrome.tabs.query({}, tabs => tabs.forEach(tab => removeCSS(tab.id)))

chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.operation === 'insertIfEnabled' && state.enabled) insertCSS(sender.tab.id);
});

chrome.browserAction.onClicked.addListener(() => {
    if (state.enabled) removeCSSAllTabs(); else insertCSSAllTabs(); 
    if (state.enabled) chrome.browserAction.setIcon({path: "icons/scroll-off-64.png"})
    else chrome.browserAction.setIcon({path: "icons/scroll-on-64.png"});

    state.enabled = !state.enabled;
});