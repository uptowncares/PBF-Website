'use strict';


document.addEventListener("DOMContentLoaded", () => {
    toggle_menu_functionality();
    toggle_more_info_functionality();
    toggle_about_founder_functionality();
    page_highlight();


});


const page_highlight = function(){
    const pageTitle = document.head.children[0];
    let index = false;
    if((pageTitle.textContent).split(" ")[0] == "Home"){
        index = 0;
    }
    else if((pageTitle.textContent).split(" ")[0] == "About"){
        index = 1;
    }
    else if((pageTitle.textContent).split(" ")[0] == "Programs"){
        index = 4;
    }
    else if((pageTitle.textContent).split(" ")[0] == "Donate"){
        index = 5;
    }
    else if((pageTitle.textContent).split(" ")[0] == "Contact"){
        index = 3;
    }
    else if((pageTitle.textContent).split(" ")[0] == "Gallery"){
        index = 2;
    }
    if(index || index == 0){
        const list = document.getElementById("options-container").children;
        console.log(list[index]);
        const element = list[index].children[0];
        element.classList.add('selected-page-highlight');
    }
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