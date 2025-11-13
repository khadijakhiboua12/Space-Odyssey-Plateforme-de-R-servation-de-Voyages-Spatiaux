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
                // window.location.href = "index.html";
                window.location.href= "destinations.html";
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
//Pour destination

// let spacecraft_data = [];
// let booking_option_data = [];
// let destinations_data = [];

// function loadData() {
//     fetch("destinations.json")
//         .then(res => res.json())
//         .then(data => {

//             localStorage.setItem("destinations", JSON.stringify(data.destinations));
//             destinations_data = data.destinations;
//             console.log(" Destinations chargées :", destinations_data);
//             Affiche_Destination_option();
//         })
//         .catch(err => console.log(" Erreur JSON:", err));
// }


// function Affiche_Destination_option() {
//     const booking_form = document.getElementById("booking-form");
//     if (booking_form) {
//         const selectDest = document.getElementById("SelectDestination");
        
//         destinations_data.forEach(dest => {
//             const option = document.createElement("option");
//             option.textContent = dest.name;
//             option.value = dest.id;
//             selectDest.appendChild(option);
//         });
//     }
// }
// loadData();
// //Fonction 
// const container = document.getElementById("passenger-forms-container");
// const addBtn = document.querySelector(".btn-add-passenger"); // ton bouton HTML existant
// let maxPassengers = 1;

// // D'abord, cacher le bouton par défaut
// addBtn.style.display = "none";

// // Écouter les changements sur les radios
// document.querySelectorAll(".passenger-radio").forEach(radio => {
//   radio.addEventListener("change", (e) => {
//     const value = e.target.value;
//     container.innerHTML = ""; // vider les anciens formulaires
//     addBtn.style.display = "none"; // masquer à chaque changement

//     if (value === "1") {
//       maxPassengers = 1;
//       container.appendChild(createPassengerForm(1));
//     } 
//     else if (value === "2") {
//       maxPassengers = 2;
//       for (let i = 1; i <= 2; i++) {
//         container.appendChild(createPassengerForm(i));
//       }
//     } 
//     else if (value === "3-6") {
//       maxPassengers = 3; // départ avec 3 passagers
//       addBtn.style.display = "block"; // afficher le bouton existant
//       for (let i = 1; i <= 3; i++) {
//         container.appendChild(createPassengerForm(i));
//       }
//     }
//   });
// });

// // Quand on clique sur le bouton existant
// addBtn.addEventListener("click", () => {
//   const currentCount = container.querySelectorAll(".passenger-form").length;
//   if (currentCount < 6) {
//     container.appendChild(createPassengerForm(currentCount + 1));
//   }
// });

// // Fonction de création du formulaire passager
// function createPassengerForm(index) {
//   const div = document.createElement("div");
//   div.className = "passenger-form mb-6 p-4 border border-neon-blue/30 rounded-md";
//   div.innerHTML = `
//     <h3 class="font-orbitron text-xl mb-3">Passenger ${index}</h3>
//     <div class="grid md:grid-cols-2 gap-6 mb-4">
//       <div>
//         <label class="block text-sm font-semibold mb-2">First Name</label>
//         <input type="text" class="first-name w-full bg-space-dark border border-neon-blue/30 rounded-md p-3" placeholder="Enter first name">
//       </div>
//       <div>
//         <label class="block text-sm font-semibold mb-2">Last Name</label>
//         <input type="text" class="last-name w-full bg-space-dark border border-neon-blue/30 rounded-md p-3" placeholder="Enter last name">
//       </div>
//       <div>
//         <label class="block text-sm font-semibold mb-2">Email</label>
//         <input type="email" class="email w-full bg-space-dark border border-neon-blue/30 rounded-md p-3" placeholder="Enter email">
//       </div>
//       <div>
//         <label class="block text-sm font-semibold mb-2">Phone</label>
//         <input type="tel" class="phone w-full bg-space-dark border border-neon-blue/30 rounded-md p-3" placeholder="Enter phone">
//       </div>
//     </div>
//   `;
//   return div;
// }
// //Fonction pour la validation de formalaire de booking
// function  validatePassengerForm(){
//  const firsNames=document.querySelectorAll(".first-name");
//  const lastNames=document.querySelectorAll(".last-name");
//  const emails=document.querySelectorAll(".email");
//  const phones=document.querySelectorAll(".phone");
//  let valid=true;

//  for(let i=0;i<firsNames.length;i++){
//     if(!validateName(firsNames[i].value) || !validateName(lastNames[i].value) ||!validateEmail(emails[i].value) ||!validatePhone(phones[i].value)){
//         alert(`Erreur dans le formulaire du passager ${i+1}`);
//         valid=false;
//         break;
// }
//  }
//       if(valid){
//           alert("tout les passages sont valide");
//       }
// }

// //fonction pour  nom 
// function  validateName(name){
//     const regex=/^[A-Z-a-z]{2,20}$/;
//      return regex.test(name.trim());
// }
// //fonction pour email
// function validateEmail(email){
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
//     return regex.test(email.trim());
// }
// //fonction pour phone
// function validatePhone(phone){
//     const regex=/^[0-9]{8,15}$/;
//     return regex.test(phone.trim());
// }

// document.querySelector(".btn-confirm-booking").addEventListener("click",(e)=>{
//     e.preventDefault();
//      validatePassengerForm();

// });

// //fonction accodimation
// let accommodations_data = [];

// // Charger les accommodations
// function loadAccommodations() {
//     fetch("accommodations.json")
//         .then(res => res.json())
//         .then(data => {
//             localStorage.setItem("accommodations", JSON.stringify(data.accommodations));
//             accommodations_data = data.accommodations;
//             console.log("Accommodations chargées :", accommodations_data);
//         })
//         .catch(err => console.log("Erreur JSON accommodations:", err));
// }

// // Afficher les accommodations selon la destination sélectionnée
// function showAccommodations(destinationId) {
//     const container = document.getElementById("accommodations-container");
//     container.innerHTML = ""; 

//     const filtered = accommodations_data.filter(acc => acc.availableOn.includes(destinationId));

//     filtered.forEach(acc => {
//         const div = document.createElement("div");
//         div.className = "p-4 rounded-lg border border-neon-blue/20 bg-space-blue/40 hover:border-neon-blue/70 hover:shadow-lg transition";
//         div.innerHTML = `
//             <h4 class="font-semibold text-neon-blue mb-2">${acc.name}</h4>
//             <p class="text-gray-300 text-sm">${acc.shortDescription}</p>
//             <p class="text-gray-300 text-sm">$${acc.pricePerDay}/day</p>

//         `;
//         container.appendChild(div);
//     });
// }

// // changement de destination
// document.getElementById("SelectDestination").addEventListener("change", (e) => {
//     const selectedDestination = e.target.value;
//     if (selectedDestination) {
//         showAccommodations(selectedDestination);
//     } else {
//         document.getElementById("accommodations-container").innerHTML = "";
//     }
// });
// loadData();           
// loadAccommodations(); 
// //fonction de calcule le prix
// // 🔹 دالة لإظهار الوجهات داخل select
// function loadDestinations() {
//   const select = document.getElementById("SelectDestination");
//   for (let i = 0; i < destinations_data.length; i++) {
//     const opt = document.createElement("option");
//     opt.value = destinations_data[i].id;
//     opt.textContent = destinations_data[i].name;
//     select.appendChild(opt);
//   }
// }

// // 🔹 دالة لإظهار الإقامات الخاصة بكل وجهة
// function showAccommodations(destinationId) {
//   const container = document.getElementById("accommodations-container");
//   container.innerHTML = ""; // نفرغ القديم

//   const filtered = accommodations_data.filter(function(acc) {
//     return acc.availableOn.includes(destinationId);
//   });

//   for (let i = 0; i < filtered.length; i++) {
//     const acc = filtered[i];
//     const div = document.createElement("div");
//     div.className = "p-4 border rounded-lg cursor-pointer hover:bg-blue-900/20";
//     div.setAttribute("data-id", acc.id);
//     div.innerHTML = `
//       <h4 class="font-semibold">${acc.name}</h4>
//       <p>$${acc.pricePerDay}/day</p>
//     `;
//     div.addEventListener("click", function() {
//       calculatePrice(destinationId, acc.id);
//     });
//     container.appendChild(div);
//   }
// }

// // 🔹 دالة تبحث في البيانات بالـ id
// function findDataById(data_arr, selected_id) {
//   for (let i = 0; i < data_arr.length; i++) {
//     if (data_arr[i].id === selected_id) {
//       return data_arr[i];
//     }
//   }
//   return null;
// }

// // 🔹 دالة تحسب الثمن الكلي
// function calculatePrice(selectedDestId, selectedAccommId) {
//   const totalDiv = document.getElementById("total-price");

//   const destObject = findDataById(destinations_data, selectedDestId);
//   const accObject = findDataById(accommodations_data, selectedAccommId);

//   if (!destObject || !accObject) {
//     totalDiv.textContent = "$0.00";
//     return;
//   }

//   const total = destObject.price + accObject.pricePerDay;
//   totalDiv.textContent = "Total: $" + total.toLocaleString();
// }

// // 🔹 منين المستخدم يختار الوجهة
// document.getElementById("SelectDestination").addEventListener("change", function() {
//   const selectedDestId = this.value;
//   if (selectedDestId) {
//     showAccommodations(selectedDestId);
//   } else {
//     document.getElementById("accommodations-container").innerHTML = "";
//     document.getElementById("total-price").textContent = "$0.00";
//   }
// });

// // 🔹 نحمّلو الوجهات أول مرة
// loadDestinations();
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

// create stars
// function createStars() {
//   const container = document.getElementById("stars-container");
//   for (let i = 0; i < 100; i++) {
//     const s = document.createElement("div");
//     s.classList.add("star");
//     s.style.left = Math.random() * 100 + "%";
//     s.style.top = Math.random() * 100 + "%";
//     container.appendChild(s);
//   }
// }

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

// init
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

//function de enregistrement
function enregistrement(){
     
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
const bookings=JSON.parse(localStorage.getItem("booking")) || [];
const newBooking={
    id:Date.now(),
    user:loggedUser.email,
    date:new Date().toLocaleString(),
};``
bookings.push(newBooking);
localStorage.setItem("bookings",JSON.stringify(bookings));
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
