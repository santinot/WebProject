window.onload = function(){
    document.getElementById("loginBtn").addEventListener("click", CheckData);
    document.getElementById("loginPassword").addEventListener("keypress", function(e){
        if(e.key == "Enter"){
            CheckData();
        }
    })
    
    console.log("Login script loaded");
    
    function CheckData(){
        $.ajax({
            type: "POST",
            url: "api.php/Users",
            data: {
                action: "Login",
                email: document.getElementById("loginEmail").value,
                password:  document.getElementById("loginPassword").value
            },
            success: function(data) {
                console.log(data);
                location.href = "home.html";
            }
        })
    }
}
