(function () {
  var header = document.querySelector(".header");
  var toggle = document.querySelector(".menu-toggle");
  var form = document.getElementById("enquiry-form");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    document.querySelectorAll(".nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        window.setTimeout(function () {
          document.body.classList.remove("nav-open");
          document.body.style.overflow = "";
          toggle.setAttribute("aria-expanded", "false");
        }, 50);
      });
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var phone = (data.get("phone") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      var body = [
        "Name: " + name,
        "Email: " + email,
        "Phone: " + phone,
        "",
        message
      ].join("\n");

      var mailto =
        "mailto:nikhil@cologicdelivery.com" +
        "?subject=" + encodeURIComponent("Website enquiry from " + name) +
        "&body=" + encodeURIComponent(body);

      var success = document.getElementById("form-success");
      if (success) success.classList.add("show");
      window.location.href = mailto;
      form.reset();
    });
  }

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  var revealSel = [
    ".section-head",
    ".card",
    ".stat",
    ".service-row",
    ".city",
    ".product",
    ".logo-cell",
    ".intro-copy",
    ".intro-panel",
    ".band",
    ".cta",
    ".mission",
    ".tl",
    ".contact-card",
    ".form-card",
    ".faq details",
    ".map",
    ".check-list",
    ".why-card",
    ".service-panel",
    ".person",
    ".side-card",
    ".wa-panel",
    ".cat",
    ".quote-card"
  ].join(",");

  var nodes = document.querySelectorAll(revealSel);
  nodes.forEach(function (el) {
    el.classList.add("reveal");
  });

  document.querySelectorAll(".card-grid, .card-grid-3, .stats, .city-grid, .product-grid, .logo-grid, .service-list, .faq, .why-grid, .service-stack, .people, .cat-grid, .quote-stack, .contact-side").forEach(function (grid) {
    Array.prototype.forEach.call(grid.children, function (child, i) {
      child.style.setProperty("--d", (i * 0.08) + "s");
    });
  });

  function showAll() {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  if (reduce || !("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
  );

  document.querySelectorAll(".reveal").forEach(function (el) {
    io.observe(el);
  });
})();
