const carousel = document.getElementById('carousel');
const imageUpload = document.getElementById('imageUpload');
const speedInput = document.getElementById('speed');
const continueButton = document.getElementById('continueButton');
const backButton = document.getElementById('backButton');
const setupPage = document.getElementById('setup');
const carouselPage = document.getElementById('carouselPage');
let images = [];
let currentIndex = 0;
let interval;

function updateCarousel() {
    const offset = -currentIndex * 100; // Assuming each image is 100% of the carousel's width
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
            img.onload = function() { // Ensure image is fully loaded
                carousel.appendChild(img);
                images.push(e.target.result);
            };
        };
        reader.readAsDataURL(files[i]);
    }
});

continueButton.addEventListener('click', () => {
    if (images.length > 0) {
        setupPage.classList.remove('active');
        carouselPage.classList.add('active');
        currentIndex = 0;
        startCarousel();
    } else {
        alert("Please upload at least one image to continue.");
    }
});

backButton.addEventListener('click', () => {
    setupPage.classList.add('active');
    carouselPage.classList.remove('active');
    clearInterval(interval);
});
