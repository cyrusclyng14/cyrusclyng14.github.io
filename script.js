// Fade sections in as they scroll into view
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -80px 0px" });

revealEls.forEach(el => revealObserver.observe(el));

// Certificate lightbox: click a thumbnail to view it full-size over the page
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
let lastFocused = null;

function openLightbox(src, caption) {
  lastFocused = document.activeElement;
  lightboxImg.src = src;
  lightboxImg.alt = caption || "Certificate preview";
  lightbox.hidden = false;
  lightboxClose.focus();
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = "";
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

document.querySelectorAll(".cert-thumb-wrap").forEach(btn => {
  btn.addEventListener("click", () => {
    openLightbox(btn.dataset.full, btn.dataset.caption);
  });
});

lightboxClose.addEventListener("click", closeLightbox);

// Close when clicking the dimmed backdrop (not the image itself)
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
});

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

// Close the mobile menu after a nav link is tapped
siteNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Highlight the current navigation section while scrolling.
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll("nav a");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => link.style.color = "");
      const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
      if (active) active.style.color = "var(--ink)";
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => observer.observe(section));