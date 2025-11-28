// Tilbage til top knap
document.addEventListener("DOMContentLoaded", () => {
  if (!document.location.pathname.match(/hc\/da\/articles/)) return;

  const backToTopButton = document.querySelector("#back-to-top-btn");
  if (!backToTopButton) return;

  const scrollFunction = mydebounce(() => {
    const shouldShowButton = window.scrollY > 0;

    backToTopButton.classList.toggle("btnEntrance", shouldShowButton);
    backToTopButton.classList.toggle("btnExit", !shouldShowButton);

    if (shouldShowButton) {
      backToTopButton.style.display = "block";
    } else {
      setTimeout(() => {
        backToTopButton.style.display = "none";
      }, 250);
    }
  }, 100);

  window.addEventListener("scroll", scrollFunction);
  backToTopButton.addEventListener("click", smoothScrollBackToTop);
});

function smoothScrollBackToTop() {
  const startPosition = window.scrollY;
  const duration = 750;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const distance = -startPosition * (progress / duration);
    window.scrollTo(0, startPosition + distance);
    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }
}


function easeInOutCubic(t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t*t + b;
  t -= 2;
  return c/2*(t*t*t + 2) + b;
};

function mydebounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}