document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");
  const imageButtons = document.querySelectorAll(".image-button");

  imageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const src = button.getAttribute("data-full");
      const alt = button.getAttribute("data-alt") || "Expanded image";

      if (lightboxImage && lightbox) {
        lightboxImage.src = src;
        lightboxImage.alt = alt;
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
      }
    });
  });

  function closeLightbox() {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });

  const survivorSection = document.querySelector(".survivor-section");
  const survivorControls = document.getElementById("survivorControls");
  const survivorStatusBadge = document.getElementById("survivorStatusBadge");
  const survivorStateMessage = document.getElementById("survivorStateMessage");
  const survivorQuickOpen = document.getElementById("survivorQuickOpen");
  const survivorCardBadge = document.getElementById("survivorCardBadge");
  const survivorCardText = document.getElementById("survivorCardText");

  function applySurvivorStatus(status) {
    if (!survivorControls || !survivorStatusBadge || !survivorStateMessage) return;

    if (status === "open") {
      survivorStatusBadge.textContent = "Open Now";
      survivorStatusBadge.className = "badge badge-open";
      survivorStateMessage.textContent =
        "If you didn’t join last year, don’t miss your chance to play & win this year!";
      survivorControls.classList.remove("hidden");

      if (survivorCardBadge) {
        survivorCardBadge.textContent = "Open Now";
        survivorCardBadge.className = "status-badge available";
      }

      if (survivorCardText) {
        survivorCardText.textContent =
          "Submission is live. Jump to the Survivor section and submit your pick.";
      }
    } else if (status === "closed") {
      survivorStatusBadge.textContent = "Closed for Today";
      survivorStatusBadge.className = "badge badge-closed";
      survivorStateMessage.textContent =
        "Today’s submission window has ended. Picks are now locked.";
      survivorControls.classList.add("hidden");

      if (survivorCardBadge) {
        survivorCardBadge.textContent = "Closed";
        survivorCardBadge.className = "status-badge closed";
      }

      if (survivorCardText) {
        survivorCardText.textContent =
          "Today’s Survivor submission window has ended. View rules and status here.";
      }
    } else {
      survivorStatusBadge.textContent = "Opens Soon";
      survivorStatusBadge.className = "badge badge-pending";
      survivorStateMessage.textContent =
        "If you didn’t join last year, don’t miss your chance to play & win this year!";
      survivorControls.classList.add("hidden");

      if (survivorCardBadge) {
        survivorCardBadge.textContent = "Opens Soon";
        survivorCardBadge.className = "status-badge pending";
      }

      if (survivorCardText) {
        survivorCardText.textContent =
          "Submission is not open yet. View contest details and check back later.";
      }
    }
  }

  if (survivorSection) {
    const survivorStatus = (survivorSection.dataset.survivorStatus || "pending")
      .trim()
      .toLowerCase();

    applySurvivorStatus(survivorStatus);
  }

  if (survivorQuickOpen && survivorSection) {
    survivorQuickOpen.addEventListener("click", () => {
      setTimeout(() => {
        survivorSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    });
  }
});