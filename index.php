<?php
  session_start();
?> 
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Locker</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/5.2/examples/sign-in/">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="script/login_script.js"></script>
    <link href="style/signin.css" rel="stylesheet">

  </head>
  <body class="text-center">
    
    <main class="form-signin w-100 m-auto">
    <div>
        <img class='mb-2' src="img/logo3.png" width="300" height="100">
        <h1 class="h3 mb-3 fw-normal">Effettua l'accesso</h1>

        <div class="form-floating">
        <input type="text" class="form-control" autocomplete="username" id="loginEmail" placeholder="Email">
        <label for="loginEmail">Email</label>
        </div>
        <div class="form-floating">
        <input type="password" class="form-control" autocomplete="current-password" id="loginPassword" placeholder="Password">
        <label for="loginPassword">Password</label>
        </div>
        
        <button class="w-100 btn btn-success" id="loginBtn">Accedi</button>
        <p class="mt-3 mb-2 text-muted">oppure</p>
        <a href="signup.html" class="link-success">Registrati</a>
      </div>
    </main>

  </body>
</html>