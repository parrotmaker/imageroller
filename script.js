const carousel = document.getElementById('carousel');
const imageUpload = document.getElementById('imageUpload');
const speedInput = document.getElementById('speed');
let images = [];
let currentIndex = 0;
let interval;

function updateCarousel() {
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
    currentIndex = (currentIndex + 1) % images.length;
}

function startCarousel() {
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(updateCarousel, parseInt(speedInput.value));
}

imageUpload.addEventListener('change', (event) => {
    const files = event.target.files;
    images = [];
    carousel.innerHTML = '';
    
    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            carousel.appendChild(img);
            images.push(e.target.result);

            if (images.length === 1) {
                startCarousel();
            }
        };
        reader.readAsDataURL(files[i]);
    }
});

speedInput.addEventListener('input', startCarousel);
