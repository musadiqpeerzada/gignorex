class Logger {
    static colors = {
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        white: "\x1b[37m",
        reset: "\x1b[0m",
    };

    static log(message, color) {
        console.log(`${this.colors[color]}${message}${this.colors.reset}`);
    }

    static error(message) {
        this.log(message, 'red');
    }

    static success(message) {
        this.log(message, 'green');
    }

    static warn(message) {
        this.log(message, 'yellow');
    }

    static info(message) {
        this.log(message, 'white');
    }
}

module.exports = Logger;