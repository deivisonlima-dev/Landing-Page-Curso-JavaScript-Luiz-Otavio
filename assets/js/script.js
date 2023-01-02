const debounce = function (func, wait, immediate) {
  let timeout;
  return function (...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const target = document.querySelectorAll("[data-animation]");
const animationClass = "animate";

/**@param {MouseEvent} element */
const animateScroll = () => {
  const windowTop = window.scrollY + (window.innerHeight * 3) / 4;

  target.forEach((element) => {
    if (windowTop > element.offsetTop) {
      element.classList.add(animationClass);
    } else {
      element.classList.remove(animationClass);
    }
  });
};

animateScroll();

if (target.length) {
  window.addEventListener(
    "scroll",
    debounce(() => {
      animateScroll();
    }, 200)
  );
}

// Menu Mobile
const btnMobile = document.querySelector("#btnMobile");

/**@param {MouseEvent} event */
const toogleMenu = (event) => {
  if (event.type === "touchstart") event.preventDefault();
  const nav = document.querySelector(".menu-nav");
  nav.classList.toggle("activate");
  const active = nav.classList.contains("activate");
  btnMobile.classList.toggle("activate");

  event.currentTarget.setAttribute("aria-expanded", active);
  if (active) {
    event.currentTarget.setAttribute("aria-label", "Fechar Menu");
  } else {
    event.currentTarget.setAttribute("aria-label", "Abrir Menu");
  }
};

btnMobile.addEventListener("click", toogleMenu);
btnMobile.addEventListener("touchstart", toogleMenu);
