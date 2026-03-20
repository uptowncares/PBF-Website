'use strict';



document.addEventListener("DOMContentLoaded", () => {
    toggle_more_info_functionality();
});


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

