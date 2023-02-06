window.onload = function() {
    //Aggiunta evento click al bottone di login
    document.getElementById("loginBtn").addEventListener("click", CheckData);
    document.getElementById("loginPassword").addEventListener("keypress", function(e) {
        if (e.key == "Enter") {
            CheckData();
        }
    });
    //Controllo dei dati inseriti per il login
    function CheckData() {
        $.ajax({
            type: "POST",
            url: "api.php/Users",
            data: {
                action: "Login",
                email: document.getElementById("loginEmail").value,
                password: document.getElementById("loginPassword").value
            },
            success: function(data) {
                console.log(data);
                if (data == "Login Failed") {
                    alert("Login Fallito, riprovare");
                } else {
                    location.href = "home.php";
                }
            }
        })
    }
}