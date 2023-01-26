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
      <title>Strumenti</title>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
         integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
         crossorigin="anonymous"></script>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
      <script src="######"></script>
      <link href="style/home.css" rel="stylesheet">
      <script>
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
               <img src="img/icon.png" width="50" height="45" class="me-2">
               <span class="fs-4">Locker</span>
               </a>
               <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                  <a class="me-3 py-2 text-dark text-decoration-none" href="home.php">Oggetti</a>
                  <a class="me-3 py-2 text-dark text-decoration-none" href="tools.php">Strumenti</a>
                  <a class="me-3 py-2 text-dark text-decoration-none" href="insert.php">Inserisci</a>
                  <a class="me-3 py-2 text-dark text-decoration-none nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Impostazioni</a>
                  <ul class="dropdown-menu">
                     <li><a class="dropdown-item" href="settings.php">Profilo</a></li>
                     <li><a class="dropdown-item" onclick="logout()" href="">LogOut</a></li>
                  </ul>
               </nav>
            </div>
         </header>
      </div>
   </body>
</html>