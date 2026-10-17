'use strict';

document.addEventListener("DOMContentLoaded", async() => {
        dismiss_notification_functionality();
});

const dismiss_notification_functionality = function(){
    const button = document.getElementById('notification-confirmation');
    button.addEventListener('click', () => system_notification("", "", false));
}

const populate_notification_text = function(parent, h1, h2){
    const title = parent.children[0];
    title.textContent = h1;
    const subtitle = parent.children[1];
    subtitle.textContent = h2;
}

const system_notification = function(h1, h2, boolean){
    const backdrop = document.getElementById('backdrop');
    const notification = document.getElementById('notification-modal');
    if(boolean){
        backdrop.classList.add('show-backdrop');
        notification.classList.add('show-notification');
        populate_notification_text(notification, h1, h2);
    }
    else{
        notification.classList.remove('show-notification');
        backdrop.classList.remove('show-backdrop');
    }
}