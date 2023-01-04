window.onload = function(){
    
    document.getElementById('selectItem').addEventListener('change', function(){
        document.getElementById('box').removeAttribute('hidden');
        if(this.value === 'Login'){
            document.getElementById('colPassCheck').removeAttribute('hidden', 'hidden');
            document.getElementById('textBox').setAttribute('hidden', 'hidden');
            document.getElementById('text2').removeAttribute('hidden', 'hidden');
            document.getElementById('input3').removeAttribute('hidden', 'hidden');
            document.getElementById('text3').removeAttribute('hidden', 'hidden');
            document.getElementById('text2').type = 'password';
            document.getElementById('input1').innerHTML = 'Username';
            document.getElementById('input2').innerHTML = 'Password';
            document.getElementById('input3').innerHTML = 'URI';
            document.getElementById('input4').innerHTML = 'Cartella';
        }else if(this.value === 'Card'){
            document.getElementById('colPassCheck').setAttribute('hidden', 'hidden');
            document.getElementById('textBox').setAttribute('hidden', 'hidden');
            document.getElementById('text2').removeAttribute('hidden', 'hidden');
            document.getElementById('text2').type = 'text';
            document.getElementById('input3').removeAttribute('hidden', 'hidden');
            document.getElementById('text3').removeAttribute('hidden', 'hidden');
            document.getElementById('input1').innerHTML = 'Numero della Carta';
            document.getElementById('input2').innerHTML = 'Scadenza';
            document.getElementById('input3').innerHTML = 'CVV';
            document.getElementById('input4').innerHTML = 'Cartella';

            document.getElementById('showPass').addEventListener('click',function(){
                if (document.getElementById('showPass').checked == true) 
                   document.getElementById('text2').type = 'text';
               else
                   document.getElementById('text2').type = 'password';
           });
        }else if(this.value === 'Note'){
            document.getElementById('colPassCheck').setAttribute('hidden', 'hidden');
            document.getElementById('text2').setAttribute ('hidden', 'hidden');
            document.getElementById('textBox').removeAttribute('hidden', 'hidden');
            document.getElementById('input3').setAttribute('hidden', 'hidden');
            document.getElementById('text3').setAttribute('hidden', 'hidden');
            document.getElementById('input1').innerHTML = 'Nome della Nota';
            document.getElementById('input2').innerHTML = 'Insersci il testo...';
            document.getElementById('input4').innerHTML = 'Cartella';
        }else{
            document.getElementById('box').setAttribute('hidden', 'hidden' );
        }

    });

    $.ajax({
        type: "GET",
        url: "api.php/Folders", 
        success: function(data) {
            ;
        },
        error: function(data) {
            alert("Error");
        }
    });


}
