window.onload = function(){
    document.getElementById("loginBtn").addEventListener("click", SendData);
    function SendData() {
        var email = document.getElementById("loginEmail").value;
        var password = document.getElementById("loginPassword").value;
        
        $.ajax({
            type: "POST",
            url: "login.php",
            data: {email: email, password: password},
            success: function(data) {
                console.log(data);
                if (data == "Login Failed") {
                    alert("Login Failed");
                }
            }
        })
    }
}
