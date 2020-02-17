$(function () {
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

    $(".devourBurger").on("click", function (event) {
        event.preventDefault();

        var id = $(this).data("id");
        var devouredState = {
            devoured: 1
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devouredState
        }).then(function () {
            console.log("Burger devoured");
            location.reload();
        });
    });

});