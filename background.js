/**
 * Script that runs in the background
 * Used for listening to messages from the content script
 */

/**
 * On page load listens for message from content script to active extension
 * Only activates for Youtube site
 * Permissions defined in manifest
 */
 chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.todo == "showPageAction"){
        chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
            chrome.pageAction.show(tabs[0].id);
        });
    }
});

/**
 * listens for updates in url to send message to content script
 * to read the loaded page for ticket information
 */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url)
        chrome.tabs.sendMessage(tabId, {todo: 'change'});
});