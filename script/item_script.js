window.onload = function(){

    document.getElementById("btn").addEventListener("click", CreateItem);
    
    function CreateItem(){
        $.ajax({
            type: "POST",
            url: "api.php/ItemCard",
            data: {
                action: "AddItemCard",
                number: 5400000000000000,
                term: "2012-01-01",
                cvv: 123
            },
            success: function(data) {
                console.log(data);
                if(data == "Item Created Failed")
                    alert("Item Created Failed");
            }
        })
    }
}