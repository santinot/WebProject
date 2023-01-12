function generateTable(data) {
   // creates a <table> element and a <tbody> element
  const tbl = document.getElementById("loginTable");
  tbl.innerHTML = "";
  const tblHead = document.createElement("thead");
  const tblBody = document.createElement("tbody");

  const row = document.createElement("tr");
  const cell = document.createElement("th");

  const cellText = document.createTextNode("CARTELLA");
  cell.appendChild(cellText);
  row.appendChild(cell);
  const cell2 = document.createElement("th");
  const cellText2 = document.createTextNode("URI");
  cell2.appendChild(cellText2);
  row.appendChild(cell2);
  const cell3 = document.createElement("th");
  const cellText3 = document.createTextNode("USERNAME");
  cell3.appendChild(cellText3);
  row.appendChild(cell3);
  const cell4 = document.createElement("th");
  const cellText4 = document.createTextNode("PASSWORD");
  cell4.appendChild(cellText4);
  row.appendChild(cell4);

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
      const cellText2 = document.createTextNode(data[i]['uri']);
      cell2.appendChild(cellText2);
      row.appendChild(cell2);
      const cell3 = document.createElement("td");
      const cellText3 = document.createTextNode(data[i]['username']);
      cell3.appendChild(cellText3);
      row.appendChild(cell3);
      const cell4 = document.createElement("td");
      const cellText4 = document.createTextNode(data[i]['password']);
      cell4.appendChild(cellText4);
      row.appendChild(cell4);
      
  
      // add the row to the end of the table body
      tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  document.getElementById('division').appendChild(tbl);
  // sets the border attribute of tbl to '2'
  tbl.setAttribute("border", "2");
  tbl.setAttribute("id", "loginTable");
  tbl.classList.add("myTable");
  }

window.onload = function() {
  document.getElementById("loginBtn").addEventListener("click", function() {
    $.ajax({
        type: "GET",
        url: "api.php/ItemLogin",
        success: function(data) {
            var data = JSON.parse(data);
            console.log(data);
            generateTable(data);
        },
        error: function(data) {
            console.log(data, "error");
        }
    });
  });



}
