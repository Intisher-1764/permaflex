// GALLERY LIGHTBOX
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".qp-gallery-item");
  const lightbox = document.getElementById("qpLightbox");
  const lightboxImg = document.getElementById("qpLightboxImage");
  const closeBtn = document.getElementById("qpLightboxClose");
  const backdrop = document.getElementById("qpLightboxBackdrop");

  function openLightbox(src, altText) {
    lightboxImg.src = src;
    lightboxImg.alt = altText || "QuickPatch gallery image";
    lightbox.classList.add("is-open");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightboxImg.src = "";
  }

  items.forEach((btn) => {
    btn.addEventListener("click", () => {
      const img = btn.querySelector("img");
      const fullSrc = btn.getAttribute("data-full") || img.src;
      openLightbox(fullSrc, img.alt);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  backdrop.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
});

// Product articles: both can be open at once, close all when clicking outside
// Gallery lightbox: open image on click, close on background click
document.addEventListener("DOMContentLoaded", () => {
  const detailsList = document.querySelectorAll(".product-details");

  // Close all product articles when clicking outside the product section
  document.addEventListener("click", (event) => {
    const insideProduct = event.target.closest(".product-details");
    if (!insideProduct) {
      detailsList.forEach((d) => (d.open = false));
    }
  });

  // Stop outside click handler when clicking inside a product
  detailsList.forEach((d) => {
    d.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });

  // ----- Gallery Lightbox -----
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector("img");

  document.querySelectorAll(".gallery-item img").forEach((img) => {
    img.addEventListener("click", (e) => {
      e.stopPropagation(); // don't trigger outside click handler
      lightboxImg.src = img.src;
      lightbox.classList.add("show");
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("show");
    lightboxImg.src = "";
  });
});


// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Simple scroll reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
reveals.forEach(el => observer.observe(el));

// Product accordion: update + / – and keep only one open
const productDetails = document.querySelectorAll(".product-details");

productDetails.forEach(details => {
  const icon = details.querySelector(".summary-icon");
  if (!icon) return;

  // Initial state
  icon.textContent = details.open ? "−" : "+";

  details.addEventListener("toggle", () => {
    if (details.open) {
      icon.textContent = "−";

      // Close others
      productDetails.forEach(other => {
        if (other !== details) {
          other.open = false;
          const otherIcon = other.querySelector(".summary-icon");
          if (otherIcon) otherIcon.textContent = "+";
        }
      });
    } else {
      icon.textContent = "+";
    }
  });
});
