const logo_img = document.getElementById("logo")

logo_img.addEventListener("click", function() {
    if(!logo.style.animationPlayState || logo.style.animationPlayState==="paused") {
        logo.style.animationPlayState = "running"
    }
    else {
        logo.style.animationPlayState = "paused"
    }
})


const nav_bar = document.getElementsByTagName("nav");
const page_links = document.querySelectorAll("div.lower_pic_container");
const lower_flex = document.getElementsByClassName("lower_pic_flex")[0];

nav_bar[0].addEventListener("touchstart", function() {
    for (let link of page_links) {
        console.log(link)
        if(!link.classList.contains("stop_animation")) {
            link.classList.add("stop_animation");
        }
    }
    lower_flex.style.overflow = "auto";
})

nav_bar[0].addEventListener("mouseover", function() {
    for (let link of page_links) {
        console.log(link)
        if (!link.classList.contains("pause_animation")) {
            link.classList.add("pause_animation");
        }
    }
    lower_flex.style.overflow = "none";
})

nav_bar[0].addEventListener("mouseout", function() {
    for (let link of page_links) {
        console.log(link)
        if (link.classList.contains("pause_animation")) {
            link.classList.remove("pause_animation");
        }
    }
    lower_flex.style.overflow = "none";
})
