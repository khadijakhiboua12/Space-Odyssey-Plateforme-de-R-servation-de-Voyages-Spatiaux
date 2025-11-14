 "use strict";
document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginBtn = document.getElementById("loginBtn");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (loginBtn) {
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {
                alert(" Svp entrez votre email et mot de passe !");
                return;
            }

            const userFound = users.find(
                user => user.email === email && user.password === password
            );

            if (userFound) {
                alert("Connexion réussie !");
                localStorage.setItem("loggedUser", JSON.stringify(userFound));
                window.location.href= "index.html";
            } else {
                alert("Email ou mot de passe incorrect !");
            }
        });
    }
});
;
//L'AFFICHAGE D'UNE BUTTON LOGOUT  UNE FOIS FAIT LOGIN IN
const userInfo = document.getElementById("userInfo");
const logoutBtn = document.getElementById("logoutBtn");

const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

if (userInfo && logoutBtn) {
    if (loggedUser) {
        userInfo.textContent = `Logged in  as : ${loggedUser.email}`;
        logoutBtn.style.display = 'inline-block';
    } else {
        userInfo.textContent = 'Not logged in';
        logoutBtn.style.display = 'none';
    }

    //logout function
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedUser');
        userInfo.textContent = 'Not logged in';
        logoutBtn.style.display = 'none';
        window.location.href = "login.html";

    });
}


tailwind.config = {
  theme: {
    extend: {
      colors: {
        'space-dark': '#0a0a18',
        'space-blue': '#1a1a2e',
        'space-purple': '#16213e',
        'neon-blue': '#0ea5e9',
        'neon-purple': '#8b5cf6',
        'neon-cyan': '#06b6d4',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'exo': ['Exo 2', 'sans-serif'],
      },
    }
  }
};

let accommodationsData = [];
let destinationsData = [];
let passengerCount = 1;
let maxPassengers = 1;



// update total price
function updateTotalPrice() {
  const destinationSelect = document.getElementById("destination");
  const totalElem = document.getElementById("total-price-display");
  if (!destinationSelect.value) {
    totalElem.textContent = "";
    return;
  }

  const selectedOption = destinationSelect.options[destinationSelect.selectedIndex];
  const dest = JSON.parse(selectedOption.getAttribute("data-destination"));
  const basePrice = dest.price || 0;
  const duration = dest.duration || 0;

  const accommodationId = document.getElementById("accommodation").value;
  const acc = accommodationsData.find(function(a){ return a.id === accommodationId; });
  const accPrice = acc ? acc.pricePerDay : 0;

  const total = basePrice + (accPrice* passengerCount * duration) ;
  totalElem.textContent = `Total: $${total.toLocaleString()} ${dest.currency || ""}`;
}

// add passengers
function addPassengerForm() {
  if (passengerCount >= maxPassengers) return;
  passengerCount++;
  const container = document.getElementById("passenger-forms-container");
  const newDiv = document.createElement("div");
  newDiv.className = "passenger-form mt-6";
  newDiv.innerHTML = ""
    + "<h3 class='font-orbitron text-neon-blue mb-2'>Passenger " + passengerCount + "</h3>"
    + createInput("First Name", "name")
    + createInput("Last Name", "name")
    + createInput("Email", "email")
    + createInput("Phone", "phone");
  container.appendChild(newDiv);

  const inputs = newDiv.querySelectorAll("[data-validation]");
  for (let i = 0; i < inputs.length; i++) {
    attachValidation(inputs[i]);
  }
  updateTotalPrice();
}

function createInput(placeholder, type) {
  return ""
    + "<div class='mb-3'>"
    + "<input type='text' placeholder='" + placeholder + "' required data-validation='" + type + "' "
    + "class='w-full h-12 rounded-md border border-gray-600 bg-space-dark/70 px-4 text-white focus:outline-none transition-colors duration-200' />"
    + "<div class='error-message text-sm mt-1 text-red-400 hidden'></div>"
    + "</div>";
}

// passenger
function updateMaxPassengers() {
  const type = document.querySelector('input[name="passengers"]:checked').value;
  if (type === "solo") maxPassengers = 1;
  if (type === "couple") maxPassengers = 2;
  if (type === "group") maxPassengers = 6;

  const forms = document.querySelectorAll(".passenger-form");
  for (let i = forms.length - 1; i >= maxPassengers; i--) {
    forms[i].remove();
  }
  passengerCount = Math.min(passengerCount, maxPassengers);
  updateTotalPrice();
}

// load accommodations
function loadAccommodations() {
  return fetch("accommodations.json")
    .then(function(res){ return res.json(); })
    .then(function(data){ accommodationsData = data.accommodations; });
}

// load destinations
function loadDestinations() {
  return fetch("destinations.json")
    .then(function(res){ return res.json(); })
    .then(function(data){
      destinationsData = data.destinations;
      const select = document.getElementById("destination");
      destinationsData.forEach(function(dest){
        const opt = document.createElement("option");
        opt.value = dest.id;
        opt.textContent = dest.name + " — $" + dest.price;
        opt.setAttribute("data-destination", JSON.stringify(dest));
        select.appendChild(opt);
      });

      select.addEventListener("change", function(){
        const selected = this.options[this.selectedIndex];
        const dest = JSON.parse(selected.getAttribute("data-destination"));
        document.getElementById("destination-name").textContent = dest.name;
        document.getElementById("destination-description").textContent = dest.description;
        document.getElementById("destination-duration").textContent = dest.travelDuration;
        document.getElementById("destination-distance").textContent = dest.distance;
        document.getElementById("destination-gravity").textContent = dest.gravity;
        document.getElementById("destination-temperature").textContent = dest.temperature;
        document.getElementById("destination-price").textContent = "$" + dest.price + " " + (dest.currency || "");
        document.getElementById("destination-info").classList.remove("hidden");
        showAccommodationsForDestination(dest);
        updateTotalPrice();
      });
    });
}

// show accommodations
function showAccommodationsForDestination(dest) {
  const container = document.getElementById("accommodations-container");
  container.innerHTML = "";
  const available = accommodationsData.filter(function(a){
     return dest.accommodations.includes(a.id); });
  available.forEach(function(acc){
    const card = document.createElement("div");
    card.className = "accommodation-card p-4 border border-neon-blue/30 rounded-md cursor-pointer hover:bg-neon-blue/10";
    card.innerHTML = ""
      + "<h3 class='font-orbitron text-neon-blue mb-2'>" + acc.name + "</h3>"
      + "<p class='text-sm text-gray-400'>" + acc.shortDescription + "</p>"
      + "<div class='mt-2 text-xs text-gray-500'>Price: $" + acc.pricePerDay + "/day</div>";
    card.addEventListener("click", function(){
      document.getElementById("accommodation").value = acc.id;
      updateTotalPrice();
    });
    container.appendChild(card);
  });
  if (available.length > 0) document.getElementById("accommodation").value = available[0].id;
}

// regex
const patterns = {
  name: /^[A-Za-zÀ-ÿ\s'-]{2,30}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?\d{7,15}$/
};

function validateField(input) {
  const type = input.dataset.validation;
  const value = input.value.trim();
  const errorDiv = input.nextElementSibling;
  let valid = true;

  if (!value) {
    errorDiv.textContent = "Ce champ est obligatoire";
    errorDiv.classList.remove("hidden");
    input.style.borderColor = "rgb(239 68 68)";
    valid = false;
  } else if (patterns[type] && !patterns[type].test(value)) {
    errorDiv.textContent = "Invalid " + type;
    errorDiv.classList.remove("hidden");
    input.style.borderColor = "rgb(239 68 68)";
    valid = false;
  } else {
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");
    input.style.borderColor = "rgb(34 197 94)";
  }
  return valid;
}

function attachValidation(input) {
  input.addEventListener("blur", function(){ validateField(input); });
  input.addEventListener("input", function(){ validateField(input); });
}


document.addEventListener("DOMContentLoaded", function(){
  createStars();
  loadAccommodations().then(function(){
    loadDestinations().then(function(){
      updateMaxPassengers();

      const inputs = document.querySelectorAll("[data-validation]");
      for (let i = 0; i < inputs.length; i++) {
        attachValidation(inputs[i]);
      }

      const radios = document.querySelectorAll('input[name="passengers"]');
      for (let i = 0; i < radios.length; i++) {
        radios[i].addEventListener("change", updateMaxPassengers);
      }

      document.getElementById("add-passenger-btn").addEventListener("click", addPassengerForm);
    });
  });
});
//fonction de choisit une destination

const destinationSelect = document.getElementById("destination");
destinationSelect.addEventListener("change", function() {
    const destinations = JSON.parse(localStorage.getItem("destinations")) || [];
    const selected = destinations.find(d => d.id === this.value);
    if (!selected) return;

    const passengerCount = document.querySelectorAll(".passenger-form").length || 1;
    const totalPrice = selected.price * passengerCount;

   
    localStorage.setItem("selectedDestination", JSON.stringify({
        id: selected.id,
        name: selected.name,
        price: selected.price,
        totalPrice: totalPrice
    }));
});


//function de enregistrement
 function collectPassengerData() {
  const passengers = [];
  const passengerForms = document.querySelectorAll(".passenger-form");

  passengerForms.forEach((form, index) => {
    const inputs = form.querySelectorAll("input[data-validation]");
    const passenger = {
      id: Date.now() + index, 
      firstName: inputs[0]?.value.trim() || "",
      lastName: inputs[1]?.value.trim() || "",
      email: inputs[2]?.value.trim() || "",
      phone: inputs[3]?.value.trim() || "",
      
      isPrimary: index === 0 
    };
    passengers.push(passenger);
  });

  return passengers;
}

// submit
document.getElementById("booking-form").addEventListener("submit", function(e){
  e.preventDefault();

  
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (!loggedUser) {
    alert("Veuillez vous connecter avant de confirmer la réservation !");
    window.location.href = "login.html";
    return; 
  }

//souvegarder  les donnes dans localStorage

const selectedDestination = JSON.parse(localStorage.getItem("selectedDestination")) || {};

const newBooking = {
  id: Date.now(),
  user: loggedUser.email,
  date: new Date().toLocaleString(),
  destination: selectedDestination.name || "Non spécifiée",
  price: selectedDestination.totalPrice || 0,
  passengers: collectPassengerData()
};

const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
bookings.push(newBooking);
localStorage.setItem("bookings", JSON.stringify(bookings));

console.log(bookings); 

//fin de souvegard
 
  let valid = true;
  const inputs = document.querySelectorAll("[data-validation]");
  for (let i = 0; i < inputs.length; i++) {
    if (!validateField(inputs[i])) valid = false;
  }

  if (!valid) {
    alert("Veuillez corriger les erreurs dans le formulaire.");
    return; 
  }

  alert("Réservation confirmée ! Votre voyage spatial vous attend !");
  this.reset(); 
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].style.borderColor = "";
  }

  window.location.href = "mybooking.html";
});

