function SetValues(data){
    document.getElementById("fname").innerHTML = data[0]['fname'] + '<img src="img/pencil.svg" id="editFname" role="button" class="bi2 mx-2">';
    document.getElementById("lname").innerHTML = data[0]['lname'] + '<img src="img/pencil.svg" id="editLname" role="button" class="bi2 mx-2">';
    document.getElementById("phone").innerHTML = data[0]['phone'] + '<img src="img/pencil.svg" id="editPhone" role="button" class="bi2 mx-2">';
    document.getElementById("email").innerHTML = data[0]['email'] + '<img src="img/pencil.svg" id="editEmail" role="button" class="bi2 mx-2">';
    
    document.getElementById("editFname").addEventListener("click",function(){
        EditEvent("fname");
        document.getElementById("editBtnfname").addEventListener("click",function(){
            SendValues(document.getElementById("editInputfname").value, "fname","Info");
        });
    });
    document.getElementById("editLname").addEventListener("click",function(){
        EditEvent("lname");
        document.getElementById("editBtnlname").addEventListener("click",function(){
            SendValues(document.getElementById("editInputlname").value, "lname","Info");
        });
    });
    document.getElementById("editPhone").addEventListener("click",function(){
        EditEvent("phone");
        document.getElementById("editBtnphone").addEventListener("click",function(){
            SendValues(document.getElementById("editInputphone").value, "phone","Info");
        });
    });
    document.getElementById("editEmail").addEventListener("click",function(){
        EditEvent("email");
        document.getElementById("editBtnemail").addEventListener("click",function(){
            SendValues(document.getElementById("editInputemail").value, "email","Users");
        });
    });
}

function SendValues(value, field, table){
    $.ajax({
        type: "PUT",
        url: "api.php/" + table,
        data: {
            field: field,
            value: value
        },
        success: function (data) {
            if(data.search("Successful") != -1  ){
                alert("Modifica effettuata");
                window.location.reload();
            }
        },
        error: function(data) {
            console.log("error" + data);
        }
    });
}

    
function EditEvent(paragraph){
    var val = document.getElementById(paragraph);
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "editInput"+paragraph);
    input.setAttribute("value", val.textContent);
    input.setAttribute("size", "12");
    val.innerHTML = "";
    val.appendChild(input);
    var btn = document.createElement("button");
    btn.classList.add("btn", "btn-success", "btn-sm", "mx-2");
    btn.setAttribute("id", "editBtn"+paragraph);
    btn.innerHTML = "Salva";
    val.appendChild(btn);
}

function GetValues(){
    $.ajax({
        type: "GET",
        url: "api.php/Users",
        success: function (data) {
            var data = JSON.parse(data);
            SetValues(data);
            
        },
        error: function(data) {
            console.log(data, "error");
        }
    });
}


window.onload = function() {
   GetValues(); 

}

            