
class Game {
    constructor() {
        // none: game stoped. not playing
        // present: game working. presenting new pattern
        // play: player's turn to play
        this.state = "none";

        // count shows how many steps game has
        this.count = 0;

        //strict mode: 
        //true is open, if player failures game over.
        //false is closed, if player failures game presents again
        this.strict = false;

        //pattern holds game data which is presented and will be presented
        this.pattern = [];

        // userPatterns holds player try.
        this.userPattern = [];

        // match colors with numbers which is easier to work with.
        this.colors =
            {
                "0": "green",
                "1": "red",
                "2": "blue",
                "3": "yellow"
            };

        this.colorsReverse =
            {
                "green": "0",
                "red": "1",
                "blue": "2",
                "yellow": "3"
            };

        this.sounds =
            [
                new Sound("sounds/simonSound1.mp3", 100, true),
                new Sound("sounds/simonSound2.mp3", 100, true),
                new Sound("sounds/simonSound3.mp3", 100, true),
                new Sound("sounds/simonSound4.mp3", 100, true),
                new Sound("sounds/error.mp3", 100, true)
            ];

        //time in ms for presenting each step.
        this.time = 1300;
    }


    //start a fresh game
    start() {
        this.count = 0;
        this.pattern = [];
        this.userPattern = [];
        this.state = "present";
        var randomColor = Math.floor(Math.random() * 4);
        this.addStep(this.colors[randomColor]);
        this.present();
    }

    //play it all
    present() {
        var timer;
        var i = 0;
        timer = setInterval(() => {
            var element = this.pattern[i];
            var quarterName = "." + element;
            var className = element + "-active";
            $(quarterName).addClass(className);
            this.sounds[this.colorsReverse[element]].start();

            //Stop lighting and music
            setTimeout(this.stopPresenting, this.time / 2 - 10);
            i++;
            if (i === this.pattern.length) {
                clearInterval(timer);
                this.state = "play";
            }
        }, this.time);

        this.userPattern = [];
        $(".count").html(this.count).css("color", "white");
    }

    //add new step to pattern and update count
    addStep(color) {
        this.count = this.pattern.push(color)
        $(".count").html(this.count).css("color", "white");
    }

    play(color) {
        this.userPattern.push(color);
        var index = this.userPattern.length - 1;


        //everytime player adds new step, compare userPattern with pattern
        if (this.pattern[index] !== color) {
            this.error(() => {
                //reset game
                if (this.strict) {
                    this.stop();
                    this.start();
                } else {
                    //play last sequence
                    this.present();
                }
            });
        }

        //if it is correct, add one more step and play it.
        else if (index === this.pattern.length - 1) {
            if (this.count === 20) {
                this.victory(() => {
                    this.stop();
                    this.start();
                });
            } else {
                this.state = "present";
                var randomColor = Math.floor(Math.random() * 4);
                this.addStep(this.colors[randomColor]);
                this.present();
            }
        }
    }

    stop() {
        this.count = 0;
        $(".count").html(this.count).css("color", "white");
        this.pattern = [];
        this.userPattern = [];
        this.state = "none";
        this.stopPresenting();
    }

    stopPresenting() {
        $(".red").removeClass("red-active");
        $(".green").removeClass("green-active");
        $(".blue").removeClass("blue-active");
        $(".yellow").removeClass("yellow-active");

        // this.sounds[0].stop();
        // this.sounds[1].stop();
        // this.sounds[2].stop();
        // this.sounds[3].stop();
    }

    error(callback) {
        var wait = 200;
        var delay = 100;
        var i = 0;
        $(".count").html("!!!").css("color", "red")
            .fadeOut(wait).delay(delay).fadeIn(wait).delay(delay)
            .fadeOut(wait).delay(delay).fadeIn(wait);

        this.sounds[4].start();

        $(".red").addClass("red-active");
        $(".green").addClass("green-active");
        $(".blue").addClass("blue-active");
        $(".yellow").addClass("yellow-active");

        setTimeout(() => {
            this.stopPresenting();
            callback();
        }, 900);
    }

    victory(callback) {
        var wait = 200;
        var delay = 100;
        var i = 0;
        $(".count").html(":)").css("color", "green")
            .fadeOut(wait).delay(delay).fadeIn(wait).delay(delay)
            .fadeOut(wait).delay(delay).fadeIn(wait);

        this.sounds[0].start();
        this.sounds[1].start();
        this.sounds[2].start();
        this.sounds[3].start();

        $(".red").addClass("red-active");
        $(".green").addClass("green-active");
        $(".blue").addClass("blue-active");
        $(".yellow").addClass("yellow-active");

        setTimeout(() => {
            this.stopPresenting();
            callback();
        }, 900);
    }
}