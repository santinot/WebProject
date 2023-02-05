window.onload = function(){
    document.getElementById("signupBtn").addEventListener("click", Registration);
    
    function Registration(){
        var fname = document.getElementById("fname").value;
        var lname = document.getElementById("lname").value;
        var phone = document.getElementById("phone").value;
        var email = document.getElementById("signupEmail").value;
        var password = document.getElementById("signupPassword").value;
        var password2 = document.getElementById("signupPassword2").value;

        if (fname == "" || lname == "" || phone == "" || email == "" || password == "" || password2 == ""){
            alert("Riempi tutti i campi");
            return;
        }
        else if (isNaN(phone)) {
            alert("Inserire solo valori numerici nel campo telefono");
            return;
        }
        else if(password.length < 6){
            alert("La password deve essere di almeno 6 caratteri");
            return;
        }
        else if(!email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g)){
            alert("Email non valida");
            return;
        }
        else if(password != password2){
            alert("Password non corrispondenti");
            return;
        }
        else{
            $.ajax({
                type: "POST",
                url: "api.php/Users/Info", 
                data: {
                    action: "Registration",
                    fname: fname,
                    lname: lname,
                    phone: phone,
                    email: email,
                    password: password
                },
                success: function(data) {
                    console.log(data);
                    if(data == "Registration Failed")
                        alert("Registrazione Fallita, riprovare");
                    else{
                        alert("Registrazione effettuata con successo");
                        location.href = "index.php";
                    }
                },
                error: function(data) {
                    console.log(data);
                    alert("Restistazione Fallita, riprovare");
                }
            })
        }
    }
}