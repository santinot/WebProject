input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        document.getElementById("signupBtn").click();
  }
});

function Registration(){
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("signupEmail").value;
    var password1 = document.getElementById("signupPassword1").value;
    var password2 = document.getElementById("signupPassword2").value;

if(password1 != password2){
    alert("Passwords do not match");
    return;
}else{
        $.ajax({
            type: "POST",
            url: "signup.php", 
            data: {fname: fname, lname: lname, phone: phone, email: email, password1: password1, password2: password2},
            success: function(data) {
                console.log("Signup Success");
            }
        })
    }
}