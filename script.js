const cvDialog = document.querySelector("[data-cv-dialog]");
const openCvButtons = document.querySelectorAll("[data-open-cv]");
const closeCvButton = document.querySelector("[data-close-cv]");
const contactModal = document.querySelector("[data-contact-modal]");
const openContactButtons = document.querySelectorAll("[data-open-contact]");
const closeContactButton = document.querySelector("[data-close-contact]");

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
  if (!cvDialog) return;
  cvDialog.showModal();
}

function closeCvDialog() {
  if (!cvDialog) return;
  cvDialog.close();
}

openCvButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    openCvDialog();
  });
});

if (closeCvButton) {
  closeCvButton.addEventListener("click", closeCvDialog);
}

if (cvDialog) {
  cvDialog.addEventListener("click", (event) => {
    if (event.target === cvDialog) {
      closeCvDialog();
    }
  });
}

function openContactModal() {
  if (!contactModal) return;
  contactModal.showModal();
}

function closeContactModal() {
  if (!contactModal) return;
  contactModal.close();
}

openContactButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    openContactModal();
  });
});

if (closeContactButton) {
  closeContactButton.addEventListener("click", closeContactModal);
}

if (contactModal) {
  contactModal.addEventListener("click", (event) => {
    if (event.target === contactModal) {
      closeContactModal();
    }
  });
}
