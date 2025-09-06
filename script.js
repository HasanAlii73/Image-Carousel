document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevArrow = document.querySelector('.arrow-left');
    const nextArrow = document.querySelector('.arrow-right');

    let currentSlide = 0;
    let autoSlideInterval;

    function updateCarousel() {
        slidesContainer.style.transform = `translateX(-${currentSlide * 20}%)`;

        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    nextArrow.addEventListener('click', function () {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    prevArrow.addEventListener('click', function () {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', function () {
            stopAutoSlide();
            const slideIndex = parseInt(this.getAttribute('data-index'));
            goToSlide(slideIndex);
            startAutoSlide();
        });
    });

    const carousel = document.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    startAutoSlide();
});