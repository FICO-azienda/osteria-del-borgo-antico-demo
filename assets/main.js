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
    "dishes.lead": "No special effects: ingredients chosen one by one and recipes respected, from land and sea. The menu follows the seasons and the market: these are some of the dishes that tell it best.",
    "pair": "Pair with",
    "d1.course": "When in season", "d1.name": "Truffle",
    "d1.story": "It arrives in the dining room like this: whole, resting on the plate, its aroma reaching you before you even sit down. It needs no introduction: it is produce in its purest form, and the reason we choose every ingredient with care.",
    "d1.pair": "a red from Piedmont",
    "d2.course": "Pasta · Sea", "d2.name": "Linguine, pistachio pesto and raw prawn",
    "d2.story": "The toasted, velvety note of pistachio wraps the linguine; on top, freshly chopped raw prawn brings sweetness and freshness. A dish our guests remember and talk about.",
    "d2.pair": "a full-bodied white",
    "d3.course": "Pasta · Land", "d3.name": "Spaghettoni, cream, crispy guanciale and broad beans",
    "d3.story": "A pasta that tastes of home: the silky cream, guanciale toasted until crisp, broad beans bringing a fresh green note. Few ingredients, well chosen, and no shortcuts.",
    "d3.pair": "a medium-bodied white",
    "d4.course": "Main · Land", "d4.name": "Beef fillet, rosemary and potatoes",
    "d4.story": "The noblest cut, treated with respect: precise cooking, the scent of rosemary, potatoes golden just right. A classic that needs no reinventing — only doing well.",
    "d4.pair": "a Tuscan red",
    "d5.course": "To share", "d5.name": "T-bone steak, potatoes and grilled vegetables",
    "d5.story": "Meat served the way it should be: sliced, pink at the heart, on the platter with roast potatoes and grilled vegetables. A convivial dish for the middle of the table.",
    "d5.pair": "a bold red",
    "d6.course": "To finish", "d6.name": "Cheesecake with berries",
    "d6.story": "A soft, creamy cake, a berry compote with just the right acidity, a cloud of icing sugar. The simple, honest way to end the meal.",
    "d6.pair": "a dessert wine",
    "dishes.note": "The full menu, with current prices, awaits you at the table. For allergies or special requests, let us know when booking.",
    "voices.eyebrow": "Reviews", "voices.title": "In our guests’ words",
    "q1": "“The dishes were very good, especially the fish: excellent ingredients and well-judged pairings.”",
    "q2": "“Very good octopus appetizer, excellent paccheri with monkfish and clams.”",
    "q.src": "Guest review",
    "visit.eyebrow": "Visit us", "visit.title": "We look forward to having you.",
    "visit.lead": "The room is small and fills up quickly: we recommend booking.",
    "visit.where": "Where", "visit.when": "When", "visit.call": "Bookings",
    "visit.hours": "Monday – Saturday<br>12:00 – 15:00 · 19:30 – 24:00<br>Closed on Sunday",
    "gallery.eyebrow": "Gallery",
    "gallery.title": "From our kitchen,<br><em>to your table.</em>",
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
