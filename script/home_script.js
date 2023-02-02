function getItems(btn) {
  $.ajax({
    type: "GET",
    url: "api.php/" + btn,
    success: function (data) {
      if (data == "[]") {
        alert("Nessun elemento presente");
        return;
      }
      var data = JSON.parse(data);
      console.log(data);
      CreateTable(data,btn.replace("Item",""));
    },
    error: function (data) {
      console.log(data, "error");
    }
  });
}

function CreateTable(data,key){
  var values = {"Login":['name','uri','username','password'],
                "Card":['name','number','term','cvv'],
                "Note":['name','title','text']
              };
  var headers ={"Login":['Cartella','URI','Username','Password'],
                "Card":['Cartella','Numero','Scadenza','CVV'],
                "Note":['Cartella','Nome','Testo']
              };
  document.getElementById("myTable").innerHTML = "";
  var tbl = document.getElementById("myTable");
  var tblHead = document.createElement("thead");
  var rowHead = document.createElement("tr");
  
  tblHead.classList.add("myTableHead");
  tbl.appendChild(tblHead);
  tblHead.appendChild(rowHead);

  for(var i = 0; i < headers[key].length; i++){
    var cellHead = document.createElement("th");
    var cellHeadText = document.createTextNode(headers[key][i]);
    cellHead.appendChild(cellHeadText);
    rowHead.appendChild(cellHead);
  };

  var tblBody = document.createElement("tbody");
  tbl.appendChild(tblBody);
  for(var i = 0; i < data.length; i++){
    var row = document.createElement("tr");
    for(var j = 0; j < values[key].length; j++){
      var cell = document.createElement("td");
      cell.appendChild(document.createTextNode(data[i][values[key][j]]));
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
    }
}

window.onload = function () {
  Array.from(document.getElementsByClassName("tableBtn")).forEach(function (btn) {
    btn.addEventListener("click", function () {
      getItems(btn.value);
    });
  });
}



