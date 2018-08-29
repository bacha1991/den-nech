let inteval;

module.exports = {
    start: function() {
        var P = ["\\", "|", "/", "-"];
        var x = 0;

        inteval = setInterval(function() {
            process.stdout.write("\r" + P[x++]);
            x &= 3;
        }, 100);
    },
    stop: function() {
        clearInterval(inteval);
    }
}