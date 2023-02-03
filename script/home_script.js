function getItems(btn,bool) {
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
      CreateTableItems(data,btn.replace("Item",""),bool);
    },
    error: function (data) {
      console.log(data, "error");
    }
  });
}


function CreateTableItems(data,key,bool){
  var values = {"Login":['name','uri','username','password'],
                "Card":['name','number','term','cvv'],
                "Note":['name','title','text']
              };
  var headers ={"Login":['Cartella','URI','Username','Password'],
                "Card":['Cartella','Numero','Scadenza','CVV'],
                "Note":['Cartella','Nome','Testo']
              };
  if(bool)
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

function getFolders() {
  $.ajax({
    type: "GET",
    url: "api.php/Folders",
    success: function (data) {
      if (data == "[]") {
        alert("Nessuna cartella presente");
        return;
      }
      var data = JSON.parse(data);
      console.log(data);
      CreateFolderBox(data);
    },
    error: function (data) {
      console.log(data, "error");
    }
  });
}

function CreateFolderBox(data){
  var ul = document.getElementById("folderBox");
  
  for(var i = 0; i < data.length; i++){
    var li = document.createElement("li");
    var btn = document.createElement("button");

    li.classList.add("list-group-item");
    btn.classList.add("btn","btn-outline-dark","tableBtn");
    btn.value = data[i].ID;
    btn.innerHTML = "<img src='img/archive.svg' class='bi mx-2'>" + data[i].name;

    ul.appendChild(li);
    li.appendChild(btn);

    btn.addEventListener("click", function () {
        if(!isNaN(btn.value)){
          document.getElementById("myTable").innerHTML = "";
          getItems("ItemLogin",false);
          getItems("ItemCard",false);
          getItems("ItemNote",false);
        }
      });
  }
}  

  function AddFolder(){
    var name = prompt("Inserisci il nome della cartella");
    if (name == null || name == "") {
      alert("Nome non valido");
      return;
    }
    $.ajax({
      type: "POST",
      url: "api.php/Folders",
      data: { 
        action: "AddItem",
        name: name      
      },
      success: function (data) {
        console.log(data);
        window.location.reload();
      },
      error: function (data) {
        console.log(data, "error");
      }
    });
  }
  

window.onload = function () {
  getFolders();

  Array.from(document.getElementsByClassName("tableBtn")).forEach(function (btn) {
    btn.addEventListener("click", function () {
      if(isNaN(btn.value))
        getItems(btn.value,true);
  });
});

document.getElementById("newFolderBtn").addEventListener("click", function () {
  AddFolder();
});


  
}



