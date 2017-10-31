var game = new Game();

// $(document).ready(function(){
//     game.sounds[0].start()
// })

$(".green").on("mousedown", function () {
    if (game.state === "play") {
        $(this).addClass("green-active");
        game.sounds[game.colorsReverse["green"]].start();
    }
});
$(".green").on("mouseup", function () {
    $(this).removeClass("green-active");
    game.sounds[game.colorsReverse["green"]].stop();

    if (game.state === "play") {
        game.play("green")
    }
});


$(".red").on("mousedown", function () {
    if (game.state === "play") {
        $(this).addClass("red-active");
        game.sounds[game.colorsReverse["red"]].start();
    }
});
$(".red").on("mouseup", function () {
    if (game.state === "play") {
        $(this).removeClass("red-active");
        game.sounds[game.colorsReverse["red"]].stop();
        game.play("red")
    }
});


$(".blue").on("mousedown", function () {
    if (game.state === "play") {
        $(this).addClass("blue-active");
        game.sounds[game.colorsReverse["blue"]].start();
    }
});
$(".blue").on("mouseup", function () {
    if (game.state === "play") {
        $(this).removeClass("blue-active");
        game.sounds[game.colorsReverse["blue"]].stop();
        game.play("blue")
    }
});


$(".yellow").on("mousedown", function () {
    if (game.state === "play") {
        $(this).addClass("yellow-active");
        game.sounds[game.colorsReverse["yellow"]].start();
    }
});
$(".yellow").on("mouseup", function () {
    if (game.state === "play") {
        $(this).removeClass("yellow-active");
        game.sounds[game.colorsReverse["yellow"]].stop();
        game.play("yellow")
    }
});

$(".start").click(function () {
    if (game.state === "none") {
        game.start();
        $(this).css("color", "#F00");
    } else {
        game.stop();
        $(this).css("color", "#FFF");
    }
});

$(".strict").click(function () {
    if (game.strict) {
        game.strict = false;
        $(this).css("color", "#FFF");
    } else {
        game.strict = true;
        $(this).css("color", "#F00");
    }
});


// $(".count").html(game.count);