const themeToggle = document.getElementById("theme-toggle");
const rootBody = document.body;
const siteLoader = document.getElementById("site-loader");
const cursorTrail = document.getElementById("cursor-trail");

const storageKey = "shaadi-theme";

const getSavedTheme = () => {
  try {
    return localStorage.getItem(storageKey);
  } catch {
    return null;
  }
};

const saveTheme = (theme) => {
  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    // Ignore storage write failures (private mode / blocked storage).
  }
};

const setTheme = (theme) => {
  rootBody.setAttribute("data-theme", theme);

  if (themeToggle) {
    if (theme === "dark") {
      themeToggle.textContent = "☀️ Light";
      themeToggle.setAttribute("aria-label", "Enable light mode");
    } else {
      themeToggle.textContent = "🌙 Dark";
      themeToggle.setAttribute("aria-label", "Enable dark mode");
    }
  }

  saveTheme(theme);
};

const savedTheme = getSavedTheme();
setTheme(savedTheme || "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = rootBody.getAttribute("data-theme") || "light";
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });
}

if (siteLoader) {
  let loaderHidden = false;

  const hideLoader = () => {
    if (loaderHidden) return;

    loaderHidden = true;
    siteLoader.classList.add("is-hidden");
    rootBody.classList.remove("loading");

    window.setTimeout(() => {
      siteLoader.remove();
    }, 500);
  };

  rootBody.classList.add("loading");

  const hideAfterLoad = () => {
    window.setTimeout(hideLoader, 1200);
  };

  if (document.readyState === "complete") {
    hideAfterLoad();
  } else {
    window.addEventListener("load", hideAfterLoad, { once: true });
  }

  window.setTimeout(hideLoader, 4500);
}

if (cursorTrail && window.matchMedia("(hover: hover)").matches) {
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  window.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  });

  const animateCursorTrail = () => {
    currentX += (targetX - currentX) * 0.16;
    currentY += (targetY - currentY) * 0.16;

    cursorTrail.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    window.requestAnimationFrame(animateCursorTrail);
  };

  animateCursorTrail();
}

const estimateForm = document.getElementById("estimate-form");
const estimateOutput = document.getElementById("estimate-output");

if (estimateForm && estimateOutput) {
  estimateForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const city = document.getElementById("city").value.trim();
    const guests = Number(document.getElementById("guests").value);
    const events = Number(document.getElementById("events").value);

    const basePerGuest = 2100;
    const eventMultiplier = 1 + (events - 2) * 0.22;
    const cityMultiplier = city.toLowerCase().includes("mumbai") ? 1.25 : 1.0;

    const minBudget = guests * basePerGuest * eventMultiplier * cityMultiplier;
    const maxBudget = minBudget * 1.35;

    const formatCurrency = (value) =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(value);

    estimateOutput.textContent = `Estimated budget for ${events} event(s) in ${city}: ${formatCurrency(
      minBudget
    )} - ${formatCurrency(maxBudget)}.`;
  });
}

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    contactForm.reset();
    alert(`Thanks ${name}! Our wedding service team will call you shortly.`);
  });
}


const revealTargets = document.querySelectorAll(
  ".hero-grid > div, .hero-card, .section h2, .section-intro, .service-card, .pricing-card, .timeline article, .cta-grid > div, .contact-form"
);

if (revealTargets.length > 0) {
  revealTargets.forEach((element) => element.classList.add("scroll-reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  revealTargets.forEach((element) => revealObserver.observe(element));
}
