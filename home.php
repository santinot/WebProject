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
      <title>Home</title>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
         integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
         crossorigin="anonymous"></script>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
      <script src="script/home_script.js"></script>
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
               <!-- Colonna di sinistra -->
               <div class="col-sm text-center mx-4">
                  <div class="card border-dark" style="width: 16rem;">
                     <div class="card-header">Tipi</div>
                     <ul class="list-group list-group-flush">
                        <li class="list-group-item"><button class="btn btn-outline-dark" id="allItemsBtn">
                           <img src="img/list-check.svg" class="bi bi-list-check mx-3">Tutti gli oggetti..</button>
                        </li>
                        <li class="list-group-item"><button class="btn btn-outline-dark tableBtn" id="loginBtn" value="ItemLogin">
                           <img src="img/login.svg" class="bi mx-2">Login</button>
                        </li>
                        <li class="list-group-item"><button class="btn btn-outline-dark tableBtn" id="cardBtn" value="ItemCard">
                           <img src="img/card.svg" class="bi mx-2">Carte</button>
                        </li>
                        <li class="list-group-item"><button class="btn btn-outline-dark tableBtn" id="noteBtn" value="ItemNote">
                           <img src="img/note.svg"  class="bi mx-2">Note</button>
                        </li>
                     </ul>
                  </div>
                  <div class="card border-dark" style="width: 16rem;">
                     <div class="card-header">Cartelle</div>
                     <ul id="folderBox" class="list-group list-group-flush">
                        <li class="list-group-item"><a id="newFolderBtn" role="button" >Aggiungi una cartella...</a></li>
                     </ul>
                  </div>
               </div>
               <!-- Colonna di destra -->            
               <div class="col-sm-8 text-center m-lg-4" id="division">
                  <table id="myTable" class="table table-hover myTable"></table>
               </div>
            </div>
         </div>
      </div>
   </body>
</html>