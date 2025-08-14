document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
});


const currentYear = document.querySelector("#currentYear");
const lastModified = document.lastModified;

// use the date object
const today = new Date();

currentYear.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

let oLastModif = new Date(document.lastModified);
lastModified.innerHTML = `Last Modified: <span class="highlight">${new Intl.DateTimeFormat(
  "en-US",
  {
    dateStyle: "medium",
    timeStyle: "medium",
  }
).format(oLastModif)}</span>`;