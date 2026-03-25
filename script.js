document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");
  const imageButtons = document.querySelectorAll(".image-button");

  imageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const src = button.getAttribute("data-full");
      const alt = button.getAttribute("data-alt") || "Expanded image";

      if (lightbox && lightboxImage) {
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

  const sweet16Section = document.querySelector(".sweet16-section");
  const sweet16Controls = document.getElementById("sweet16Controls");
  const sweet16StatusBadge = document.getElementById("sweet16StatusBadge");
  const sweet16StateMessage = document.getElementById("sweet16StateMessage");

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
          "Survivor is now open. Lock in your pick for the day and let’s ride.";
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
          "Today’s submission window has ended. Picks are now locked.";
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

  function applySweet16Status(status) {
    if (!sweet16Controls || !sweet16StatusBadge || !sweet16StateMessage) return;

    if (status === "open") {
      sweet16StatusBadge.textContent = "Open Now";
      sweet16StatusBadge.className = "badge badge-open";
      sweet16StateMessage.textContent =
        "Sweet 16 Reset is now open. Reset your bracket and jump back into the action.";
      sweet16Controls.classList.remove("hidden");
    } else if (status === "closed") {
      sweet16StatusBadge.textContent = "Closed";
      sweet16StatusBadge.className = "badge badge-closed";
      sweet16StateMessage.textContent =
        "Sweet 16 Reset entries are now closed.";
      sweet16Controls.classList.add("hidden");
    } else {
      sweet16StatusBadge.textContent = "Opens Round of 16";
      sweet16StatusBadge.className = "badge badge-pending";
      sweet16StateMessage.textContent =
        "Sweet 16 Reset opens when the tournament reaches the Round of 16.";
      sweet16Controls.classList.add("hidden");
    }
  }

  if (survivorSection) {
    const survivorStatus = (survivorSection.dataset.survivorStatus || "pending")
      .trim()
      .toLowerCase();

    applySurvivorStatus(survivorStatus);
  }

  if (sweet16Section) {
    const sweet16Status = (sweet16Section.dataset.sweet16Status || "pending")
      .trim()
      .toLowerCase();

    applySweet16Status(sweet16Status);
  }

  if (survivorQuickOpen && survivorSection) {
    survivorQuickOpen.addEventListener("click", () => {
      setTimeout(() => {
        survivorSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    });
  }
});
