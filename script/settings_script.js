function EditEvent(paragraph){
    var val = document.getElementById(paragraph);
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "editInput");
    input.setAttribute("value", val.textContent);
    input.setAttribute("size", "12");
    val.innerHTML = "";
    val.appendChild(input);
    var btn = document.createElement("button");
    btn.classList.add("btn", "btn-success", "btn-sm", "mx-2");
    btn.setAttribute("id", "editBtn");
    btn.innerHTML = "Salva";
    val.appendChild(btn); 
}



window.onload = function() {

    $.ajax({
        type: "GET",
        url: "api.php/Users",
        success: function (data) {
            var data = JSON.parse(data);
            document.getElementById("fnameP").innerHTML = data[0]['fname'] + '<img src="img/pencil.svg" id="editFname" role="button" class="bi2 mx-2">';
            document.getElementById("lnameP").innerHTML = data[0]['lname'] + '<img src="img/pencil.svg" id="editLname" role="button" class="bi2 mx-2">';
            document.getElementById("phoneP").innerHTML = data[0]['phone'] + '<img src="img/pencil.svg" id="editPhone" role="button" class="bi2 mx-2">';
            document.getElementById("emailP").innerHTML = data[0]['email'] + '<img src="img/pencil.svg" id="editEmail" role="button" class="bi2 mx-2">';
        
            document.getElementById("editFname").addEventListener("click",function(){
                EditEvent("fnameP")});
            document.getElementById("editLname").addEventListener("click",function(){
                EditEvent("lnameP");
            });
            document.getElementById("editPhone").addEventListener("click",function(){
                EditEvent("phoneP");
            });
            document.getElementById("editEmail").addEventListener("click",function(){
                EditEvent("emailP");
            });

        },
        error: function(data) {
            console.log(data, "error");
        }
    });
}

  