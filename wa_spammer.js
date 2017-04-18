// ==UserScript==
// @name WhatsApp Spammer
// @namespace http://www.dattnerdev.de/
// @version 1.0
// @description Allows to send spam messages in WhatsApp Web. The message, repetitions and delay are configurable.
// @match https://web.whatsapp.com/*
// @copyright 2017+, DattnerDev
// ==/UserScript==

var timer;

//Wait five seconds to fully load the page
setTimeout(general, 5000);

function general(){

    //Create the spam button, set class name, set HTML and add event listener
    var button_spam = document.createElement("div");
    button_spam.className = 'menu-item';
    button_spam.innerHTML = '<button class="icon icon-refresh" title="Spammen"></button><span></span>';
    button_spam.addEventListener("click", openSpamDialog);

    //Insert the spam button before first horizontal menu item
    document.getElementsByClassName("menu-item")[0].parentNode.insertBefore(button_spam, document.getElementsByClassName("menu-item")[0]);
}

/*
 *  Opens a dialog to collect information
 */
function openSpamDialog(){
    
    //Check if any chat is opened
    if(document.getElementsByClassName("input")[1] === undefined || document.getElementsByClassName("input")[1] == null) {
        alert("Please open a chat before clicking the spam button.");
        return;
    }

    //Ask for message
    var message = prompt("Enter the message you want to send", "This is spam...");
    if(message === "") {
        alert("Sorry, you have to enter a valid text!");
        return;
    }

    //Ask for spam repetitions
    var repetitions = prompt("Enter the amount of messages you want to send", "10");
    if(repetitions === "") {
        alert("Sorry, you have to enter a valid number!");
        return;
    }
    if(parseInt(repetitions) === "") {
        alert("Sorry, you have to enter a valid number!");
        return;
    }

    //Ask for spam delay
    var delay = prompt("Enter the delay between the messages (in milliseconds)", "800");
    if(delay === "") {
        alert("Sorry, you have to enter a valid number!");
        return;
    }
    if(parseInt(delay) === "") {
        alert("Sorry, you have to enter a valid number!");
        return;
    }

    //Send messages
    spam(message, repetitions, delay);
}

/*
 *  Sends a message a specific amount of times with a specific delay in between
 */
function spam(message, repetitions, delay) {
    
    //Cancel if repetitions is 0
    if(repetitions === 0) return;
    
    //Clear timeout
    clearTimeout(timer);

    //Send message if repetitions is larger than 0 and set timeout to add delay
    if(repetitions > 0) {
        dispatch(message);
        timer = setTimeout(function () {
            spam(message, repetitions-1, delay);
        }, delay);
    }
}

/*
 *  Dispatches a message
 */
function dispatch(message) {

    //Create new 'input' event
    InputEvent = Event || InputEvent;
    var evt = new InputEvent('input', {
        bubbles: true
    });

    //Get spam message and fire event
    document.getElementsByClassName("input")[1].innerHTML = message;
    document.getElementsByClassName("input")[1].dispatchEvent(evt);

    //Click 'send' button
    document.getElementsByClassName("compose-btn-send")[0].click();
}