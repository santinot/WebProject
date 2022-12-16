
function SendData() {
    var email = document.getElementById("floatingInput").value;
    var password = document.getElementById("floatingPassword").value;
    console.log(email);
    console.log(password);
/*
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "database.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("nome=" + nome + "&cognome=" + cognome);
*/        
    $.ajax({
        type: "POST",
        url: "login.php",
        data: {email: email, password: password},
        success: function(data) {
            console.log(data);
        }
    })
}

