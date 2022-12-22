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
            type: "GET",
            url: "api.php/Users",
            //data: {email: email, password: password},
            success: function(data) {
            /*    if (data == "Login Failed") {
                    alert("Login Failed");
                }else{
                    window.location.href = "home.html";
                }*/
                console.log(data);
            },
            error: function(data) {
                console.log(data);
            }
        })
    }
}
