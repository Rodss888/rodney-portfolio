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
  
    // Remove previous success message
    const successMessage = contactForm.querySelector(".form-success-message");
  
    if (successMessage) {
      successMessage.remove();
    }
  
    // Clear old form values
    contactForm.reset();
  
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
  const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const submitButton = contactForm.querySelector(".message-submit-btn");
  const formData = new FormData(contactForm);

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      contactForm.reset();

      const oldMessage = document.querySelector(".form-success-message");
      if (oldMessage) {
        oldMessage.remove();
      }

      const successMessage = document.createElement("p");
      successMessage.className = "form-success-message";
      successMessage.textContent =
        "Message sent successfully! I’ll get back to you as soon as I can.";

      contactForm.prepend(successMessage);

      submitButton.textContent = "Send Message →";
      submitButton.disabled = false;
    } else {
      throw new Error("Form submission failed.");
    }
  } catch (error) {
    alert("Sorry, your message could not be sent. Please try again.");

    submitButton.textContent = "Send Message →";
    submitButton.disabled = false;
  }
});