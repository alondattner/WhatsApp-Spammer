// Copy this, edit the variables, paste into developer tools and execute

var message = "This is spam...";        //The message to send
var repetitions = 10;                   //The amount of repetitions
var delay = 800;                        //The delay between the messages in milliseconds

var timer;
spam(message, repetitions, delay);
function spam(message, repetitions, delay) {
    if(repetitions === 0) return;
    clearTimeout(timer);
    if(repetitions > 0) {
        dispatch(message);
        timer = setTimeout(function () {
            spam(message, repetitions-1, delay);
        }, delay);
    }
}
function dispatch(message) {
    InputEvent = Event || InputEvent;
    var evt = new InputEvent('input', {
        bubbles: true
    });
    document.getElementsByClassName("input")[1].innerHTML = message;
    document.getElementsByClassName("input")[1].dispatchEvent(evt);
    document.getElementsByClassName("compose-btn-send")[0].click();
}