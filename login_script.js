window.onload = function(){
    document.getElementById("signinBtn").addEventListener("click", SendData);
    function SendData() {
        var email = document.getElementById("signinEmail").value;
        var password = document.getElementById("signinPassword").value;
        
        $.ajax({
            type: "POST",
            url: "login.php",
            data: {email: email, password: password},
            success: function(data) {
                console.log(data);
            },
            error: function(data) {
                console.log(data);
            }
        })
    }
}
