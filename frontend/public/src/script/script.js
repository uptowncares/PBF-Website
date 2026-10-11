'use strict';

document.addEventListener("DOMContentLoaded", () => {
    scroll_event_functionality();
    toggle_menu_functionality();
    page_highlight();
    header_contact_navigation();
    //night_mode_functionality();
});

const night_mode_functionality = function(){
    switch_UI_modes();
    const nightMode = document.getElementById("night-mode");
    nightMode.addEventListener("click", (event) => {
        switch_UI_modes();
    });
}

const switch_UI_modes = function(){
    if(!(localStorage.getItem("PBF-utility--night-mode"))){
        localStorage.setItem("PBF-utility--night-mode", "true");
    }
    else if(localStorage.getItem("PBF-utility--night-mode") == "true"){
        for(let i = 1; i <= 5; i++){
            night_to_day(i);
        }
        localStorage.setItem("PBF-utility--night-mode", "false");
    }
    else{
        for(let i = 1; i <= 5; i++){
            day_to_night(i);
        }
        localStorage.setItem("PBF-utility--night-mode", "true");
    }
}

const day_to_night = function(i){
    const temp = getComputedStyle(document.documentElement).getPropertyValue(`--group${i}`);
    const newColor = getComputedStyle(document.documentElement).getPropertyValue(`--group${i}-alt`);
    document.documentElement.style.setProperty(`--group${i}`, newColor);
    document.documentElement.style.setProperty(`--group${i}-alt`, temp);
}

const night_to_day = function(i){
    const temp = getComputedStyle(document.documentElement).getPropertyValue(`--group${i}-alt`);
    const newColor = getComputedStyle(document.documentElement).getPropertyValue(`--group${i}`);
    document.documentElement.style.setProperty(`--group${i}-alt`, newColor);
    document.documentElement.style.setProperty(`--group${i}`, temp);
}

const scroll_event_functionality = function(){
    const windowHeight = window.innerHeight;
    const topViewRange = (windowHeight / 2) + (windowHeight / 3);
    const bottomViewRange = (windowHeight / 2) - (windowHeight / 8);


    const sampleText = Array.from(document.getElementsByTagName("h1"));
    check_visibility_range(sampleText, topViewRange, bottomViewRange, windowHeight);
    window.addEventListener("scroll", () => {
        check_visibility_range(sampleText, topViewRange, bottomViewRange, windowHeight);
    }, true);
}

const check_visibility_range = function(sampleText, topViewRange, bottomViewRange, windowHeight){
    for(let i = 0; i < sampleText.length; i++){
        const elementPosition = Math.floor(windowHeight - (sampleText[i].getBoundingClientRect().top));
        if(((elementPosition < topViewRange) && (elementPosition > bottomViewRange))){
            if(!sampleText[i].classList.contains("h1-show")){
                sampleText[i].classList.add("h1-show");
            }
        }
        else{
            if(sampleText[i].classList.contains("h1-show")){
                sampleText[i].classList.remove("h1-show");
            }
        }
    };
}

const header_contact_navigation = function(){
    const button = document.getElementById("header-actions").children[0];
    button.addEventListener("click", () => {
        window.location.assign('/contact');
    });
}

const page_highlight = function(){
    const pageTitle = ((document.head.children[0]).textContent).split(" ")[0];
    let index = undefined;
    if(pageTitle == "Home"){
        index = 0;
    }
    else if(pageTitle == "About"){
        index = 1;
    }
    else if(pageTitle == "Programs"){
        index = 4;
    }
    else if(pageTitle == "Donate"){
        index = 5;
    }
    else if(pageTitle == "Contact"){
        index = 3;
    }
    else if(pageTitle == "Gallery"){
        index = 2;
    }
    if(index || index == 0){
        const list = document.getElementById("options-container").children;
        const element = list[index].children[0];
        element.classList.add('selected-page-highlight');
    }
}

const toggle_menu_functionality = function(){
    const menuButton = document.getElementById('menu-button');
    const animation = lottie.loadAnimation({
        container: menuButton,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '/icons/icons8-menu.json'
    });
    animation.setSpeed(0.75);

    menuButton.addEventListener("click", (event) => {
        toggle_hamburger(animation)
        document.getElementById('options-container').classList.toggle('show-menu');
    });
}

const toggle_hamburger = function(animation){
    if(animation.currentFrame == 14){
        animation.playSegments([15, 0], true);
    }
    else{
        animation.playSegments([0, 15], true);
    }
}