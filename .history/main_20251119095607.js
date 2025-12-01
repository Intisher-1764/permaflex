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
