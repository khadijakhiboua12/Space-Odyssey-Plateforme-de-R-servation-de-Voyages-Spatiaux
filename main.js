//Pour la page login
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

//Recuperer data a partir de localstorage
const users = JSON.parse(localStorage.getItem("users")) || [];

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("⚠️ Svp entrez votre email et mot de passe !");
    return;
  }

  // Vérifier si l'utilisateur existe
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
//L'AFFICHAGE D'UNE BUTTON LOGOUT  UNE FOIS FAIT LOGIN IN
const userInfo=document.getElementById("userInfo");
const logoutBtn=document.getElementById("logoutBtn");

const loggedUser=JSON.parse(localStorage.getItem('loggedUser'));

if(userInfo && logoutBtn){
if(loggedUser){
 userInfo.textContent=`Logged in  as:${loggedUser.email}`;
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