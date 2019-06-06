const logo_img = document.getElementById("logo")

logo_img.addEventListener("click", function() {
    if(!logo.style.animationPlayState || logo.style.animationPlayState==="paused") {
        logo.style.animationPlayState = "running"
    }
    else {
        logo.style.animationPlayState = "paused"
    }
})
