<?php
   session_start();
   if (!isset($_SESSION['ID_User'])) {
     header("Location: index.php");
   }
   ?>
<!doctype html>
<html lang="it">
   <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Profilo</title>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
         integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
         crossorigin="anonymous"></script>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
         integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
      <script src="script/settings_script.js"></script>
      <link href="style/home.css" rel="stylesheet">
      <script>
         //Logout utente ed eliminazione sessione
          function logout() {
              $.ajax({
                  type: "GET",
                  url: "api.php/Logout", 
                  success: function(data) {
                      window.location.href = "index.php";
                  }
              });
          }
      </script>
   </head>
   <body>
      <div class="container py-3">
      <header class="form-signin w-100 m-auto">
         <div class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
            <a href="home.php" class="d-flex align-items-center text-dark text-decoration-none">
            <img src="img/logo3.png" width="300" height="100" class="me-2">
            </a>
            <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
               <a class="me-3 py-2 text-dark text-decoration-none" href="home.php">Oggetti</a>
               <a class="me-3 py-2 text-dark text-decoration-none" href="insert.php">Inserisci</a>
               <a class="me-3 py-2 text-dark text-decoration-none nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Impostazioni</a>
               <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="settings.php">Profilo</a></li>
                  <li><a class="dropdown-item" onclick="logout()" href="">LogOut</a></li>
               </ul>
            </nav>
         </div>
      </header>
      <div class="container">
         <div class="row">
            <div class="card w-50" id="mycard">
               <h5 class="card-header">Informazioni Utente</h5>
               <div class="row">
                  <div class="col m-2">
                     <h5 class="card-title">Nome</h5>
                     <p class="card-text" id="fname"></p>
                  </div>
                  <div class="col m-2">
                     <h5 class="card-title">Cognome</h5>
                     <p class="card-text" id="lname"></p>
                  </div>
               </div>
               <div class="row">
                  <div class="col m-2">
                     <h5 class="card-title">Cellulare</h5>
                     <p class="card-text" id="phone"></p>
                  </div>
                  <div class="col m-2">
                     <h5 class="card-title">Email</h5>
                     <p class="card-text" id="email"></p>
                  </div>
               </div>
               <div class="row">
                  <div class="col m-2">
                     <button type="button" class="btn btn-danger" id="deleteAccount">Elimina Account</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </body>
</html>
