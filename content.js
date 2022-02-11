/**
 * Content script is what has access to the DOM of the site
 * and make changes to the webpage
 */

//Sends a message to background script to enable the extension on YouTube page
chrome.runtime.sendMessage({todo: "showPageAction"});

//listens to update in URL from background script
//if url changes then call function to set the video quality
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    //if (request.todo === 'change')
        //initiate();
});

function initiate() {
    
    if(document.querySelector('.ytp-button.ytp-settings-button')) {
        var button = $('.ytp-button.ytp-settings-button');
        button.trigger('click');
        //console.log(button);
        var option = $('.ytp-settings-menu .ytp-menuitem').last();
        option.trigger('click');
        console.log(option);
        var quality = $('.ytp-settings-menu .ytp-quality-menu .ytp-menuitem').first();
        quality.trigger('click');
        console.log(quality);
    }
    else {
        setTimeout(initiate, 2000);
    }
   
}

$(document).ready(function() {
    setTimeout(initiate, 2000);
});