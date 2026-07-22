
var html = document.documentElement;
var themeBtn = document.getElementById("theme-toggle-button");
var savedTheme = localStorage.getItem("theme");

var navLinks = document.querySelectorAll("nav a");
var sections = document.querySelectorAll("section");

var filterBtns = document.getElementsByClassName("portfolio-filter");
var cards = document.getElementsByClassName("portfolio-item");

var nextBtn = document.getElementById("next-testimonial");
var prevBtn = document.getElementById("prev-testimonial");
var slider = document.getElementById("testimonials-carousel");
var dots = document.getElementsByClassName("carousel-indicator");

var index = 0;
var cardWidth = document.querySelector(".testimonial-card").offsetWidth;

var settingsBtn = document.getElementById("settings-toggle");
var sidebar = document.getElementById("settings-sidebar");
var closeBtn = document.getElementById("close-settings");
var fontBtns = document.getElementsByClassName("font-option");
var colorsBox = document.getElementById("theme-colors-grid");
var resetBtn = document.getElementById("reset-settings");
var body = document.body;

var colors = [
  "#6366f1",
  "#0ea5e9",
  "#10b981",
  "#f97316",
  "#ec4899",
  "#ef4444"
];

var colorBtns;

var topBtn = document.getElementById("scroll-to-top");

// ========================================
// DARK MODE
// ========================================

if (savedTheme === "dark") {
  html.classList.add("dark");
}
else if (savedTheme === "light") {
  html.classList.remove("dark");
}

themeBtn.addEventListener("click", function () {

  if (html.classList.contains("dark") === true) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
});

// ========================================
// ACTIVE NAVBAR LINK
// ========================================

window.addEventListener("scroll", changeActiveLink);

function changeActiveLink() {
  var currentId = "";

  for (var i = 0; i < sections.length; i++) {

    if (scrollY >= sections[i].offsetTop - 120) {
      currentId = sections[i].getAttribute("id");
    }
  }

  for (var j = 0; j < navLinks.length; j++) {

    if (navLinks[j].getAttribute("href") === "#" + currentId) {
      navLinks[j].classList.add("active");
    }
    else {
      navLinks[j].classList.remove("active");
    }
  }
}

changeActiveLink();

// ========================================
// PORTFOLIO FILTER
// ========================================

for (var i = 0; i < filterBtns.length; i++) {

  filterBtns[i].addEventListener("click", function () {
    var filter = this.getAttribute("data-filter");

    for (var j = 0; j < filterBtns.length; j++) {
      filterBtns[j].classList.remove("active");
      filterBtns[j].setAttribute("aria-pressed", "false");
    }

    this.classList.add("active");
    this.setAttribute("aria-pressed", "true");

    for (var k = 0; k < cards.length; k++) {
      var category = cards[k].getAttribute("data-category");

      if (filter === "all") {
        cards[k].style.display = "block";
      }
      else if (filter === category) {
        cards[k].style.display = "block";
      }
      else {
        cards[k].style.display = "none";
      }
    }
  });
}

// ========================================
// CAROUSEL
// ========================================

nextBtn.addEventListener("click", function () {
  index++;

  if (index === 4) {
    index = 0;
  }

  slide();
});

prevBtn.addEventListener("click", function () {
  index--;

  if (index < 0) {
    index = 3;
  }

  slide();
});

function slide() {
  slider.style.transform =
    "translateX(" + cardWidth * index + "px)";

  for (var i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  dots[index].classList.add("active");
}

slide();

// ========================================
// SETTINGS SIDEBAR
// ========================================

settingsBtn.addEventListener("click", function () {
  sidebar.classList.remove("translate-x-full");
});

closeBtn.addEventListener("click", function () {
  sidebar.classList.add("translate-x-full");
});

// ========================================
// FONT SETTINGS
// ========================================

for (var i = 0; i < fontBtns.length; i++) {

  fontBtns[i].addEventListener("click", function () {
    var font = this.getAttribute("data-font");

    changeFont(font);
    localStorage.setItem("font", font);
  });
}

function changeFont(font) {
  body.classList.remove("font-alexandria");
  body.classList.remove("font-tajawal");
  body.classList.remove("font-cairo");

  body.classList.add("font-" + font);

  for (var i = 0; i < fontBtns.length; i++) {
    fontBtns[i].classList.remove("active");

    if (fontBtns[i].getAttribute("data-font") === font) {
      fontBtns[i].classList.add("active");
    }
  }
}

// ========================================
// COLOR SETTINGS
// ========================================

for (var i = 0; i < colors.length; i++) {
  colorsBox.innerHTML +=
    '<button class="color-option" data-color="' +
    colors[i] +
    '" style="background-color:' +
    colors[i] +
    '"></button>';
}

colorBtns = document.getElementsByClassName("color-option");

for (var i = 0; i < colorBtns.length; i++) {

  colorBtns[i].addEventListener("click", function () {
    var color = this.getAttribute("data-color");

    changeColor(color);
    localStorage.setItem("color", color);
  });
}

function changeColor(color) {
  html.style.setProperty("--color-primary", color);

  for (var i = 0; i < colorBtns.length; i++) {
    colorBtns[i].classList.remove("active");

    if (colorBtns[i].getAttribute("data-color") === color) {
      colorBtns[i].classList.add("active");
    }
  }
}

// ========================================
// LOAD SAVED SETTINGS
// ========================================

var savedFont = localStorage.getItem("font");

if (savedFont !== null) {
  changeFont(savedFont);
}

var savedColor = localStorage.getItem("color");

if (savedColor !== null) {
  changeColor(savedColor);
}

// ========================================
// RESET SETTINGS
// ========================================

resetBtn.addEventListener("click", function () {
  changeColor("#6366f1");
  changeFont("tajawal");

  localStorage.removeItem("font");
  localStorage.removeItem("color");
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

window.addEventListener("scroll", function () {
  
  if (scrollY > 400) {
    topBtn.classList.remove("opacity-0");
    topBtn.classList.remove("invisible");

    topBtn.classList.add("opacity-100");
    topBtn.classList.add("visible");
  } else {
    topBtn.classList.remove("opacity-100");
    topBtn.classList.remove("visible");

    topBtn.classList.add("opacity-0");
    topBtn.classList.add("invisible");
  }
});

topBtn.addEventListener("click", function () {
  window.scrollTo(0, 0);
});

