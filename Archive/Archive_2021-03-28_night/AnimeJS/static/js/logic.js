const images = document.querySelectorAll("span");

images.forEach((image, index) => {
    image.addEventListener("click", e => {
        anime({
            targets: images,
            autoplay: true,
            opacity: [
                { value: .5, easing: "easeOutSine", duration: 600 },
                { value: 1, easing: "easeInOutQuad", duration: 900 }
            ],
            filter: [
                { value: "blur(5px) grayscale(100%)", easing: "easeOutSine", duration: 700 },
                { value: "blur(0px) grayscale(0%)", easing: "easeInOutQuad", duration: 1000 }
            ],
            borderRadius: [
                { value: "50%", easing: "easeOutSine", duration: 700 },
                { value: "0%", easing: "easeInOutQuad", duration: 1000 }
            ],
            scale: [
                { value: 0.5, easing: "easeOutSine", duration: 600 },
                { value: 1, easing: "easeInOutQuad", duration: 1100 }
            ],
            delay: anime.stagger(200, { grid: [5, 3], from: index })
        });
    });
});

window.onload = () => document.querySelector('h1').remove();
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("img").forEach(img => {
        img.onerror = function () {
            this.style.display = "none";
        };
    });
});