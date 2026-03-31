const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");
const pageMenuToggle = document.querySelector(".page-menu-toggle");
const pageMenu = document.querySelector(".page-menu");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("open");
  });
}

if (nav) {
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

if (pageMenuToggle && pageMenu) {
  pageMenuToggle.addEventListener("click", () => {
    const expanded = pageMenuToggle.getAttribute("aria-expanded") === "true";
    pageMenuToggle.setAttribute("aria-expanded", String(!expanded));
    pageMenu.classList.toggle("open");
  });

  pageMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      pageMenu.classList.remove("open");
      pageMenuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!pageMenu.contains(event.target) && !pageMenuToggle.contains(event.target)) {
      pageMenu.classList.remove("open");
      pageMenuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));

const nextUrlField = document.getElementById("nextUrlField");
if (nextUrlField) {
  nextUrlField.value = new URL("thankyou.html", window.location.href).toString();
}

document.querySelectorAll("a[href]").forEach((link) => {
  const href = link.getAttribute("href");
  if (!href || href.startsWith("#") || link.target === "_blank") {
    return;
  }

  const url = new URL(link.href, window.location.href);
  const isInternal = url.origin === window.location.origin;

  if (isInternal) {
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
    });
  }
});
