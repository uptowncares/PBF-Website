'use strict';


document.addEventListener("DOMContentLoaded", () => {
    toggle_menu_functionality();
    page_highlight();
    header_contact_navigation();


    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                console.log("element intersecting: ", entry.target);
                const element = entry.target;
                element.classList.add('text-fade-in');
                observer.unobserve(element)
            }
        })
    }, {
        threshold: 1.0
    });


    const text = Array.from(document.getElementsByTagName('h2'));
    text.forEach((element) => {
        observer.observe(element);
    })




});

const header_contact_navigation = function(){
    const button = document.getElementById("header-actions").children[0];
    button.addEventListener("click", () => {
        window.location.assign('contact.html');
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
        path: '../../public/icons/icons8-menu.json'
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