
    $(".burger-form").on("submit", function (event) {

        event.preventDefault();
        let burger_name = $("#burgerOrder").val().trim();
        if (burger_name != "") {
            let burgerOrder = {
                burger_name: $("#burgerOrder").val().trim(),
                devoured: 0
            };
    
            // Send the POST request.
            $.ajax("/api/burgers", {
                type: "POST",
                data: burgerOrder
            }).then(function () {
                location.reload();
            });
           
        }
        else {
            alert("Please enter a burger!")
        }

    });
