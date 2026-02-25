'use strict';



document.addEventListener("DOMContentLoaded", () => {
        process_donation();

});




const process_donation = function(){
    Array.from(document.getElementsByClassName('donation')).forEach((button) => {
        button.addEventListener("click", () => {
            window.alert("Sorry, we are not able to accept donations yet. Please check back later");
        })
    })

}