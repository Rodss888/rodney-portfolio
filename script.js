function openImage(src) {
    const lightbox = document.getElementById("imageLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
  
    lightboxImage.src = src;
    lightbox.classList.add("active");
  }
  
  function closeImage() {
    const lightbox = document.getElementById("imageLightbox");
    lightbox.classList.remove("active");
  }
  function openVideo(src) {
    const lightbox = document.getElementById("videoLightbox");
    const video = document.getElementById("lightboxVideo");
  
    video.src = src;
  
    video.muted = true;
    video.volume = 0;
  
    lightbox.classList.add("active");
    video.play();
  }
  
  function closeVideo() {
    const lightbox = document.getElementById("videoLightbox");
    const video = document.getElementById("lightboxVideo");
  
    video.pause();
    video.currentTime = 0;
    video.src = "";
    lightbox.classList.remove("active");
  }
  function openContactForm() {
    const modal = document.getElementById("contactModal");
    const contactForm = document.getElementById("contact-form");
  
    const successMessage = contactForm.querySelector(".form-success-message");
  
    if (successMessage) {
      successMessage.remove();
    }
  
    contactForm.reset();
  
    const formGroups = contactForm.querySelectorAll(".form-group");
  
    formGroups.forEach(function (group) {
      group.style.display = "flex";
    });
  
    const submitButton = contactForm.querySelector(".message-submit-btn");
  
    submitButton.style.display = "block";
    submitButton.disabled = false;
    submitButton.textContent = "Send Message →";
  
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  
  function closeContactForm() {
    const modal = document.getElementById("contactModal");
  
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
  
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeContactForm();
    }
  });
  
  window.submitContactForm = async function (event) {
    event.preventDefault();
  
    const contactForm = document.getElementById("contact-form");
    const submitButton = contactForm.querySelector(".message-submit-btn");
    const formData = new FormData(contactForm);
  
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  
    try {
      const response = await fetch("https://formspree.io/f/maewoyaj", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });
  
      if (!response.ok) {
        throw new Error("Submission failed");
      }
  
      contactForm.reset();
  
      const formGroups = contactForm.querySelectorAll(".form-group");
  
      formGroups.forEach(function (group) {
        group.style.display = "none";
      });
  
      submitButton.style.display = "none";
  
      const oldMessage = contactForm.querySelector(".form-success-message");
  
      if (oldMessage) {
        oldMessage.remove();
      }
  
      const successMessage = document.createElement("p");
      successMessage.className = "form-success-message";
      successMessage.textContent =
        "Message sent successfully! I'll get back to you as soon as I can.";
  
      contactForm.prepend(successMessage);
  
    } catch (error) {
      alert("Sorry, your message could not be sent. Please try again.");
      console.error(error);
  
      submitButton.disabled = false;
      submitButton.textContent = "Send Message →";
    }
  };
  window.addEventListener("load", function () {
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname);
    }
  
    window.scrollTo(0, 0);
  });

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("active");
});

navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("active");
  });
});

  function selectProjectImage(galleryId, clickedIndex) {
    const gallery = document.getElementById(galleryId);
    const images = Array.from(gallery.querySelectorAll(".showcase-image"));
  
    const centerIndex = images.findIndex(img =>
      img.classList.contains("showcase-center")
    );
  
    // If center image is clicked, open full preview
    if (clickedIndex === centerIndex) {
      openImage(images[clickedIndex].src);
      return;
    }
  
    // Remove current positions
    images.forEach(img => {
      img.classList.remove(
        "showcase-left",
        "showcase-center",
        "showcase-right"
      );
    });
  
    // Put clicked image in center
    const leftIndex =
      (clickedIndex - 1 + images.length) % images.length;
  
    const rightIndex =
      (clickedIndex + 1) % images.length;
  
    images[leftIndex].classList.add("showcase-left");
    images[clickedIndex].classList.add("showcase-center");
    images[rightIndex].classList.add("showcase-right");
  }
  function selectProjectMedia(galleryId, clickedIndex) {
    const gallery = document.getElementById(galleryId);
    const items = Array.from(gallery.querySelectorAll(".showcase-image"));
  
    const centerIndex = items.findIndex(item =>
      item.classList.contains("showcase-center")
    );
  
    // If center item is clicked, open it
    if (clickedIndex === centerIndex) {
      const activeItem = items[clickedIndex];
      const type = activeItem.dataset.type;
  
      if (type === "video") {
        openVideo(activeItem.dataset.src);
      } else {
        openImage(activeItem.src);
      }
  
      return;
    }
  
    // Remove current positions
    items.forEach(item => {
      item.classList.remove(
        "showcase-left",
        "showcase-center",
        "showcase-right"
      );
    });
  
    const leftIndex =
      (clickedIndex - 1 + items.length) % items.length;
  
    const rightIndex =
      (clickedIndex + 1) % items.length;
  
    items[leftIndex].classList.add("showcase-left");
    items[clickedIndex].classList.add("showcase-center");
    items[rightIndex].classList.add("showcase-right");
  }