/* ═══════════════════════════════════════════════════════
   GETECH SOLUTION — Main JavaScript
   Dark/Light Mode · Smooth Scroll · Animations
   WhatsApp Form Integration · Mobile Menu
═══════════════════════════════════════════════════════ */

// ── Your WhatsApp number (Nigerian format, no + or spaces) ──
const WHATSAPP_NUMBER = "+2347061992109"; // TODO: Replace with your actual number
// ── Your fallback email ──
const CONTACT_EMAIL = "gtechandsolutions@gmail.com"; // TODO: Replace with your actual email

document.addEventListener("DOMContentLoaded", () => {
  /* ════════════════════════════════════════
     THEME TOGGLE (Dark / Light)
  ════════════════════════════════════════ */
  const html = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("getech-theme") || "dark";

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("getech-theme", theme);
  }

  setTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });

  /* ════════════════════════════════════════
     NAVBAR — Scroll State & Active Link
  ════════════════════════════════════════ */
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  function updateNav() {
    // Scrolled state
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active section highlight
    let current = "";
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`,
      );
    });
  }

  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();

  /* ════════════════════════════════════════
     MOBILE NAVIGATION
  ════════════════════════════════════════ */
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavClose = document.getElementById("mobileNavClose");
  const mobileLinks = document.querySelectorAll(
    ".mobile-nav-link, .mobile-nav-cta",
  );

  function openMobileNav() {
    mobileNav.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeMobileNav() {
    mobileNav.classList.remove("open");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", openMobileNav);
  mobileNavClose.addEventListener("click", closeMobileNav);
  mobileLinks.forEach((link) => link.addEventListener("click", closeMobileNav));

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileNav();
  });

  /* ════════════════════════════════════════
     PRICING TOGGLE (Packages / Maintenance)
  ════════════════════════════════════════ */
  const togglePackages = document.getElementById("togglePackages");
  const toggleMaintenance = document.getElementById("toggleMaintenance");
  const packagesGrid = document.getElementById("packagesGrid");
  const maintenanceGrid = document.getElementById("maintenanceGrid");

  togglePackages.addEventListener("click", () => {
    togglePackages.classList.add("active");
    toggleMaintenance.classList.remove("active");
    packagesGrid.classList.remove("hidden");
    maintenanceGrid.classList.add("hidden");
  });

  toggleMaintenance.addEventListener("click", () => {
    toggleMaintenance.classList.add("active");
    togglePackages.classList.remove("active");
    maintenanceGrid.classList.remove("hidden");
    packagesGrid.classList.add("hidden");
  });

  /* ════════════════════════════════════════
     WHATSAPP FORM SUBMISSION
  ════════════════════════════════════════ */
  const sendBtn = document.getElementById("sendBtn");

  sendBtn.addEventListener("click", () => {
    const name = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const business = document.getElementById("businessName").value.trim();
    const pkg = document.getElementById("packageChoice").value;
    const message = document.getElementById("message").value.trim();

    // Basic validation
    if (!name) {
      shakeField("fullName", "Please enter your full name");
      return;
    }
    if (!phone) {
      shakeField("phone", "Please enter your phone number");
      return;
    }

    // Build WhatsApp message
    const waMessage = [
      `👋 *New Inquiry — Getech Solution Website*`,
      ``,
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      business ? `*Business:* ${business}` : null,
      pkg ? `*Package:* ${pkg}` : null,
      message ? `*Message:* ${message}` : null,
      ``,
      `_Sent from getechsolution_`,
    ]
      .filter(Boolean)
      .join("\n");

    const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    // Animate button
    sendBtn.textContent = "✓ Opening WhatsApp...";
    sendBtn.style.background = "var(--accent-teal)";
    sendBtn.disabled = true;

    setTimeout(() => {
      window.open(waURL, "_blank");
      sendBtn.innerHTML = '<span class="wa-icon">💬</span> Send via WhatsApp';
      sendBtn.style.background = "";
      sendBtn.disabled = false;
    }, 800);
  });

  function shakeField(fieldId, msg) {
    const field = document.getElementById(fieldId);
    field.style.borderColor = "#FF4D4D";
    field.style.boxShadow = "0 0 0 3px rgba(255,77,77,0.2)";
    field.focus();
    // Show tooltip-style error
    let tip = field.parentNode.querySelector(".field-error");
    if (!tip) {
      tip = document.createElement("span");
      tip.className = "field-error";
      tip.style.cssText =
        "font-size:0.78rem;color:#FF4D4D;margin-top:4px;display:block;";
      field.parentNode.appendChild(tip);
    }
    tip.textContent = msg;
    setTimeout(() => {
      field.style.borderColor = "";
      field.style.boxShadow = "";
      if (tip) tip.remove();
    }, 3000);
  }

  /* ════════════════════════════════════════
     SCROLL REVEAL ANIMATION
  ════════════════════════════════════════ */
  const revealTargets = [
    ".value-card",
    ".service-card",
    ".pricing-card",
    ".testimonial-card",
    ".addon-item",
    ".about-lead",
    ".about-body",
    ".contact-item",
    ".stat-item",
    ".section-header",
    ".contact-form-wrapper",
    ".contact-info",
  ];

  // Add reveal class to elements
  revealTargets.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add("reveal");
      // Stagger siblings
      const parent = el.parentNode;
      const siblings = [...parent.querySelectorAll(selector)];
      const idx = siblings.indexOf(el);
      if (idx === 1) el.classList.add("reveal-delay-1");
      if (idx === 2) el.classList.add("reveal-delay-2");
      if (idx === 3) el.classList.add("reveal-delay-3");
    });
  });

  // IntersectionObserver for reveal
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  document
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));

  /* ════════════════════════════════════════
     BACK TO TOP BUTTON
  ════════════════════════════════════════ */
  const backToTop = document.getElementById("backToTop");

  window.addEventListener(
    "scroll",
    () => {
      backToTop.classList.toggle("visible", window.scrollY > 500);
    },
    { passive: true },
  );

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ════════════════════════════════════════
     SMOOTH SCROLL — All Internal Links
  ════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const navH = navbar.offsetHeight;
        const top =
          target.getBoundingClientRect().top + window.scrollY - navH - 12;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  /* ════════════════════════════════════════
     PRICING CARD — PLAN LINK PREFILL
     Clicking "Get Growth" auto-selects
     the matching package in the form
  ════════════════════════════════════════ */
  document.querySelectorAll(".plan-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const planName = btn
        .closest(".pricing-card")
        .querySelector(".plan-name")
        .textContent.trim();
      const select = document.getElementById("packageChoice");
      if (select) {
        [...select.options].forEach((opt) => {
          if (opt.value.toLowerCase().includes(planName.toLowerCase())) {
            select.value = opt.value;
          }
        });
      }
    });
  });

  // Stats counter animation
  function animateCounter(el, target, prefix = "", suffix = "") {
    let start = 0;
    const duration = 1800;
    const isDecimal = String(target).includes("k");
    const numTarget = isDecimal ? parseFloat(target) : parseInt(target);
    const step = numTarget / (duration / 16);
    const update = () => {
      start += step;
      if (start >= numTarget) {
        el.textContent = prefix + target + suffix;
        return;
      }
      el.textContent =
        prefix +
        (isDecimal ? start.toFixed(0) + "k+" : Math.floor(start) + suffix);
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  // Trigger counter on scroll into view
  const statNumbers = document.querySelectorAll(".stat-number");
  let countersRun = false;
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersRun) {
          countersRun = true;
          statNumbers.forEach((el) => {
            const raw = el.textContent.trim();
            if (raw.endsWith("+")) animateCounter(el, parseInt(raw), "", "+");
            else if (raw.endsWith("%"))
              animateCounter(el, parseInt(raw), "", "%");
            else if (raw.endsWith("k+")) animateCounter(el, raw, "", "");
            else animateCounter(el, raw, "", "");
          });
        }
      });
    },
    { threshold: 0.5 },
  );

  if (statNumbers.length)
    statsObserver.observe(statNumbers[0].closest(".hero-stats"));
});
