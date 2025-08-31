const API_URL = "http://127.0.0.1:8000/api";
let token = null;

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

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
    alert("Registration failed.");
    return;
  }

  alert("Registered! Please login.");
  showPage("login");
}

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

  // Optional: store tokens for reuse
  localStorage.setItem("accessToken", data.access);
  localStorage.setItem("refreshToken", data.refresh);

  alert("Logged in!");
  showPage("poems");
  getPoems();
}

async