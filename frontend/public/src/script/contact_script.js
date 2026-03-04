'use strict';


document.addEventListener("DOMContentLoaded", () => {
    contact_functionality();

});

const contact_functionality = function(){

    dismiss_notification_functionality();
    const form = Array.from(document.getElementsByName('contact-form'))[0];
    form.addEventListener("submit", (event) => process_contact_request(event));
}

const process_contact_request = function(event){
    event.preventDefault();
    const inputs = Array.from(document.getElementsByTagName('input'));
    const textarea = Array.from(document.getElementsByTagName('textarea'))[0];
    let invalidForm = false;
    if(textarea.value == "") invalidForm = true;
    if(!invalidForm){
        for(let i = 0; i < inputs.length; i++){
            if(inputs[i].value == ""){
                invalidForm = true;
                break;
            }
        }
        if(!invalidForm){
            const name = inputs[0].value;
            const email = inputs[1].value;
            const subject = inputs[2].value;
            const message = textarea.value;
            send_contact_request(name, email, subject, message, inputs, textarea);
            return;
        }
        system_notification("Please fill out the entire form", "", true);
        return;
    }
    system_notification("Please add a message to the contact form", "", true);
    return;
}

const clear_contact_form = function(inputs, textarea){
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = "";
    }
    textarea.value = "";
}

const send_contact_request = async(name, email, subject, message, inputs, textarea) => {
    try{
        const response = await fetch("http://127.0.0.1:3000/contact-us", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "name": name,
                "email": email,
                "subject": subject,
                "message": message
            })
        })
        switch(response.status){
            case 201:
                clear_contact_form(inputs, textarea);
                window.alert("Thank you for reaching out, we will get back to you as soon as possible.");
                break;
            case 400:
                window.alert("There was an issue with that request, please try again.");
                break;
            case 500:
                window.alert("The server had an issue processing that request, please try again");
                break;
            default:
                window.alert("There has been an unexpected issue, please try again");
                break;
        }
    }catch(error){
        console.log(error);
        window.alert("There was a network issue sending that request, please try again.");
    }
}

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