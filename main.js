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
        // selectDest.innerHTML = 'Select your destination';
        destinations_data.forEach(dest => {
            const option = document.createElement("option");
            option.textContent = dest.name;
            option.value = dest.id;
            selectDest.appendChild(option);
        });
    }
}
loadData();
//Fonction  de  
