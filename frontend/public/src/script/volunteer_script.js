



document.addEventListener("DOMContentLoaded", () => {




    
});



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