document.getElementById('Logg').addEventListener('submit', function(event){
     event.preventDefault();
  const uname = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const error = document.getElementById('errorMessage');
  
  const USERNAME = 'BSIS';
  const PASSWORD = 'BSIS1B';
  
  if(uname === USERNAME &&  pass === PASSWORD){
    window.location.href ='admin.html';
  }else {
    error.textContent = 'Wrojg Password ya?';
    error.style.display = 'block';
  }
 });
 function showPass() {
  
  const passInput = document.getElementById("password");
  if (passInput.type === "password") {
    passInput.type = "text";
  } else {
    passInput.type = "password";
  }
}
