    window.onload = function(){

    function CreateItemCard(){
        var num = document.getElementById("text1").value;
        var term = document.getElementById("text2").value;
        var cvv = document.getElementById("text3").value;
        var folder = document.getElementById("folder").value;
        var star = 0;
        if (document.getElementById('favourite').checked == true) 
            var star = 1;
        $.ajax({
            type: "POST",
            url: "api.php/ItemCard",
            data: {
                action: "AddItem",
                number: num,
                term: term,
                cvv: cvv,
                ID_Folder: folder,
                star : star
            },
            success: function(data) {
                console.log(data);
                if(data == "Item Creation Failed")
                    alert("Item Creation Failed");
            }
        })
    };

    function CreateItemLogin(){
        var user = document.getElementById("text1").value;
        var pass = document.getElementById("text2").value;
        var uri = document.getElementById("text3").value;
        var folder = document.getElementById("folder").value;
        var star = 0;
        if (document.getElementById('favourite').checked == true) 
            var star = 1;
        $.ajax({
            type: "POST",
            url: "api.php/ItemLogin",
            data: {
                action: "AddItem",
                username: user,
                password: pass,
                uri: uri,
                ID_Folder: folder,
                star : star
            },
            success: function(data) {
                console.log(data);
                if(data == "Item Creation Failed")
                    alert("Item Creation Failed");
            }
        })
    };

    function CreateItemNote(){
        var name = document.getElementById("text1").value;
        var text = document.getElementById("textBox").value;
        var folder = document.getElementById("folder").value;
        var star = 0;
        if (document.getElementById('favourite').checked == true) 
            var star = 1;
        $.ajax({
            type: "POST",
            url: "api.php/ItemNote",
            data: {
                action: "AddItem",
                name: name,
                text: text,
                ID_Folder: folder,
                star : star
            },
            success: function(data) {
                console.log(data);
                if(data == "Item Creation Failed")
                    alert("Item Creation Failed");
            }
        })
    };


    document.getElementById('selectItem').addEventListener('change', function(){
        document.getElementById('box').removeAttribute('hidden');
        if(this.value === 'Login'){
            document.getElementById('text1').value = '';
            document.getElementById('text2').value = '';
            document.getElementById('text3').value = '';
            document.getElementById('colPassCheck').removeAttribute('hidden', 'hidden');
            document.getElementById('textBox').setAttribute('hidden', 'hidden');
            document.getElementById('text2').removeAttribute('hidden', 'hidden');
            document.getElementById('text2').type = 'password';
            document.getElementById('input3').removeAttribute('hidden', 'hidden');
            document.getElementById('text3').removeAttribute('hidden', 'hidden');
            document.getElementById('input1').innerHTML = 'Username';
            document.getElementById('input2').innerHTML = 'Password';
            document.getElementById('input3').innerHTML = 'URI';

        }else if(this.value === 'Card'){
            document.getElementById('text1').value = '';
            document.getElementById('text2').value = '';
            document.getElementById('text3').value = '';
            document.getElementById('colPassCheck').setAttribute('hidden', 'hidden');
            document.getElementById('textBox').setAttribute('hidden', 'hidden');
            document.getElementById('text2').type = 'text';
            document.getElementById('text2').removeAttribute('hidden', 'hidden');
            document.getElementById('input3').removeAttribute('hidden', 'hidden');
            document.getElementById('text3').removeAttribute('hidden', 'hidden');
            document.getElementById('input1').innerHTML = 'Numero della Carta';
            document.getElementById('input2').innerHTML = 'Scadenza';
            document.getElementById('input3').innerHTML = 'CVV';

        }else if(this.value === 'Note'){
            document.getElementById('text1').value = '';
            document.getElementById('textBox').value = '';
            document.getElementById('colPassCheck').setAttribute('hidden', 'hidden');
            document.getElementById('textBox').removeAttribute('hidden', 'hidden');
            document.getElementById('text2').setAttribute ('hidden', 'hidden');
            document.getElementById('input3').setAttribute('hidden', 'hidden');
            document.getElementById('text3').setAttribute('hidden', 'hidden');
            document.getElementById('input1').innerHTML = 'Nome della Nota';
            document.getElementById('input2').innerHTML = 'Insersci il testo...';
        }else{
            document.getElementById('box').setAttribute('hidden', 'hidden' );
        }

    });

    $.ajax({
        type: "GET",
        url: "api.php/Folders", 
        success: function(data) {
            
            data = JSON.parse(data);
            for(var i = 0; i < data.length; i++){
                var opt = document.createElement('option');
                opt.value = data[i].ID;
                opt.innerHTML = data[i].name;
                document.getElementById('folder').appendChild(opt);
            }
        }
    });

    document.getElementById('showPass').addEventListener('click',function(){
        if (document.getElementById('showPass').checked == true) 
            document.getElementById('text2').type = 'text';
        else
           document.getElementById('text2').type = 'password';
    });
    
    document.getElementById('sendBtn').addEventListener('click', function(){
        if(document.getElementById('selectItem').value === 'Login'){
            CreateItemLogin();
            alert("Credenziali inserite con successo");
            window.location.reload();
        }else if(document.getElementById('selectItem').value === 'Card'){
            CreateItemCard();
            alert("Carta inserita con successo");
            window.location.reload();
        }else if(document.getElementById('selectItem').value === 'Note'){
            CreateItemNote();
            alert("Nota creata con successo");
            window.location.reload();
        }
    });

    
}

