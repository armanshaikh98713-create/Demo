const slider = document.getElementById('videoSlider');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    let slides = slider.querySelectorAll('.slide');
    let index = 1;

    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    firstClone.id = 'first-clone';
    lastClone.id = 'last-clone';

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);

    slides = slider.querySelectorAll('.slide');

    function centerActiveSlide() {
      const activeSlide = slides[index];
      const container = slider.parentElement;
      const containerWidth = container.offsetWidth;
      const slideWidth = activeSlide.offsetWidth;

      const offset = activeSlide.offsetLeft - (containerWidth / 2) + (slideWidth / 2);
      slider.style.transition = 'transform 0.5s ease-in-out';
      slider.style.transform = `translateX(-${offset}px)`;
    }

    nextBtn.addEventListener('click', () => {
      if (index >= slides.length - 1) return;
      index++;
      centerActiveSlide();
    });

    prevBtn.addEventListener('click', () => {
      if (index <= 0) return;
      index--;
      centerActiveSlide();
    });

    slider.addEventListener('transitionend', () => {
      if (slides[index].id === 'first-clone') {
        slider.style.transition = 'none';
        index = 1;
        centerActiveSlide();
      }

      if (slides[index].id === 'last-clone') {
        slider.style.transition = 'none';
        index = slides.length - 2;
        centerActiveSlide();
      }
    });

    window.addEventListener('load', centerActiveSlide);
    window.addEventListener('resize', centerActiveSlide);

    // Modal logic
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalDescription = document.getElementById('modalDescription');
    const modalExtraDesc = document.getElementById('modalExtraDesc');
    const closeModal = document.getElementById('closeModal');

    const videoSlides = document.querySelectorAll('.slide');

    videoSlides.forEach(slide => {
      const video = slide.querySelector('video');
      const desc = slide.querySelectorAll('p');
      const description = desc[0]?.innerText || '';
      const extraDesc = slide.querySelector('.extra-desc')?.innerText || '';

      video.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalVideo.src = video.src;
        modalDescription.innerText = description;
        modalExtraDesc.innerText = extraDesc;
        modalVideo.play();
      });
    });

    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
      modalVideo.pause();
      modalVideo.src = '';
      modalExtraDesc.innerText = '';
    });