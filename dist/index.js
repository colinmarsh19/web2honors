"use strict";

$(document).ready(function () {
    var isOpen = false;

    $("#showModal").on('click', function () {
        $("html").css("overflow-y", "hidden");
    });

    $(".closeModal").on('click', function () {
        $("html").css("overflow-y", "auto");
    });

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        console.log('data returned:', xhr.response);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = xhr.response.data.owners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var owner = _step.value;

                $("#ownerList").append("<li><a class='ownerLink' id=" + owner.id + " href='#'>" + owner.name + "</a></li>");
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    };
    xhr.send(JSON.stringify({ query: "{ owners { name" + " id } }" }));

    $("#showAll").click(function () {
        if (isOpen == false) {
            var _xhr = new XMLHttpRequest();
            _xhr.responseType = 'json';
            _xhr.open("POST", "/graphql");
            _xhr.setRequestHeader("Content-Type", "application/json");
            _xhr.setRequestHeader("Accept", "application/json");
            _xhr.onload = function () {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = _xhr.response.data.owners[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var owner = _step2.value;

                        var a_tag = $("#" + owner.id);
                        var count = owner.dogs.length;
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = owner.dogs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var dog = _step3.value;

                                a_tag.after("<ul>" + "<li>Dog " + count + ": " + dog.name + "</li><ul>" + "<li>Age: " + dog.age + "</li>" + "<li>Has Shots: " + dog.has_shots + "</li>" + "</ul></ul>");
                                count -= 1;
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }

                        a_tag.after("<ul>" + "<li>Address: " + owner.address + "</li>" + "<li>Phone: " + owner.phone + "</li></ul>");
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            };
            _xhr.send(JSON.stringify({ query: "{\n                    owners {\n                        id\n                        address\n                        phone\n                        dogs {\n                            name\n                            age\n                            breed\n                            has_shots\n                        }\n                    }\n                }" }));
            $("#showAll").text("Collapse All");
            isOpen = true;
        } else {
            $(document).find("ul").children("li").children("ul").remove();
            $("#showAll").text("Show All");
            isOpen = false;
        }
    });

    $(document).on("click", "a", function () {
        var a_tag = $(this);
        if ($(this).closest("li").children("ul").length == 0) {
            var _xhr2 = new XMLHttpRequest();
            _xhr2.responseType = 'json';
            _xhr2.open("POST", "/graphql");
            _xhr2.setRequestHeader("Content-Type", "application/json");
            _xhr2.setRequestHeader("Accept", "application/json");
            _xhr2.onload = function () {
                var owner = _xhr2.response.data.owners[0];
                var count = owner.dogs.length;
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = owner.dogs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var dog = _step4.value;

                        a_tag.after("<ul>" + "<li>Dog " + count + ": " + dog.name + "</li><ul>" + "<li>Age: " + dog.age + "</li>" + "<li>Has Shots: " + dog.has_shots + "</li>" + "</ul></ul>");
                        count -= 1;
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                a_tag.after("<ul>" + "<li>Address: " + owner.address + "</li>" + "<li>Phone: " + owner.phone + "</li></ul>");
            };
            _xhr2.send(JSON.stringify({ query: "{\n                    owners(id:" + a_tag.attr('id') + ") {\n                        address\n                        phone\n                        dogs {\n                            name\n                            age\n                            breed\n                            has_shots\n                        }\n                    }\n                }" }));
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
//# sourceMappingURL=index.js.map