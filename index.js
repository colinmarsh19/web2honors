$(document).ready(function() {
    let isOpen = false;

    $("#showModal").on('click', function(){
        $("html").css("overflow-y", "hidden");
    });

    $(".closeModal").on('click', function(){
        $("html").css("overflow-y", "auto");
    });

    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        console.log('data returned:', xhr.response);
        for (let owner of xhr.response.data.owners){
            $("#ownerList").append("<li><a class='ownerLink' id="+owner.id+" href='#'>"
                +owner.name+"</a></li>");
        }
    };
    xhr.send(JSON.stringify({query: "{ owners { name" +
        " id } }"}));

    $("#showAll").click(function() {
        if (isOpen == false) {
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open("POST", "/graphql");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.onload = function () {
                for (let owner of xhr.response.data.owners)
                {
                    let a_tag = $("#"+owner.id);
                    let count = owner.dogs.length;
                    for (let dog of owner.dogs) {
                        a_tag.after("<ul>" +
                            "<li>Dog "+count+": "+dog.name+"</li><ul>" +
                            "<li>Age: "+dog.age+"</li>"+
                            "<li>Has Shots: "+dog.has_shots+"</li>"+
                            "</ul></ul>");
                        count -= 1;
                    }
                    a_tag.after("<ul>" +
                        "<li>Address: "+owner.address+"</li>"+
                        "<li>Phone: "+owner.phone+"</li></ul>");
                }
            };
            xhr.send(JSON.stringify({query: `{
                    owners {
                        id
                        address
                        phone
                        dogs {
                            name
                            age
                            breed
                            has_shots
                        }
                    }
                }`}));
            $("#showAll").text("Collapse All");
            isOpen = true;
        } else {
            $(document).find("ul").children("li").children("ul").remove();
            $("#showAll").text("Show All");
            isOpen = false;
        }

    });

    $(document).on("click", "a", function(){
        let a_tag = $(this);
        if ($(this).closest("li").children("ul").length == 0) {
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open("POST", "/graphql");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.onload = function () {
                let owner = xhr.response.data.owners[0];
                let count = owner.dogs.length;
                for (let dog of owner.dogs) {
                    a_tag.after("<ul>" +
                        "<li>Dog "+count+": "+dog.name+"</li><ul>" +
                        "<li>Age: "+dog.age+"</li>"+
                        "<li>Has Shots: "+dog.has_shots+"</li>"+
                        "</ul></ul>");
                    count -= 1;
                }
                a_tag.after("<ul>" +
                    "<li>Address: "+owner.address+"</li>"+
                    "<li>Phone: "+owner.phone+"</li></ul>");
            };
            xhr.send(JSON.stringify({query: `{
                    owners(id:`+a_tag.attr('id')+`) {
                        address
                        phone
                        dogs {
                            name
                            age
                            breed
                            has_shots
                        }
                    }
                }`}));
            $("#showAll").text("Collapse All");
            isOpen = true;
        } else {
            $(this).closest("li").children("ul").remove();
        }
    });

    // Used to toggle the menu on small screens when clicking on the menu button
    function myFunction() {
        var x = document.getElementById("navDemo");
        if (x.className.indexOf("w3-show") == -1) {
            x.className += " w3-show";
        } else {
            x.className = x.className.replace(" w3-show", "");
        }
    }
});