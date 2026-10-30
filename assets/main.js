(function () {
  // English strings; Italian is the source text in the HTML.
  var EN = {
    "nav.story": "The house", "nav.dishes": "The dishes", "nav.voices": "Reviews", "nav.visit": "Visit us",
    "cta.book": "Book",
    "hero.eyebrow": "Milan · Via Piero della Francesca",
    "hero.t1": "Authentic,", "hero.t2": "by choice.",
    "hero.sub": "A dozen tables, soft lights and a kitchen that takes no shortcuts: carefully chosen ingredients, recipes from land and sea, done properly.",
    "hero.cta1": "Discover the dishes", "hero.cta2": "Book a table",
    "story.eyebrow": "The house", "story.title": "Small by choice.",
    "story.p1": "Osteria del Borgo Antico is an intimate place: a few tables, an atmosphere guests describe as romantic and cosy, and service that knows its regulars.",
    "story.p2": "The menu moves between land and sea with one rule: start from quality ingredients and let them speak. At weekday lunch, a business menu for those short on time; in the evening, all the time you need for a slow dinner.",
    "story.f1": "on Tripadvisor, over 500 reviews", "story.f2": "average rating on TheFork", "story.f3": "tables, so the room stays intimate",
    "dishes.eyebrow": "The dishes",
    "dishes.title": "Every dish has a story.<br><em>These are ours.</em>",
    "dishes.lead": "No special effects: ingredients chosen one by one and recipes respected. These are the dishes our guests remember most; the menu follows the seasons and the market.",
    "pair": "Pair with",
    "d1.course": "To begin · Raw", "d1.name": "Raw prawns",
    "d1.story": "Raw food forgives nothing: either the produce is excellent, or it shows. The prawn, sweet and fresh, barely dressed, left to speak for itself. It is the dish that measures our quality — which is why it comes first.",
    "d1.pair": "a fresh, mineral white",
    "d2.course": "Starter", "d2.name": "Octopus salad",
    "d2.story": "Authenticity lies in patience: octopus wants slow cooking that makes it tender without taking away its character. Served warm, as a salad, it is one of those simple dishes guests keep coming back for.",
    "d2.pair": "a savoury white from the South",
    "d3.course": "Pasta", "d3.name": "Linguine, pistachio pesto and red prawn",
    "d3.story": "Land meets sea: the toasted, velvety note of pistachio wraps the linguine, while the red prawn brings sweetness and depth. A dish that tastes of Sicily, served in Milan.",
    "d3.pair": "a full-bodied white",
    "d4.course": "Pasta", "d4.name": "Paccheri, monkfish and clams",
    "d4.story": "Paccheri are a generous pasta, made to hold the sauce. Here they meet monkfish and clams: few ingredients, well chosen, and a sauce given the time to become good. A hearty, honest dish, no frills.",
    "d4.pair": "a Vermentino",
    "d5.course": "Pasta · Sea and forest", "d5.name": "Pappardelle, prawns, porcini and cherry tomatoes",
    "d5.story": "Land and sea on the same plate, just like our kitchen. Porcini bring the forest, prawns the sweetness, cherry tomatoes a touch of acidity that keeps everything in balance on the pappardelle.",
    "d5.pair": "a light red, served cool",
    "d6.course": "Main", "d6.name": "Oven-baked sea bream with potatoes",
    "d6.story": "The classic main course, done properly: the whole fish, the oven, potatoes soaking up the cooking juices. Generous portions, essential flavours: home cooking at its best.",
    "d6.pair": "a white from Liguria",
    "dishes.note": "The full menu, with current prices, awaits you at the table. For allergies or special requests, let us know when booking.",
    "voices.eyebrow": "Reviews", "voices.title": "In our guests’ words",
    "q1": "“The dishes were very good, especially the fish: excellent ingredients and well-judged pairings.”",
    "q2": "“Very good octopus appetizer, excellent paccheri with monkfish and clams.”",
    "q.src": "Guest review",
    "visit.eyebrow": "Visit us", "visit.title": "We look forward to having you.",
    "visit.lead": "The room is small and fills up quickly: we recommend booking.",
    "visit.where": "Where", "visit.when": "When", "visit.call": "Bookings",
    "visit.hours": "Monday – Saturday<br>12:00 – 15:00 · 19:30 – 24:00<br>Closed on Sunday",
    "gallery.eyebrow": "From our table",
    "gallery.title": "The room and the dishes,<br><em>through our guests’ eyes.</em>",
    "visit.btn1": "Call to book", "visit.btn2": "Book on TheFork", "visit.maps": "Open in Google Maps →",
    "footer.demo": "Demo website"
  };

  var nodes = document.querySelectorAll("[data-i18n]");
  var IT = {};
  nodes.forEach(function (el) { IT[el.dataset.i18n] = el.innerHTML; });

  function setLang(lang) {
    var dict = lang === "en" ? EN : IT;
    nodes.forEach(function (el) {
      var v = dict[el.dataset.i18n];
      if (v != null) el.innerHTML = v;
    });
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.classList.toggle("active", b.dataset.lang === lang);
    });
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.lang); });
  });
  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  var initial = new URLSearchParams(location.search).get("lang") || saved ||
    ((navigator.language || "it").slice(0, 2) === "it" ? "it" : "en");
  if (initial === "en") setLang("en");

  // Image slots: use the photo if present in assets/img, otherwise keep the typographic fallback.
  document.querySelectorAll("[data-img]").forEach(function (el) {
    var img = new Image();
    img.onload = function () { el.style.backgroundImage = "url('" + el.dataset.img + "')"; };
    img.onerror = function () { el.classList.add("no-img"); };
    img.src = el.dataset.img;
  });

  var nav = document.querySelector(".nav");
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.getElementById("burger").addEventListener("click", function () { nav.classList.toggle("open"); });
  document.querySelectorAll("#navLinks a").forEach(function (a) {
    a.addEventListener("click", function () { nav.classList.remove("open"); });
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
