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
