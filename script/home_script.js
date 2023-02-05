//Ottenimento dati dal database da mostrare nella tabella e relativa creazione
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
      CreateTableItems(data,btn.replace("Item",""));
    },
    error: function (data) {
      console.log(data, "error");
    }
  });
}
//Creazione tabella con i dati contenuti nel database
function CreateTableItems(data,key,bool = true){
  var values = {"Login":['name','uri','username','password'],
                "Card":['name','number','term','cvv'],
                "Note":['name','title','text']
              };
  var headers ={"Login":['Cartella','URI','Username','Password'],
                "Card":['Cartella','Numero','Scadenza','CVV'],
                "Note":['Cartella','Nome','Testo']
              };
  if(bool){
    document.getElementById("myTable").innerHTML = "";
    if(p = document.getElementById("index"))
        p.remove();
  }
  var tbl = document.getElementById("myTable");
  var tblHead2 = document.createElement("thead");
  var rowHead2 = document.createElement("tr");
  
  tblHead2.classList.add("myTableHead");
  tbl.appendChild(tblHead2);
  tblHead2.appendChild(rowHead2);
  
  var tblHead = document.createElement("thead");
  var rowHead = document.createElement("tr");
  
  tblHead.classList.add("myTableHead");
  tbl.appendChild(tblHead);
  tblHead.appendChild(rowHead);

  var cellHead2 = document.createElement("th");
  var cellHeadText2 = document.createTextNode(key);
  cellHead2.appendChild(cellHeadText2);
  rowHead2.appendChild(cellHead2);

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
      if ([headers[key][j]] == "Password"){
        var input = document.createElement("input");
        input.setAttribute("readonly","readonly");
        input.setAttribute("type","password");
        input.setAttribute("size","7");
        input.setAttribute("value",data[i][values[key][j]]);
        cell.appendChild(input);

        input.addEventListener("click", function(){
          if(this.getAttribute("type") == "text")
            this.setAttribute("type","password"); 
          else
            this.setAttribute("type","text"); 
        });
      }else{
        cell.appendChild(document.createTextNode(data[i][values[key][j]]));
      }
      row.appendChild(cell);
      if(j == (values[key].length)-1){
        var icon = document.createElement("img");
        icon.setAttribute("src","img/trash.svg");
        icon.classList.add("bi","mx-2","trashItem");
        icon.setAttribute("id",data[i].ID);
        icon.setAttribute("role","button");
        icon.setAttribute("value","Item" + key);
        icon.setAttribute("title","Elimina Elemento");
        row.appendChild(icon);

        icon.addEventListener("click", function () {
          if(confirm("Sei sicuro di voler eliminare l'elemento? Non potrai più recuperarlo"))
            DeleteItem(icon.getAttribute("value"), icon.id);
        });
      }
    }
    tblBody.appendChild(row);
  }
}
//Ottenimento cartelle da mostrare nella home page
function getFolders() {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: "api.php/Folders",
      success: function (data) {
        if (data == "[]") {
          alert("Nessuna cartella presente");
          reject(data);
        }
        var data = JSON.parse(data);
        console.log(data);
        CreateFolderBox(data);
        resolve(data);
      },
      error: function (data) {
        console.log(data, "error");
        reject(data);
      }
    });
  });
}
//Creazione del box che contiene le cartelle nella home page ottenute tramite la funzione getFolders
function CreateFolderBox(data){
  var ul = document.getElementById("folderBox");
  
  for(var i = 0; i < data.length; i++){
    var li = document.createElement("li");
    var btn = document.createElement("button");


    li.classList.add("list-group-item");
    li.innerHTML = "<img src='img/trash.svg' class='bi mx-2 trash' title='Elimina Cartella' role='button' id='" + data[i].ID + "'>";
    btn.classList.add("btn","btn-outline-dark","folderTableBtn");
    btn.setAttribute("id",data[i].name + "Btn");
    btn.value = data[i].ID;
    btn.innerHTML = "<img src='img/archive.svg' class='bi mx-2'>" + data[i].name;

    ul.appendChild(li);
    li.appendChild(btn);
    li.appendChild(btn);

    btn.addEventListener("click", function () {
      document.getElementById("myTable").innerHTML = "";
      if(p = document.getElementById("index"))
        p.remove();
      var p = document.createElement("p");
      p.setAttribute("id","index");
      p.innerHTML = "Cartella: " + this.innerHTML.replace("<img src='img/archive.svg' class='bi mx-2'>","");
      document.getElementById("division").append(p);
      getFolderItems(this.value, "ItemLogin",false);
      getFolderItems(this.value, "ItemCard", false);
      getFolderItems(this.value, "ItemNote",false);
    });
  }
}  
//Ottenimento valori di una tabella specifica
function getFolderItems(value, key, bool = true){
  $.ajax({
    type: "GET",
    url: "api.php/FolderItems/" + value + "/" + key,
    success: function (data) {
      console.log(data);
      var data = JSON.parse(data);
      if (data == "")
        return;
      else
        CreateTableItems(data, key.replace("Item",""), bool);
    },
    error: function (data) {
      console.log(data, "error");
    }
  });
}
//Creazione di una nuova cartella
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
//Eliminazione di una cartella specifica
function DeleteFolder(id){
  $.ajax({
    type: "DELETE",
    url: "api.php/Folders/" + id,
    success: function (data) {
      console.log(data);
      if(data.search("Delete Successful") != -1 ){
        alert("Cartella eliminata");
        window.location.reload();
      }else if (data.search("Impossibile") != -1 )
        alert("Impossible eliminare la cartella di Default");
      else
        alert("Errore");
    },
    error: function (data) {
      console.log(data, "error");
    }
  });
}
//Eliminazione di un elemento specifico
function DeleteItem(table, id){
  $.ajax({
    type: "DELETE",
    url: "api.php/" + table + "/" + id,
    success: function (data) {
      console.log(data);
      if(data.search("Delete Successful") != -1 ){
        alert("Elemento eliminato");
        window.location.reload();
      }else
        alert("Errore");
    },
    error: function (data) {
      console.log(data, "error");
      
    }
  });
}

window.onload = function () {
  /*
  Causa richiesta asincrona, si attende quando la richiesta è completata per poter eseguire il click del bottone di default
  e per poter aggiungere gli eventi ai bottoni di eliminazione
  */
  getFolders().then(function () {
    document.getElementById("DefaultBtn").click();

    Array.from(document.getElementsByClassName("trash")).forEach(function (btn) {
      btn.addEventListener("click", function () {
        if(confirm("Sei sicuro di voler eliminare la cartella? Tutti gli elementi contenuti verranno perduti"))
          DeleteFolder(btn.id);
      });
    });
  });
  //Aggiunta degli eventi ai bottoni per la creazione di una nuova cartella e per la visualizzazione
  Array.from(document.getElementsByClassName("tableBtn")).forEach(function (btn) {
    btn.addEventListener("click", function () {
      getItems(btn.value);
    });
  });
  //Aggiunta dell'evento al bottone per la creazione di una nuova cartella
  document.getElementById("newFolderBtn").addEventListener("click", function () {
    AddFolder();
  });
};

