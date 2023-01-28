window.onload = function() {

    $.ajax({
        type: "GET",
        url: "api.php/Users",
        success: function (data) {
            var data = JSON.parse(data);
            console.log(data[0]['fname']);

            document.getElementById("fnameP").innerHTML = data[0]['fname'] + '<img src="img/pencil.svg" id="editFname" role="button" class="bi2 mx-2">';
            document.getElementById("lnameP").innerHTML = data[0]['lname'] + '<img src="img/pencil.svg" id="editLname" role="button" class="bi2 mx-2">';
            document.getElementById("phoneP").innerHTML = data[0]['phone'] + '<img src="img/pencil.svg" id="editPhone" role="button" class="bi2 mx-2">';
            document.getElementById("emailP").innerHTML = data[0]['email'] + '<img src="img/pencil.svg" id="editEmail" role="button" class="bi2 mx-2">';
        },
        error: function(data) {
            console.log(data, "error");
        }
    });

    




}