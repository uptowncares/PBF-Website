
document.addEventListener("DOMContentLoaded", () => {
    dismiss_notification_functionality();
    volunteer_form_functionality();
    toggle_event_data_functionality();
    toggle_dates_functionality();




    let dates = document.getElementsByClassName("dates");
    if(dates.length > 0){
        dates = Array.from(Array.from(dates)[0].children);
        dates.forEach((dateElement) => {
            dateElement.addEventListener("click", (event) => {

                Array.from(document.getElementsByName("volunteer-form"))[0].scrollIntoView({behavior:"smooth"});

                const dateInput = Array.from(document.getElementsByTagName('input'))[2];
                flicker_date_autofill(dateInput, event);
            })
        })
    }


});


const flicker_date_autofill = function(dateInput, event){

    const cycle = 800;

    for(let i = 0; i < 4; i++){
        setTimeout(() => {
            dateInput.value = "";
        }, i * cycle);

        setTimeout(() => {
            dateInput.value = event.target.id;
        }, i * cycle + 200)
    }

}


const toggle_dates_functionality = function(){
    const eventDatesToggle = document.getElementById("events").children[1].children[1].children[2].children[0].children[1];
    eventDatesToggle.addEventListener("click", (event) => {
        event.target.classList.toggle("toggle-show");
        const dates = event.target.parentNode.parentNode.children[1];
        dates.classList.toggle("dates-open");
    });
}

const toggle_event_data_functionality = function(){
    const eventDataToggle = document.getElementById("events").children[1].children[0].children[0];
    eventDataToggle.addEventListener("click", (event) => {
        event.target.classList.toggle("toggle-show2");
        const eventData = event.target.parentNode.parentNode.children[1];
        eventData.classList.toggle("event-data-open");
    });

}

const volunteer_form_functionality = function(){
    const form = Array.from(document.getElementsByName("volunteer-form"))[0];
    form.addEventListener("submit", (event) => process_volunteer_request(event));
}

const process_volunteer_request = function(event){
    event.preventDefault();
    const inputs = Array.from(document.getElementsByTagName('input'));
    const select = Array.from(document.getElementsByTagName('select'))[0];
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
            const date = inputs[2].value;
            const event = select.value;
            const description = textarea.value;
            send_volunteer_request(name, email, date, event, description, inputs, textarea);
            return;
        }
        system_notification("Please fill out the entire form", "", true);
        return;
    }
    system_notification("Please add a description of activites to the volunteer form", "This helps us make sure volunteers understand what to expect", true);
    return;
}

const clear_form = function(inputs, textarea){
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = "";
    }
    textarea.value = "";
}

const send_volunteer_request = async(name, email, date, event, description, inputs, textarea) => {
    try{
        const response = await fetch("https://pbf-website.onrender.com/volunteer-registration", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "name": name,
                "email": email,
                "date": date,
                "event": event,
                "description": description
            })
        })
        switch(response.status){
            case 201:
                clear_form(inputs, textarea);
                system_notification("Thank you for signing up!", "Please retain the information from the volunteer event for your own records.", true);
                break;
            case 400:
                system_notification("please try again.", "There was an issue with that request", true);
                break;
            case 500:
                system_notification("please try again", "The server had an issue processing that request", true);
                break;
            default:
                system_notification( "please try again", "There has been an unexpected issue", true);
                break;
        }
    }catch(error){
        console.log(error);
        system_notification("please try again.", "There was a network issue sending that request", true);
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