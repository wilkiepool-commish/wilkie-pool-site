const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const imageButtons = document.querySelectorAll(".image-button");

imageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const src = button.getAttribute("data-full");
    const alt = button.getAttribute("data-alt") || "Expanded image";

    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox() {
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
  if (event.key === "Escape" && lightbox.classList.contains("open")) {
    closeLightbox();
  }
});

const survivorSection = document.querySelector(".survivor-section");
const survivorControls = document.getElementById("survivorControls");
const survivorStatusBadge = document.getElementById("survivorStatusBadge");
const survivorStateMessage = document.getElementById("survivorStateMessage");
const toggleSurvivorForm = document.getElementById("toggleSurvivorForm");
const survivorForm = document.getElementById("survivorForm");
const survivorQuickOpen = document.getElementById("survivorQuickOpen");

if (survivorSection && survivorControls && survivorStatusBadge && survivorStateMessage) {
  const survivorStatus = survivorSection.dataset.survivorStatus || "pending";

  if (survivorStatus === "open") {
    survivorStatusBadge.textContent = "Open Now";
    survivorStatusBadge.className = "badge badge-open";
    survivorStateMessage.textContent =
      "Submit your Survivor pick before the first game tips off today.";
    survivorControls.classList.remove("hidden");
  } else if (survivorStatus === "closed") {
    survivorStatusBadge.textContent = "Closed for Today";
    survivorStatusBadge.className = "badge badge-closed";
    survivorStateMessage.textContent =
      "Today’s submission window has ended. Picks are now locked.";
    survivorControls.classList.add("hidden");
  } else {
    survivorStatusBadge.textContent = "Opens Soon";
    survivorStatusBadge.className = "badge badge-pending";
    survivorStateMessage.textContent =
      "Today’s Survivor submission window is not open yet. Check back before tip-off.";
    survivorControls.classList.add("hidden");
  }
}

if (toggleSurvivorForm && survivorForm) {
  toggleSurvivorForm.addEventListener("click", () => {
    survivorForm.classList.toggle("hidden");

    if (survivorForm.classList.contains("hidden")) {
      toggleSurvivorForm.textContent = "Open Survivor Submission";
    } else {
      toggleSurvivorForm.textContent = "Hide Survivor Submission";
    }
  });
}

if (survivorQuickOpen && survivorSection && toggleSurvivorForm && survivorForm) {
  survivorQuickOpen.addEventListener("click", () => {
    const survivorStatus = survivorSection.dataset.survivorStatus || "pending";

    if (survivorStatus === "open") {
      setTimeout(() => {
        survivorForm.classList.remove("hidden");
        toggleSurvivorForm.textContent = "Hide Survivor Submission";
      }, 150);
    }
  });
}

// Auto-update "Last Updated" timestamp from latest GitHub commit

async function updateLastCommitTime() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/wilkiepool-commish/wilkie-pool-site/commits?per_page=1"
    );

    const data = await response.json();

    const commitDate = new Date(data[0].commit.committer.date);

    const formatted = commitDate.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });

    const el = document.getElementById("lastUpdated");
    if (el) el.textContent = formatted;

  } catch (err) {
    console.log("Could not fetch commit time", err);
  }
}

updateLastCommitTime();
