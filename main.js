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
let accommodation_data = [];
let spacecraft_data = [];
let booking_option_data = [];
let destinations_data = [];

function loadData() {
    fetch("destinations.json")
        .then(res => res.json())
        .then(data => {

            localStorage.setItem("destinations", JSON.stringify(data.destinations));
            destinations_data = data.destinations;
            console.log(" Destinations chargées :", destinations_data);
            Affiche_Destination_option();
        })
        .catch(err => console.log(" Erreur JSON:", err));
}


function Affiche_Destination_option() {
    const booking_form = document.getElementById("booking-form");
    if (booking_form) {
        const selectDest = document.getElementById("SelectDestination");
        
        destinations_data.forEach(dest => {
            const option = document.createElement("option");
            option.textContent = dest.name;
            option.value = dest.id;
            selectDest.appendChild(option);
        });
    }
}
loadData();
//Fonction 
const container = document.getElementById("passenger-forms-container");
const addBtn = document.querySelector(".btn-add-passenger"); // ton bouton HTML existant
let maxPassengers = 1;

// D'abord, cacher le bouton par défaut
addBtn.style.display = "none";

// Écouter les changements sur les radios
document.querySelectorAll(".passenger-radio").forEach(radio => {
  radio.addEventListener("change", (e) => {
    const value = e.target.value;
    container.innerHTML = ""; // vider les anciens formulaires
    addBtn.style.display = "none"; // masquer à chaque changement

    if (value === "1") {
      maxPassengers = 1;
      container.appendChild(createPassengerForm(1));
    } 
    else if (value === "2") {
      maxPassengers = 2;
      for (let i = 1; i <= 2; i++) {
        container.appendChild(createPassengerForm(i));
      }
    } 
    else if (value === "3-6") {
      maxPassengers = 3; // départ avec 3 passagers
      addBtn.style.display = "block"; // afficher le bouton existant
      for (let i = 1; i <= 3; i++) {
        container.appendChild(createPassengerForm(i));
      }
    }
  });
});

// Quand on clique sur le bouton existant
addBtn.addEventListener("click", () => {
  const currentCount = container.querySelectorAll(".passenger-form").length;
  if (currentCount < 6) {
    container.appendChild(createPassengerForm(currentCount + 1));
  }
});

// Fonction de création du formulaire passager
function createPassengerForm(index) {
  const div = document.createElement("div");
  div.className = "passenger-form mb-6 p-4 border border-neon-blue/30 rounded-md";
  div.innerHTML = `
    <h3 class="font-orbitron text-xl mb-3">Passenger ${index}</h3>
    <div class="grid md:grid-cols-2 gap-6 mb-4">
      <div>
        <label class="block text-sm font-semibold mb-2">First Name</label>
        <input type="text" class="w-full bg-space-dark border border-neon-blue/30 rounded-md p-3" placeholder="Enter first name">
      </div>
      <div>
        <label class="block text-sm font-semibold mb-2">Last Name</label>
        <input type="text" class="w-full bg-space-dark border border-neon-blue/30 rounded-md p-3" placeholder="Enter last name">
      </div>
      <div>
        <label class="block text-sm font-semibold mb-2">Email</label>
        <input type="email" class="w-full bg-space-dark border border-neon-blue/30 rounded-md p-3" placeholder="Enter email">
      </div>
      <div>
        <label class="block text-sm font-semibold mb-2">Phone</label>
        <input type="tel" class="w-full bg-space-dark border border-neon-blue/30 rounded-md p-3" placeholder="Enter phone">
      </div>
    </div>
  `;
  return div;
}
