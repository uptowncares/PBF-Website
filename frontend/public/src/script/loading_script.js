

const show_loading = function(){
    const animation = document.getElementById('loader-icon');
    animation.style.display = 'flex';
    return lottie.loadAnimation({
        container: animation,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '../icons/Loader.json'
    });
}

const dismiss_loading = function(animationInstance){
    document.getElementById('loader-icon').style.display = 'none';
    animationInstance.destroy();
}

export default { dismiss_loading, show_loading };