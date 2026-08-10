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