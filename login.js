// Toggle between login and register forms
document.getElementById('showRegister').addEventListener('click', function() {
  document.getElementById('loginForm').classList.add('d-none');
  document.getElementById('registerForm').classList.remove('d-none');
});

document.getElementById('showLogin').addEventListener('click', function() {
  document.getElementById('loginForm').classList.remove('d-none');
  document.getElementById('registerForm').classList.add('d-none');
});

// Register Form Submission
document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;

  // Store registered users in localStorage
  let users = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = users.some(user => user.username === username);

  if (!userExists) {
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! You can now log in.');
    
    // Switch back to login form
    document.getElementById('showLogin').click();
  } else {
    alert('Username already exists. Please choose a different one.');
  }
});

// Login Form Submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];
  const validUser = users.find(user => user.username === username && user.password === password);

  if (validUser) {
    // Successful login, redirect to the home page (index.html)
    localStorage.setItem('currentUser', JSON.stringify(validUser));
    window.location.href = 'index.html';  // Redirect to home page
  } else {
    alert('Invalid username or password. Please try again.');
  }
});

// Logout
function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'logout.html';
}
