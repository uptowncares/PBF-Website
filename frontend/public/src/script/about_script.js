'use strict';


document.addEventListener("DOMContentLoaded", () => {
    toggle_about_founder_functionality();
});


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