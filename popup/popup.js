const checkbox = document.getElementById("checkbox");

chrome.runtime.sendMessage({operation: 'getState'}, state => {
    checkbox.checked = state.enabled;
    checkbox.addEventListener('click', () => {
        if (checkbox.checked) chrome.runtime.sendMessage({operation: 'insertCSSAllTabs'}); 
        else chrome.runtime.sendMessage({operation: 'removeCSSAllTabs'}); 
        chrome.runtime.sendMessage({operation: 'setState', value: {enabled: checkbox.checked}});
    });     
});