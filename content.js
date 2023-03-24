/**
 * Content script is what has access to the DOM of the site
 * and make changes to the webpage
 */

//Sends a message to background script to enable the extension on YouTube page
chrome.runtime.sendMessage({todo: "showPageAction"});

//listens to update in URL from background script
//if url changes then call function to set the video quality
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.todo === 'change')
        initiate();
});

function initiate() {
    console.log('initiating...');
    if(document.querySelector('.ytp-button.ytp-settings-button')) {
        var button = $('.ytp-button.ytp-settings-button');
        button.trigger('click');
        //console.log(button);
        var option = $('.ytp-settings-menu .ytp-menuitem');
        option.each(function() {
            if($(this).find('.ytp-menuitem-label').text() == 'Quality') {
                $(this).trigger('click');
                var quality = $('.ytp-settings-menu .ytp-quality-menu .ytp-menuitem').first();
                quality.trigger('click');
            }
        });
    }
    else {
        setTimeout(initiate, 2000);
    }
   
}

function getVideoElement() {
    return $('video')[0];
}

function reqPiP() {
    console.log('request picture in picture...');
    let video = getVideoElement();
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
        video.requestPictureInPicture();
    }
}

let speed = 1.0;
function setVideoSpeed(faster) {
    let video = getVideoElement();
    if(faster) {
        if(speed < 2.0) {
            speed += 0.25;
        }
    } else {
        if(speed > 0.25) {
            speed -= 0.25
        }
    }
    video.playbackRate = speed;
}

function resetVideoSpeed() {
    let video = getVideoElement();
    speed = 1.0;
    video.playbackRate = speed;
}

$(document).ready(function() {
    setTimeout(initiate, 2000);
});

$(document).on('keyup', function(e) {
    console.log(e.which);
    switch (e.which) {
        case 81: //Q for quality
            initiate();
            break;
        case 87: //W for picture in picture
            reqPiP();
            break;
        case 82:
            resetVideoSpeed();
            break;
        case 188:
            setVideoSpeed(false);
            break;
        case 190:
            setVideoSpeed(true);
            break;
        default:
            break;
    }
});