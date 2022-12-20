window.onload = function(){
    document.getElementById("signupBtn").addEventListener("click", Registration);
    function Registration(){
        var fname = document.getElementById("fname").value;
        var lname = document.getElementById("lname").value;
        var phone = document.getElementById("phone").value;
        var email = document.getElementById("signupEmail").value;
        var password1 = document.getElementById("signupPassword1").value;
        var password2 = document.getElementById("signupPassword2").value;

        if(fname == "" || lname == "" || phone == "" || email == "" || password1 == "" || password2 == ""){
            document.getElementById("fname").className = "form-control is-invalid";
            //alert("Please fill all fields");
            //to be continued
            return;
        }else if(password1 != password2){
            alert("Passwords do not match");
            return;
        }else{
            $.ajax({
                type: "POST",
                url: "signup.php", 
                data: {fname: fname, lname: lname, phone: phone, email: email, password1: password1},
                success: function(data) {
                    console.log("Signup Success");
                }
            })
        }
    }
}