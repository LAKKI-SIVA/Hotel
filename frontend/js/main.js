
console.log("Main JS Loaded");

const bookingForm = document.querySelector("#bookingForm");
const bookingStatus = document.querySelector("#bookingStatus");
const navToggle = document.querySelector(".nav-toggle");
const siteHeader = document.querySelector(".site-header");
const navLinks = document.querySelectorAll("nav a");

if (navToggle && siteHeader) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (siteHeader.classList.contains("nav-open")) {
        siteHeader.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

console.log(bookingForm);

if (bookingForm) {
  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Form Submitted");

    bookingStatus.textContent = "బుకింగ్ పంపిస్తోంది...";

    const formData = new FormData(bookingForm);
    const payload = Object.fromEntries(formData.entries());
    payload.guests = Number(payload.guests);

    console.log(payload);

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log(response);
      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        throw new Error(result.message || "బుకింగ్ విఫలమైంది");
      }

      bookingForm.reset();
      bookingStatus.textContent = "బుకింగ్ విజయవంతంగా సమర్పించబడింది.";
    } catch (error) {
      console.log(error);
      bookingStatus.textContent = error.message;
    }
  });
}