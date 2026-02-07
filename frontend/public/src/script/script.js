'use strict';


document.addEventListener("DOMContentLoaded", () => {
    toggle_menu_functionality();

});


const toggle_menu_functionality = function(){
    const menuButton = document.getElementById('menu-button');
    menuButton.addEventListener("click", (event) => {
        console.log("clicking", event.target);
        document.getElementById('options-container').classList.toggle('show-menu');
    });
}