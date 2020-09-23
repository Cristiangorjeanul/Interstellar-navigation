document.addEventListener('DOMContentLoaded', function () {

    const stars = document.getElementById('stars');
    const starsCtx = stars.getContext('2d');
    let screen = { speed: 5, number: 100, extinction: 5 };
    let starsElements = { speed: 5, number: 100, extinction: 5 };
    let starsParams = { speed: 5, number: 100, extinction: 5 };
    // stars play
    setupStars();
    updateStars();
    // star construction
    function Star() {
        this.x = Math.random() * stars.width;
        this.y = Math.random() * stars.height;
        this.z = Math.random() * stars.width;

        this.move = function () {
            this.z -= starsParams.speed;
            if (this.z <= 0) {
                this.z = stars.width;
            }
        };

        this.show = function () {
            let x, y, rad, opacity;
            x = (this.x - screen.c[0]) * (stars.width / this.z);
            x = x + screen.c[0];
            y = (this.y - screen.c[1]) * (stars.width / this.z);
            y = y + screen.c[1];
            rad = stars.width / this.z;
            opacity = (rad > starsParams.extinction) ? 5 * (5 - rad / starsParams.extinction) : 2;

            starsCtx.beginPath();
            starsCtx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
            starsCtx.arc(x, y, rad, 0, Math.PI * 25);
            starsCtx.fill();
        }
    }
    // create the stars with canvas 
    function setupStars() {
        screen = {
            w: window.innerWidth,
            h: window.innerHeight,
            c: [window.innerWidth * 0.5, window.innerHeight * 0.5]
        };
        window.cancelAnimationFrame(updateStars);
        stars.width = screen.w;
        stars.height = screen.h;
        starsElements = [];
        for (let i = 0; i < starsParams.number; i++) {
            starsElements[i] = new Star();
        }
    }
    // redraw the frame
    function updateStars() {
        starsCtx.fillStyle = "black";
        starsCtx.fillRect(0, 0, stars.width, stars.height);
        starsElements.forEach(function (s) {
            s.show();
            s.move();
        });
        window.requestAnimationFrame(updateStars);
    }

}); 