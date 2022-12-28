window.onload = function(){
    document.getElementById("loginBtn").addEventListener("click", CheckData);
    document.getElementById("loginPassword").addEventListener("keypress", function(e){
        if(e.key == "Enter"){
            CheckData();
        }
    });
    
    console.log("Login script loaded");
    
    function CheckData() {
        var email = document.getElementById("loginEmail").value;
        var password = document.getElementById("loginPassword").value;
        
        $.ajax({
            type: "POST",
            url: "api.php/Users/",
            data: {email: email, password: password},
            success: function(data) {
                //location.href = "home.html";
                console.log(data);
            },
            error: function(data) {
                console.log(data);
            }
        })
    }
}
