'use strict';

document.addEventListener("DOMContentLoaded", () => {
    page_reveal();
});

const page_reveal = function(){
    setTimeout(() => {
        const pageLoad = document.getElementById("page-load");
        if(pageLoad){
            const image = pageLoad.children[0];        
            image.classList.add("page-loaded-image");
            setTimeout(() => {
                pageLoad.classList.add("page-loaded");
            }, 1000);
        }
    }, 1700);
}