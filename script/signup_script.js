window.onload = function(){
    document.getElementById("signupBtn").addEventListener("click", Registration);
    
    function Registration(){
        var password = document.getElementById("signupPassword").value;
        var password2 = document.getElementById("signupPassword2").value;
        if(password != password2){
            alert("Password non corrispondenti");
            return;
        }else{
            $.ajax({
                type: "POST",
                url: "api.php/Users/Info", 
                data: {
                    action: "Registration",
                    fname: document.getElementById("fname").value,
                    lname: document.getElementById("lname").value,
                    phone: document.getElementById("phone").value, 
                    email: document.getElementById("signupEmail").value, 
                    password: password
                },
                success: function(data) {
                    if(data == "Registration Failed")
                        alert("Registration Failed");
                    else{
                        alert("Registration Successful");
                        location.href = "index.php";
                    }
                },
                error: function(data) {
                    alert(data);
                }
            })
        }
    }
}