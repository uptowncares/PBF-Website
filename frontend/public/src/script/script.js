'use strict';


document.addEventListener("DOMContentLoaded", () => {
    toggle_menu_functionality();
    toggle_more_info_functionality();
    toggle_about_founder_functionality();
    //process_contact_request();
    //process_volunteer();




});

const process_contact_request = function(){

    document.getElementById('submit-contact').addEventListener("click", () =>{
        window.alert("Sorry, we are not able to process your request yet. Please check back later")
    });

}


const process_volunteer = function(){

    document.getElementById('submit-volunteer').addEventListener("click", () =>{
        window.alert("Sorry, we are not able to accept volunteers yet. Please check back later")
    });

}






const toggle_about_founder_functionality = function(){
    const buttons = Array.from(document.getElementsByClassName('toggle-control-founder'));
    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const text = event.target.parentNode.parentNode.children[2];
            event.target.classList.toggle("toggle-show");
            if(text.style.height == '0px' || !(text.style.height)){
                text.style.height = text.scrollHeight + 'px';
            } 
            else{
                text.style.height =  '0px';
            }
        });
    })
}


const toggle_more_info_functionality = function(){
    const buttons = Array.from(document.getElementsByClassName('toggle-control'));
    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const text = event.target.parentNode.parentNode.children[1];
            event.target.classList.toggle("toggle-show");
            if(text.style.height == '0px' || !(text.style.height)){
                text.style.height = text.scrollHeight + 'px';
            } 
            else{
                text.style.height =  '0px';
            }
        });
    })
}


const toggle_menu_functionality = function(){
    const menuButton = document.getElementById('menu-button');
    menuButton.addEventListener("click", (event) => {
        console.log("clicking", event.target);
        document.getElementById('options-container').classList.toggle('show-menu');
    });
}