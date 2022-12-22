window.onload = function(){
    document.getElementById("loginBtn").addEventListener("click", SendData);
    document.getElementById("loginPassword").addEventListener("keypress", function(e){
        if(e.key == "Enter"){
            SendData();
        }
    });
    function SendData() {
        var email = document.getElementById("loginEmail").value;
        var password = document.getElementById("loginPassword").value;
        
        $.ajax({
            type: "POST",
            url: "php/login.php",
            data: {email: email, password: password},
            success: function(data) {
                if (data == "Login Failed") {
                    alert("Login Failed");
                }else{
                    window.location.href = "home.html";
                }
            }
        })
    }
}
