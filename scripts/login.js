// Check if user is logged in on page load
window.onload = function() {
  const userEmail = localStorage.getItem('userEmail');

  if (userEmail) {
    // User is logged in, show welcome page
    showWelcome(userEmail);
  } else {
    // No user logged in, show login page
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('signupPage').style.display = 'none';
    document.getElementById('welcomePage').style.display = 'none';
  }
};

function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (email && password) {
    localStorage.setItem('userEmail', email);

    // Redirect to home page
    window.location.href = "website.html";
  } else {
    alert("Please enter email and password");
  }
}

function signup() {
  const email = document.getElementById('signupEmail').value;
  const name = document.getElementById('name').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;

  if (!email || !name || !password || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  localStorage.setItem('userEmail', email);

  // Redirect to home page
  window.location.href = "website.html";
}

function logout() {
  localStorage.removeItem('userEmail');
  // Show login page again
  document.getElementById('loginPage').style.display = 'block';
  document.getElementById('signupPage').style.display = 'none';
  document.getElementById('welcomePage').style.display = 'none';
}

function showSignup() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('signupPage').style.display = 'block';
}

function showLogin() {
  document.getElementById('loginPage').style.display = 'block';
  document.getElementById('signupPage').style.display = 'none';
}

// Optional: Show welcome page (if needed)
function showWelcome(email) {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('signupPage').style.display = 'none';
  document.getElementById('welcomePage').style.display = 'block';
  document.getElementById('userEmail').innerText = email;
}
