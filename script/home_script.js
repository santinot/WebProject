function generateTable(data,tbl,tblBody) {
    // creates a <table> element and a <tbody> element
  
    // creating all cells
    for (let i = 0; i < data.lenght; i++) {
      // creates a table row
      const row = document.createElement("tr");
  
      for (let j = 0; j < data.lenght; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        const cell = document.createElement("td");
        const cellText = document.createTextNode(data[i]['username']);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
  
      // add the row to the end of the table body
      tblBody.appendChild(row);
    }
  
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.body.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("border", "2");
  }

window.onload = function() {

    $.ajax({
        type: "GET",
        url: "api.php/ItemLogin",
        success: function(data) {
            var data = JSON.parse(data);
            console.log(data);
             // creates a <table> element and a <tbody> element
            const tbl = document.createElement("table");
            const tblBody = document.createElement("tbody");

            // creating all cells
            for (let i = 0; i < data.length; i++) {
                // creates a table row
                const row = document.createElement("tr");

                
                const cell = document.createElement("td");
                const cellText = document.createTextNode(data[i]['username']);
                cell.appendChild(cellText);
                row.appendChild(cell);
                const cell2 = document.createElement("td");
                const cellText2 = document.createTextNode(data[i]['password']);
                cell2.appendChild(cellText2);
                row.appendChild(cell2);
                const cell3 = document.createElement("td");
                const cellText3 = document.createTextNode(data[i]['uri']);
                cell3.appendChild(cellText3);
                row.appendChild(cell3);
                
            

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

        },
        error: function(data) {
            console.log(data, "error");
        }
    });



}
