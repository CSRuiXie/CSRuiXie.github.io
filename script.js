const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const year = document.querySelector("#year");
const filterButtons = document.querySelectorAll(".filter-button");
const publications = document.querySelectorAll(".publication");
const panelSections = Array.from(document.querySelectorAll(".panel-section"));
const desktopQuery = window.matchMedia("(min-width: 821px)");

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

if (panelSections.length > 0) {
  let isPanelScrolling = false;

  const getCurrentPanelIndex = () => {
    const headerOffset = 92;
    let currentIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    panelSections.forEach((section, index) => {
      const distance = Math.abs(section.getBoundingClientRect().top - headerOffset);

      if (distance < closestDistance) {
        closestDistance = distance;
        currentIndex = index;
      }
    });

    return currentIndex;
  };

  const scrollToPanel = (index) => {
    const target = panelSections[Math.max(0, Math.min(index, panelSections.length - 1))];

    if (!target) {
      return;
    }

    isPanelScrolling = true;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      isPanelScrolling = false;
    }, 720);
  };

  window.addEventListener(
    "wheel",
    (event) => {
      if (
        !desktopQuery.matches ||
        event.ctrlKey ||
        isPanelScrolling ||
        Math.abs(event.deltaY) < 18 ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ) {
        return;
      }

      event.preventDefault();
      const direction = event.deltaY > 0 ? 1 : -1;
      scrollToPanel(getCurrentPanelIndex() + direction);
    },
    { passive: false },
  );

  window.addEventListener("keydown", (event) => {
    if (!desktopQuery.matches || isPanelScrolling) {
      return;
    }

    const activeElement = document.activeElement;
    const isTyping =
      activeElement instanceof HTMLElement &&
      ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(activeElement.tagName);

    if (isTyping) {
      return;
    }

    if (["ArrowDown", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      scrollToPanel(getCurrentPanelIndex() + 1);
    }

    if (["ArrowUp", "PageUp"].includes(event.key)) {
      event.preventDefault();
      scrollToPanel(getCurrentPanelIndex() - 1);
    }
  });
}
