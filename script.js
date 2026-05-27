const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const year = document.querySelector("#year");
const filterButtons = document.querySelectorAll(".filter-button");
const publications = document.querySelectorAll(".publication");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("open");
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter || "all";

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    publications.forEach((publication) => {
      const shouldShow =
        filter === "all" ||
        publication.dataset.year === filter ||
        publication.dataset.type === filter;
      publication.classList.toggle("is-hidden", !shouldShow);
    });
  });
});
