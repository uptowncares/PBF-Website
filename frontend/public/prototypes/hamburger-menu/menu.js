'use strict';


document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById('menu');
    const animation = lottie.loadAnimation({
        container: menu,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '../../icons/icons8-menu.json'
    });
    animation.setSpeed(0.5);
    menu.addEventListener("click", () => toggle_hamburger(animation));

});

const toggle_hamburger = function(animation){
    if(animation.currentFrame == 14){
        animation.playSegments([15, 0], true);
    }
    else{
        animation.playSegments([0, 15], true);
    }
}