// ============================================================
// main.js — Community Event Portal
// JavaScript Exercises 1-14 covered
// ============================================================

// JS Exercise 1: console.log on script load
console.log("Welcome to the Community Portal");

// JS Exercise 2: const for fixed data, let for changeable
const events = [
  { name: "Music Night",      category: "Music",     seats: 20, date: "2026-07-15", price: "Rs. 150" },
  { name: "Food Festival",    category: "Food",      seats: 30, date: "2026-08-20", price: "Free"    },
  { name: "Yoga Camp",        category: "Health",    seats: 15, date: "2026-08-28", price: "Rs. 100" },
  { name: "Coding Workshop",  category: "Education", seats: 25, date: "2026-08-12", price: "Free"    }
];

let totalRegistrations = 0;


// ============================================================
// JS Exercise 5: Object constructor + Prototype
// ============================================================

function EventItem(name, category, seats) {
  this.name     = name;
  this.category = category;
  this.seats    = seats;
}

EventItem.prototype.checkAvailability = function () {
  return this.seats > 0 ? "Available" : "Full";
};

// JS Exercise 5: Object.entries
function logEventDetails(obj) {
  console.log("Event details:");
  Object.entries(obj).forEach(function (pair) {
    console.log("  " + pair[0] + ": " + pair[1]);
  });
}

logEventDetails(events[0]);


// ============================================================
// JS Exercise 4: Closure - track registrations per category
// ============================================================

function categoryTracker() {
  var counts = {};
  return function (category) {
    counts[category] = (counts[category] || 0) + 1;
    console.log("Registrations for " + category + ": " + counts[category]);
    return counts[category];
  };
}

var trackCategory = categoryTracker();


// ============================================================
// JS Exercise 4: Higher-order filter function
// ============================================================

function filterByCategory(data, callback) {
  return data.filter(callback);
}


// ============================================================
// JS Exercise 7: DOM - render event cards
// ============================================================

function displayEvents(data) {
  var container = document.querySelector("#eventContainer");
  container.innerHTML = "";

  // JS Exercise 3: forEach loop
  data.forEach(function (event) {

    // JS Exercise 7: createElement + appendChild
    var card = document.createElement("div");
    card.className = "eventCard";

    // JS Exercise 2: template literal
    var info = `${event.name} | ${event.category} | Seats: ${event.seats}`;
    console.log(info);

    // JS Exercise 3: if-else - hide full events
    var isFull   = event.seats <= 0;
    var btnLabel = isFull ? "Full" : "Register";

    card.innerHTML = `
      <h3>${event.name}</h3>
      <p>Category: ${event.category}</p>
      <p>Date: ${event.date}</p>
      <p>Price: ${event.price}</p>
      <p>Seats left: ${event.seats}</p>
      <button onclick="registerSeat('${event.name}')" ${isFull ? "disabled" : ""}>
        ${btnLabel}
      </button>
    `;

    container.appendChild(card);
  });

  // JS Exercise 6: map to format titles
  var titles = data.map(function (e) {
    return e.category + ": " + e.name;
  });
  console.log("Displayed events:", titles);
}


// ============================================================
// JS Exercise 8: onchange - category filter + localStorage
// ============================================================

document.getElementById("categoryFilter").onchange = function () {

  // HTML5 Exercise 8: save to localStorage
  localStorage.setItem("category", this.value);

  if (this.value === "All") {
    displayEvents(events);
  } else {
    // JS Exercise 4: pass callback to higher-order filter
    var val = this.value;
    var filtered = filterByCategory(events, function (e) {
      return e.category === val;
    });
    displayEvents(filtered);
  }
};


// ============================================================
// HTML5 Exercise 8: localStorage - restore preference on load
// ============================================================

function loadPreference() {
  var saved = localStorage.getItem("category");
  if (saved) {
    var sel = document.getElementById("categoryFilter");
    if (sel) sel.value = saved;
  }
}

function clearPrefs() {
  localStorage.clear();
  sessionStorage.clear();
  document.getElementById("categoryFilter").value = "All";
  displayEvents(events);
  document.getElementById("output").textContent = "Preferences cleared.";
}


// ============================================================
// JS Exercise 8: onclick - register seat
// JS Exercise 2: -- operator
// JS Exercise 3: try-catch
// ============================================================

function registerSeat(name) {
  // JS Exercise 3: try-catch error handling
  try {
    var event = events.find(function (e) { return e.name === name; });

    if (!event) throw new Error("Event not found.");
    if (event.seats <= 0) throw new Error("No seats available for this event.");

    // JS Exercise 2: decrement with --
    event.seats--;

    // JS Exercise 2: increment total
    totalRegistrations++;

    // JS Exercise 4: closure tracker
    trackCategory(event.category);

    // sessionStorage
    sessionStorage.setItem("lastRegistered", name);

    console.log("Registered for: " + name);

    // JS Exercise 7: update UI without alert
    displayEvents(events);
    buildAdminTable();

    document.getElementById("output").textContent =
      "Registered for " + name + "! Seats left: " + event.seats;

  } catch (err) {
    console.error("Registration error:", err.message);
    document.getElementById("output").textContent = "Error: " + err.message;
  }
}


// ============================================================
// JS Exercise 6: Arrays - push, filter, map
// ============================================================

function addNewEvent(name, category, seats, date, price) {
  events.push({ name, category, seats, date, price });
  displayEvents(events);
  buildAdminTable();
  console.log("Added new event: " + name);
}

// filter - music events using spread clone (JS Exercise 10)
function getMusicEvents() {
  var copy = [...events];
  return copy.filter(function (e) { return e.category === "Music"; });
}

console.log("Music events:", getMusicEvents().map(function (e) { return e.name; }));


// ============================================================
// HTML5 Exercise 6: onblur phone validation
// ============================================================

document.getElementById("phone").onblur = function () {
  var err = document.getElementById("phoneErr");
  if (this.value && this.value.replace(/\D/g, "").length < 10) {
    err.textContent = "Please enter a valid 10-digit phone number.";
  } else {
    err.textContent = "";
  }
};


// ============================================================
// HTML5 Exercise 6: onchange - show event fee
// ============================================================

function showFee(select) {
  var opt = select.options[select.selectedIndex];
  var fee = opt.getAttribute("data-fee");
  document.getElementById("feeDisplay").textContent = fee ? "Event Fee: " + fee : "";
}


// ============================================================
// HTML5 Exercise 6: onkeyup character counter
// ============================================================

document.getElementById("message").onkeyup = function () {
  document.getElementById("count").textContent = this.value.length;
};


// ============================================================
// JS Exercise 11: Form - preventDefault, validate, inline errors
// ============================================================

document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var name  = this.elements["name"].value.trim();
  var email = this.elements["email"].value.trim();
  var event = this.elements["event"].value;

  var valid = true;

  if (!name) {
    document.getElementById("nameErr").textContent = "Name is required.";
    valid = false;
  } else {
    document.getElementById("nameErr").textContent = "";
  }

  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRe.test(email)) {
    document.getElementById("emailErr").textContent = "Enter a valid email address.";
    valid = false;
  } else {
    document.getElementById("emailErr").textContent = "";
  }

  if (!event) {
    document.getElementById("eventErr").textContent = "Please select an event.";
    valid = false;
  } else {
    document.getElementById("eventErr").textContent = "";
  }

  if (!valid) return;

  // JS Exercise 9 & 12: async fetch POST
  submitRegistration(name, email, event);
});


// ============================================================
// JS Exercise 9: async/await + JS Exercise 12: fetch + setTimeout
// ============================================================

async function submitRegistration(name, email, eventName) {
  var output = document.getElementById("output");
  output.textContent = "Submitting...";

  try {
    // fetch POST to mock API
    var response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email, event: eventName })
    });

    var result = await response.json();
    console.log("Server response:", result);

    // JS Exercise 12: setTimeout to simulate delay
    setTimeout(function () {
      output.textContent = "Registration successful! Welcome, " + name + ". Ref ID: #" + result.id;
    }, 800);

  } catch (err) {
    output.textContent = "Submission failed. Please try again.";
    console.error("Fetch error:", err);
  }
}


// ============================================================
// HTML5 Exercise 7: Video oncanplay
// ============================================================

document.getElementById("promoVideo").oncanplay = function () {
  document.getElementById("videoStatus").textContent = "Video ready to play";
};


// ============================================================
// HTML5 Exercise 9: Geolocation with high accuracy + error handling
// ============================================================

document.getElementById("locationBtn").onclick = function () {
  var result = document.getElementById("locationResult");

  if (!navigator.geolocation) {
    result.textContent = "Geolocation is not supported by your browser.";
    return;
  }

  result.textContent = "Locating you...";

  navigator.geolocation.getCurrentPosition(
    function (position) {
      var lat = position.coords.latitude.toFixed(5);
      var lon = position.coords.longitude.toFixed(5);
      result.innerHTML = "Latitude: " + lat + "<br>Longitude: " + lon;
      console.log("Location:", lat, lon);
    },
    function (error) {
      if (error.code === 1) {
        result.textContent = "Location access denied. Please allow it in browser settings.";
      } else if (error.code === 3) {
        result.textContent = "Request timed out. Please try again.";
      } else {
        result.textContent = "Unable to retrieve location.";
      }
      console.warn("Geolocation error:", error.message);
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
  );
};


// ============================================================
// HTML5 Exercise 4 + JS Exercise 8: ondblclick - enlarge image
// ============================================================

document.querySelectorAll(".gallery-img").forEach(function (img) {
  img.ondblclick = function () {
    var lb    = document.getElementById("lightbox");
    var lbImg = document.getElementById("lightboxImg");
    lbImg.src = this.src;
    lbImg.alt = this.alt;
    lb.classList.add("open");
  };
});

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
}


// ============================================================
// JS Exercise 7: Admin table DOM build
// ============================================================

function buildAdminTable() {
  var tbody = document.getElementById("adminBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  events.forEach(function (event) {
    var tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${event.name}</td>
      <td>${event.category}</td>
      <td>${event.date}</td>
      <td>${event.seats}</td>
      <td>${event.price}</td>
    `;
    tbody.appendChild(tr);
  });
}


// ============================================================
// JS Exercise 10: Modern JS - destructuring, spread, defaults
// ============================================================

function getEventSummary({ name, category, seats }, highlight = false) {
  return `${name} (${category}) — ${seats} seats${highlight ? " ★" : ""}`;
}

console.log("Summary:", getEventSummary(events[0], true));

var cloned = [...events];
console.log("Cloned array length:", cloned.length);


// ============================================================
// JS Exercise 13: Debugging helpers
// ============================================================

function debugStep(label, data) {
  console.group("DEBUG: " + label);
  console.log(data);
  console.groupEnd();
}

debugStep("Events on load", events);


// ============================================================
// JS Exercise 14: jQuery-style helpers (vanilla equivalents)
// jQuery: $('#locationBtn').click(fn) → done above with .onclick
// jQuery: $('.eventCard').fadeIn() / .fadeOut() → below
// ============================================================

var $ = function (sel) { return document.querySelector(sel); };

function fadeIn(el, ms) {
  ms = ms || 300;
  if (!el) return;
  el.style.opacity = 0;
  el.style.display = "block";
  var op = 0;
  var t = setInterval(function () {
    if (op >= 1) { clearInterval(t); return; }
    op = Math.min(op + 0.1, 1);
    el.style.opacity = op;
  }, ms / 10);
}

function fadeOut(el, ms) {
  ms = ms || 300;
  if (!el) return;
  var op = 1;
  var t = setInterval(function () {
    if (op <= 0) { clearInterval(t); el.style.display = "none"; return; }
    op = Math.max(op - 0.1, 0);
    el.style.opacity = op;
  }, ms / 10);
}


// ============================================================
// HTML5 Exercise 7: onbeforeunload - warn if form is partially filled
// ============================================================

window.addEventListener("beforeunload", function (e) {
  var nameInput = document.querySelector("input[name='name']");
  if (nameInput && nameInput.value.trim().length > 0) {
    e.preventDefault();
    e.returnValue = "You have an unfinished registration. Leave anyway?";
  }
});


// ============================================================
// Page init — no blocking alert
// JS Exercise 1: console.log instead of alert (non-blocking)
// ============================================================

window.onload = function () {
  // JS Exercise 1: log instead of blocking alert
  console.log("Page loaded successfully.");

  loadPreference();
  displayEvents(events);
  buildAdminTable();

  debugStep("Page init complete", { totalEvents: events.length });
};
