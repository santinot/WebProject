window.onload = function(){
    document.getElementById("signupBtn").addEventListener("click", Registration);
    
    function Registration(){
        var password = document.getElementById("signupPassword").value;
        var password2 = document.getElementById("signupPassword2").value;
        /*
        $("#fname").removeClass("is-invalid");
        if(fname == "" ){
            document.getElementById("fname").className = "form-control is-invalid";
            //alert("Please fill all fields");
            //to be continued
            return;*/
        if(password != password2){
            alert("Passwords do not match");
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
                    console.log(data);
                    alert("Registration Successful");
                    location.href = "index.php";
                },
                error: function(data) {
                    alert(data);
                }
            })
        }
    }
}