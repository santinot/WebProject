function CreateItemCard(){
        var num = document.getElementById("inputNumber").value;
        var term = document.getElementById("inputTerm").value;
        var cvv = document.getElementById("inputCvv").value;
        var folder = document.getElementById("folder").value;
        if (num == "" || term == "" || cvv == "" || folder == ""){
            alert("Compila tutti i campi");
            return;
        }else{
            $.ajax({
                type: "POST",
                url: "api.php/ItemCard",
                data: {
                    action: "AddItem",
                    number: num,
                    term: term,
                    cvv: cvv,
                    ID_Folder: folder
                },
                success: function(data) {
                    console.log(data);
                    alert("Carta aggiunta");
                    window.location.reload();
                },
                error: function(data){
                    console.log(data);
                    alert("Errore");
                }
            });
        }
    };

    function CreateItemLogin(){
        var user = document.getElementById("inputUsername").value;
        var pass = document.getElementById("inputpassword").value;
        var uri = document.getElementById("inputUri").value;
        var folder = document.getElementById("folder").value;
        if (user == "" || pass == "" || uri == "" || folder == ""){
            alert("Compila tutti i campi");
            return;
        }else{
            $.ajax({
                type: "POST",
                url: "api.php/ItemLogin",
                data: {
                    action: "AddItem",
                    username: user,
                    password: pass,
                    uri: uri,
                    ID_Folder: folder
                },
                success: function(data) {
                    console.log(data);
                    alert("Login aggiunto");
                    window.location.reload();
                },
                error: function(data){
                    console.log(data);
                    alert("Errore");
                }
            });
        }
    };

    function CreateItemNote(){
        var name = document.getElementById("inputName").value;
        var text = document.getElementById("inputNota").value;
        var folder = document.getElementById("folder").value;
        if (name == "" || text == "" || folder == ""){
            alert("Compila tutti i campi");
            return;
        }else{
            $.ajax({
                type: "POST",
                url: "api.php/ItemNote",
                data: {
                    action: "AddItem",
                    name: name,
                    text: text,
                    ID_Folder: folder
                },
                success: function(data) {
                    console.log(data);
                    alert("Nota aggiunta");
                    window.location.reload();
                },
                error: function(data){
                    console.log(data);
                    alert("Errore");
                }
            });
        }
    };

    function TemplateLogin(){
        var box = document.getElementById('box');

        var labelUsername = document.createElement('label');
        labelUsername.innerHTML = 'Username';
        box.appendChild(labelUsername);

        var inputUsername = document.createElement('input');
        inputUsername.setAttribute('type', 'text');
        inputUsername.setAttribute('id', 'inputUsername');
        inputUsername.setAttribute('class', 'form-control');
        inputUsername.setAttribute('maxlength', '40');
        box.appendChild(inputUsername);

        var row2 = document.createElement('div');
        row2.classList.add('row', 'align-items-end');
        box.appendChild(row2);

        var col = document.createElement('div');
        col.classList.add('col');
        row2.appendChild(col);

        var labelPassword = document.createElement('label');
        labelPassword.innerHTML = 'Password';
        col.appendChild(labelPassword);

        var inputpassword = document.createElement('input');
        inputpassword.setAttribute('type', 'password');
        inputpassword.setAttribute('id', 'inputpassword');
        inputpassword.setAttribute('class', 'form-control');
        inputpassword.setAttribute('maxlength', '40');
        col.appendChild(inputpassword);

        var checkPassword = document.createElement('div');
        checkPassword.classList.add('col-4');
        row2.appendChild(checkPassword);

        var check = document.createElement('input');
        check.setAttribute('type', 'checkbox');
        check.setAttribute('id', 'showPass');
        check.classList.add('form-check-input');
        checkPassword.appendChild(check);

        var labelCheck = document.createElement('label');
        labelCheck.classList.add('form-check-label', 'mx-2');
        labelCheck.innerHTML = 'Mostra Password';
        checkPassword.appendChild(labelCheck);

        var labelUri = document.createElement('label');
        labelUri.innerHTML = 'URI';
        box.appendChild(labelUri);

        var inputUri = document.createElement('input');
        inputUri.setAttribute('type', 'text');
        inputUri.setAttribute('id', 'inputUri');
        inputUri.setAttribute('class', 'form-control');
        inputUri.setAttribute('maxlength', '30');
        box.appendChild(inputUri);

        var labelFolder = document.createElement('label');
        labelFolder.innerHTML = 'Cartella';
        box.appendChild(labelFolder);

        var selectFolder = document.createElement('select');
        selectFolder.setAttribute('id', 'folder');
        selectFolder.setAttribute('class', 'form-select');
        selectFolder.setAttribute('aria-label', '.form-select-lg example');
        box.appendChild(selectFolder);

        var row3 = document.createElement('div');
        row3.classList.add('row', 'justify-content-between');
        box.appendChild(row3);

        var col1 = document.createElement('div');
        col1.classList.add('col-4');
        row3.appendChild(col1);

        var btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.setAttribute('id', 'sendBtn');
        btn.classList.add('btn', 'btn-success', 'mt-3');
        btn.innerHTML = 'Inserisci';
        col1.appendChild(btn);

        document.getElementById('showPass').addEventListener('click',function(){
            if (document.getElementById('showPass').checked == true) 
                document.getElementById('inputpassword').type = 'text';
            else
               document.getElementById('inputpassword').type = 'password';
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

    }

    function TemplateCard(){
        var box = document.getElementById('box');

        var labelNumber = document.createElement('label');
        labelNumber.innerHTML = 'Numero Carta';
        box.appendChild(labelNumber);

        var inputNumber = document.createElement('input');
        inputNumber.setAttribute('type', 'text');
        inputNumber.setAttribute('id', 'inputNumber');
        inputNumber.setAttribute('class', 'form-control');
        inputNumber.setAttribute('maxlength', '16');
        box.appendChild(inputNumber);

        var row2 = document.createElement('div');
        row2.classList.add('row', 'align-items-end');
        box.appendChild(row2);

        var col = document.createElement('div');
        col.classList.add('col');
        row2.appendChild(col);

        var labelTerm = document.createElement('label');
        labelTerm.innerHTML = 'Scadenza';
        col.appendChild(labelTerm);

        var inputTerm = document.createElement('input');
        inputTerm.setAttribute('type', 'text');
        inputTerm.setAttribute('id', 'inputTerm');
        inputTerm.setAttribute('class','form-control');
        inputTerm.setAttribute('placeholder', 'MM/YY');
        inputTerm.setAttribute('maxlength', '5');
        inputTerm.setAttribute('size', '5');
        col.appendChild(inputTerm);

        var labelCvv = document.createElement('label');
        labelCvv.innerHTML = 'CVV';
        box.appendChild(labelCvv);

        var inputCvv = document.createElement('input');
        inputCvv.setAttribute('type', 'text');
        inputCvv.setAttribute('id', 'inputCvv');
        inputCvv.setAttribute('class', 'form-control');
        inputCvv.setAttribute('maxlength', '3');
        box.appendChild(inputCvv);

        var labelFolder = document.createElement('label');
        labelFolder.innerHTML = 'Cartella';
        box.appendChild(labelFolder);

        var selectFolder = document.createElement('select');
        selectFolder.setAttribute('id', 'folder');
        selectFolder.setAttribute('class', 'form-select');
        selectFolder.setAttribute('aria-label', '.form-select-lg example');
        box.appendChild(selectFolder);

        var row3 = document.createElement('div');
        row3.classList.add('row', 'justify-content-between');
        box.appendChild(row3);

        var col1 = document.createElement('div');
        col1.classList.add('col-4');
        row3.appendChild(col1);

        var btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.setAttribute('id', 'sendBtn');
        btn.classList.add('btn', 'btn-success', 'mt-3');
        btn.innerHTML = 'Inserisci';
        col1.appendChild(btn);

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
    }

    function TemplateNote(){
        var box = document.getElementById('box');

        var labelName = document.createElement('label');
        labelName.innerHTML = 'Nome Nota';
        box.appendChild(labelName);

        var inputName = document.createElement('input');
        inputName.setAttribute('type', 'text');
        inputName.setAttribute('id', 'inputName');
        inputName.setAttribute('class', 'form-control');
        inputName.setAttribute('maxlength', '30');
        box.appendChild(inputName);

        var labelNota = document.createElement('label');
        labelNota.innerHTML = 'Contenuto Nota';
        box.appendChild(labelNota);

        var inputNota = document.createElement('textarea');
        inputNota.setAttribute('id', 'inputNota');
        inputNota.setAttribute('class', 'form-control');
        inputNota.setAttribute('rows', '3');
        inputNota.setAttribute('maxlength', '200');
        inputNota.setAttribute('placeholder', 'Inserisci il nome della nota');
        box.appendChild(inputNota);

        var labelFolder = document.createElement('label');
        labelFolder.innerHTML = 'Cartella';
        box.appendChild(labelFolder);

        var selectFolder = document.createElement('select');
        selectFolder.setAttribute('id', 'folder');
        selectFolder.setAttribute('class', 'form-select');
        selectFolder.setAttribute('aria-label', '.form-select-lg example');
        box.appendChild(selectFolder);

        var row3 = document.createElement('div');
        row3.classList.add('row', 'justify-content-between');
        box.appendChild(row3);

        var col1 = document.createElement('div');
        col1.classList.add('col-4');
        row3.appendChild(col1);

        var btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.setAttribute('id', 'sendBtn');
        btn.classList.add('btn', 'btn-success', 'mt-3');
        btn.innerHTML = 'Inserisci';
        col1.appendChild(btn);

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
    }

    window.onload = function(){

    document.getElementById('selectItem').addEventListener('change', function(){
        document.getElementById('box').removeAttribute('hidden');
        if(this.value === 'Login'){
           document.getElementById('box').innerHTML = '';
           TemplateLogin
    ();

        }else if(this.value === 'Card'){
            document.getElementById('box').innerHTML = '';
            TemplateCard();

        }else if(this.value === 'Note'){
            document.getElementById('box').innerHTML = '';
            TemplateNote();

        }else{
            document.getElementById('box').setAttribute('hidden', 'hidden' );
        }

        document.getElementById('sendBtn').addEventListener('click', function(){
            if(document.getElementById('selectItem').value === 'Login')
                CreateItemLogin();                
            else if(document.getElementById('selectItem').value === 'Card')
                CreateItemCard();
            else if(document.getElementById('selectItem').value === 'Note')
                CreateItemNote();
            
        });
    });
}

