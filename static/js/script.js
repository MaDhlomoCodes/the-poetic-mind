const API_URL = "https://the-poetic-mind.onrender.com/api";
let token = localStorage.getItem("accessToken") || null;

// Show/hide pages
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// Registration
async function register(e) {
  e.preventDefault();
  const res = await fetch(`${API_URL}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: document.getElementById("regUsername").value,
      email: document.getElementById("regEmail").value,
      password: document.getElementById("regPassword").value,
    })
  });

  if (!res.ok) {
    const errorData = await res.json();
    alert("Registration failed: " + JSON.stringify(errorData));
    return;
  }

  alert("Registered! Please login.");
  showPage("login");
}

// Login
async function login(e) {
  e.preventDefault();
  const res = await fetch(`${API_URL}/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value,
    })
  });

  if (!res.ok) {
    alert("Login failed. Please check your credentials.");
    return;
  }

  const data = await res.json();
  token = data.access;

  localStorage.setItem("accessToken", data.access);
  localStorage.setItem("refreshToken", data.refresh);

  alert("Logged in!");
  showPage("poems");
  getPoems();
}

// Fetch poems
async function getPoems() {
  if (!token) return;

  const res = await fetch(`${API_URL}/poems/`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    alert("Failed to fetch poems.");
    return;
  }

  const poems = await res.json();
  const poemList = document.getElementById("poemList");
  poemList.innerHTML = "";

  poems.forEach(poem => {
    const div = document.createElement("div");
    div.className = "poem";
    div.innerHTML = `<h3>${poem.title}</h3><p>${poem.content}</p>`;
    poemList.appendChild(div);
  });
}

// Logout
function logout() {
  token = null;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  showPage("login");
}

// Optional: auto-login if token exists
if (token) {
  showPage("poems");
  getPoems();
} else {
  showPage("login");
}

// Event listeners
document.getElementById("registerForm")?.addEventListener("submit", register);
document.getElementById("loginForm")?.addEventListener("submit", login);
document.getElementById("logoutBtn")?.addEventListener("click", logout);
