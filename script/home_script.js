function generateTable(data, headers) {
   // creates a <table> element and a <tbody> element
  const tbl = document.getElementById("myTable");
  tbl.innerHTML = "";
  const tblHead = document.createElement("thead");
  const tblBody = document.createElement("tbody");

  const row = document.createElement("tr");
  const cell = document.createElement("th");

  const cellText = document.createTextNode("Cartella");
  cell.appendChild(cellText);
  row.appendChild(cell);
  const cell2 = document.createElement("th");
  const cellText2 = document.createTextNode(headers.fLabel);
  cell2.appendChild(cellText2);
  row.appendChild(cell2);
  const cell3 = document.createElement("th");
  const cellText3 = document.createTextNode(headers.sLabel);
  cell3.appendChild(cellText3);
  row.appendChild(cell3);
  if(headers.tLabel != null){
    const cell4 = document.createElement("th");
    const cellText4 = document.createTextNode(headers.tLabel);
    cell4.appendChild(cellText4);
    row.appendChild(cell4);
  }

  tblHead.appendChild(row);
  tbl.appendChild(tblHead);

  tblHead.classList.add("myTableHead");


  // creating all cells
  for (let i = 0; i < data.length; i++) {
      // creates a table row
      const row = document.createElement("tr");

      
      const cell = document.createElement("td");
      const cellText = document.createTextNode(data[i]['name']);
      cell.appendChild(cellText);
      row.appendChild(cell);
      const cell2 = document.createElement("td");
      const cellText2 = document.createTextNode(data[i][headers.fValue]);
      cell2.appendChild(cellText2);
      row.appendChild(cell2);
      const cell3 = document.createElement("td");
      const cellText3 = document.createTextNode(data[i][headers.sValue]);
      cell3.appendChild(cellText3);
      row.appendChild(cell3);
      if(headers.tValue != null){
      const cell4 = document.createElement("td");
      const cellText4 = document.createTextNode(data[i][headers.tValue]);
      cell4.appendChild(cellText4);
      row.appendChild(cell4);
      }
  
      // add the row to the end of the table body
      tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  document.getElementById('division').appendChild(tbl);
  // sets the border attribute of tbl to '2'
  tbl.setAttribute("border", "2");
  tbl.classList.add("myTable");
}


 function getItems(btn, headers){
    $.ajax({
        type: "GET",
        url: "api.php/" + btn,
        success: function(data) {
          if(data == "[]"){
            alert("Nessun elemento presente");
            return;
          }
            var data = JSON.parse(data);
            console.log(data);
            generateTable(data, headers);
        },
        error: function(data) {
            console.log(data, "error");
        }
    });
  }

var loginHeaders = {fLabel:"URI", sLabel:"Username", tLabel:"Password", fValue:"uri", sValue:"username", tValue:"password"};
var cardHeaders = {fLabel:"Numero", sLabel:"Scadenza", tLabel:"CVV", fValue:"number", sValue:"term", tValue:"cvv"};
var noteHeaders = {fLabel:"Nome", sLabel:"Testo", tLabel:null, fValue:"title", sValue:"text", tValue:null};

window.onload = function() {
  document.getElementById("loginBtn").addEventListener("click",function(){
    getItems(document.getElementById("loginBtn").value, loginHeaders);
    



  });
  document.getElementById("cardBtn").addEventListener("click",function(){
    getItems(document.getElementById("cardBtn").value, cardHeaders);
  });
  document.getElementById("noteBtn").addEventListener("click",function(){
    getItems(document.getElementById("noteBtn").value, noteHeaders);
  });
}
