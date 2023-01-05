window.onload = function(){

    document.getElementById("btn").addEventListener("click", CreateItemCard);
    document.getElementById("btn2").addEventListener("click", CreateItemLogin);
    document.getElementById("btn3").addEventListener("click", CreateItemNote);

    
    function CreateItemCard(){
        $.ajax({
            type: "POST",
            url: "api.php/ItemCard",
            data: {
                action: "AddItem",
                number: 5400000000000000,
                term: "2012-01-01",
                cvv: 123
            },
            success: function(data) {
                console.log(data);
                if(data == "Item Creation Failed")
                    alert("Item Creation Failed");
            }
        })
    }

    function CreateItemLogin(){
        $.ajax({
            type: "POST",
            url: "api.php/ItemLogin",
            data: {
                action: "AddItem",
                username: "username",
                password: "password",
                uri: "uri"
            },
            success: function(data) {
                console.log(data);
                if(data == "Item Creation Failed")
                    alert("Item Creation Failed");
            }
        })
    }

    function CreateItemNote(){
        $.ajax({
            type: "POST",
            url: "api.php/ItemNote",
            data: {
                action: "AddItem",
                name: "name",
                text: "dasdasdas"
            },
            success: function(data) {
                console.log(data);
                if(data == "Item Creation Failed")
                    alert("Item Creation Failed");
            }
        })
    }
/*
    function ShowItem(){
        $.ajax({
            type: "GET",
            url: "api.php",
            data: {
                action: "ShowItem"
            },
            success: function(data) {
                console.log("Done.");
            }
        })
    };
 */
}