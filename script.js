// MiniLoop website settings
// MiniLoop WhatsApp number in international format (Pakistan), digits only.
const WHATSAPP_NUMBER = "923263220341";

document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.querySelectorAll("[data-category]").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("category-select").value = link.dataset.category;
  });
});

document.getElementById("enquiry-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const values = Object.fromEntries(form.entries());
  const message = [
    "Hello MiniLoop! I'd like to enquire about a baby gear rental.",
    "",
    `Name: ${values.name}`,
    `Category: ${values.category}`,
    `Rental start: ${values.start || "Flexible / not specified"}`,
    `Duration: ${values.duration || "Not specified"}`,
    `Details: ${values.details || "None"}`
  ].join("\n");

  if (!WHATSAPP_NUMBER) {
    alert("WhatsApp is not configured yet. Please contact MiniLoop directly.");
    return;
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
