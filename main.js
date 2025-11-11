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
                window.location.href = "index.html";
            } else {
                alert("Email ou mot de passe incorrect !");
            }
        });
    }
});
;
//L'AFFICHAGE D'UNE BUTTON LOGOUT  UNE FOIS FAIT LOGIN IN
const userInfo=document.getElementById("userInfo");
const logoutBtn=document.getElementById("logoutBtn");

const loggedUser=JSON.parse(localStorage.getItem('loggedUser'));

if(userInfo && logoutBtn){
if(loggedUser){
 userInfo.textContent=`Logged in  as : ${loggedUser.email}`;
 logoutBtn.style.display='inline-block';
}else{
 userInfo.textContent='Not logged in';
 logoutBtn.style.display='none';
}

//logout function
logoutBtn.addEventListener('click',()=>{
    localStorage.removeItem('loggedUser');
    userInfo.textContent='Not logged in';
    logoutBtn.style.display='none';
    window.location.href = "login.html";

});
}
//Pour destination
let accommodation_data = [];
let destinations_data = [];
let spacecraft_data = [];
let booking_option_data = [];

function loadData(){
  fetch("destinations.json")
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("destination", JSON.stringify(data));
      console.log(data.destinations); 
    })
    .catch(err => console.log("Erreur JSON:", err));
}
loadData();

//Pour select
const select=document.getElementById("SelectDestination");
