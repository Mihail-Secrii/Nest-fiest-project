document.addEventListener('DOMContentLoaded', function () {
    const autoSliderSpeed = 5000; // 5 sec

    let slider = document.querySelector('.slider'),
        sliders = slider.querySelector('.slider-blocks'),
        sliderLeftBtn = slider.querySelector('.slider-btn-left '),
        sliderRightBtn = slider.querySelector('.slider-btn-right'),
        dots = slider.querySelectorAll('.slider-dots .dot'),
        currentSlide = 0;

    let autoSlideController = setTimeout(autoSlide, autoSliderSpeed);
    const slidersCount = sliders.children.length - 1;

    for (let i = 0, n = dots.length; i < n; i++) {
        let dot = dots[i];
        dot.addEventListener('click', () => {
            slide(dot.dataset.slide - currentSlide);
        });
    }

    sliderLeftBtn.addEventListener('click', () => {
        slide(-1);
    });

    sliderRightBtn.addEventListener('click', () => {
        slide(+1);
    });

    function slide(step = 1) {
        let activeSlide = currentSlide;
        currentSlide += step;

        if (currentSlide < 0) {
            currentSlide = slidersCount;
        }

        if (currentSlide > slidersCount) {
            currentSlide = 0;
        }

        dots[activeSlide].classList.remove('active');
        dots[currentSlide].classList.add('active');
        sliders.style.transform = `translateX(calc(${currentSlide} * -100%))`;

        clearTimeout(autoSlideController);
        autoSlideController = setTimeout(autoSlide, 5000);
    }

    function autoSlide() {
        slide(+1);
    }
}, false);