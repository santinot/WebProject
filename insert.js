window.onload = function() {
    document.getElementById("selection").addEventListener("change", change);

        function change() {
        var sel = document.getElementById("selection").value;
        console.log(sel);
        if (sel == 1){
            document.getElementById("element1").innerHTML = "Username";
            document.getElementById("element2").innerHTML = "Password";
            document.getElementById("element3").innerHTML = "URI";
        }else if (sel == 2){
            document.getElementById("element1").innerHTML = "Numero Carta";
        }else if (sel == 3){
            document.getElementById("element1").innerHTML = "Inserisci Testo";
        }
    }
}