async function loadPartial(selector, path) {
  const target = document.querySelector(selector);
  if (!target) return;
  try {
    const response = await fetch(path);
    if (!response.ok) return;
    target.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

function initSlideshows() {
  const slideshows = document.querySelectorAll("[data-slideshow]");
  slideshows.forEach((slideshow) => {
    const slides = Array.from(slideshow.querySelectorAll(".slide"));
    if (!slides.length) return;
    let index = 0;
    const indicator = slideshow.querySelector("[data-slideshow-indicator]");
    const prevButton = slideshow.querySelector("[data-slide-prev]");
    const nextButton = slideshow.querySelector("[data-slide-next]");

    const update = () => {
      slides.forEach((slide, i) => {
        slide.classList.toggle("is-active", i === index);
      });
      if (indicator) {
        indicator.textContent = `${index + 1} / ${slides.length}`;
      }
    };

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        update();
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        update();
      });
    }

    update();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadPartial("#site-header", "header.html");
  loadPartial("#site-footer", "footer.html");
  initSlideshows();
});

function openCvDialog() {
  const cvDialog = document.querySelector("[data-cv-dialog]");
  if (!cvDialog) return;
  cvDialog.showModal();
}

function closeCvDialog() {
  const cvDialog = document.querySelector("[data-cv-dialog]");
  if (!cvDialog) return;
  cvDialog.close();
}

function openContactModal() {
  const contactModal = document.querySelector("[data-contact-modal]");
  if (!contactModal) return;
  contactModal.showModal();
}

function closeContactModal() {
  const contactModal = document.querySelector("[data-contact-modal]");
  if (!contactModal) return;
  contactModal.close();
}

document.addEventListener("click", (event) => {
  const openCvTrigger = event.target.closest("[data-open-cv]");
  if (openCvTrigger) {
    event.preventDefault();
    openCvDialog();
    return;
  }

  const closeCvTrigger = event.target.closest("[data-close-cv]");
  if (closeCvTrigger) {
    event.preventDefault();
    closeCvDialog();
    return;
  }

  const openContactTrigger = event.target.closest("[data-open-contact]");
  if (openContactTrigger) {
    event.preventDefault();
    openContactModal();
    return;
  }

  const closeContactTrigger = event.target.closest("[data-close-contact]");
  if (closeContactTrigger) {
    event.preventDefault();
    closeContactModal();
  }
});

document.addEventListener("click", (event) => {
  const cvDialog = document.querySelector("[data-cv-dialog]");
  if (cvDialog && event.target === cvDialog) {
    closeCvDialog();
  }

  const contactModal = document.querySelector("[data-contact-modal]");
  if (contactModal && event.target === contactModal) {
    closeContactModal();
  }
});
