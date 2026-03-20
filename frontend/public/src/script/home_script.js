'use strict';


document.addEventListener("DOMContentLoaded", () => {
    slideshow_functionality();

});


const reset_index = function(index){
    localStorage.setItem("PEGGY-BEATRICE-FOUNDATION", JSON.stringify({
        "index": index
    }));
}

const slideshow_transitions = function(){
    const parent = document.getElementById("hero-slideshow");
    if(parent){
        if(!localStorage.getItem("PEGGY-BEATRICE-FOUNDATION")){
            reset_index(0);
        }
        const images = Array.from(parent.children);
        let index = Number(JSON.parse(localStorage.getItem("PEGGY-BEATRICE-FOUNDATION"))["index"]);
        if(images[index].classList.contains("show-hero-image")){
            images[index].classList.remove("show-hero-image");
            index = (index >= (images.length - 1)) ? 0 : (index + 1)
            reset_index(index);
        }
        images[index].classList.add("show-hero-image");
        return;
    }
    console.log("error: slideshow container missing !");
    return;
}

const slideshow_functionality = function(){
    setInterval(slideshow_transitions, 5000);
}