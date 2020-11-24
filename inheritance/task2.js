function Builder(value) {
    this.value = value;
}

Builder.prototype.get = function () {
    return this.value;
}

function IntBuilder(value) {
    Builder.call(this, value);

    if (value === undefined || value === null) {
        this.value = 0;
    }
}

IntBuilder.prototype = Object.create(Builder.prototype);
IntBuilder.prototype.constructor = IntBuilder;

IntBuilder.prototype.plus = function (...args) {
    let sum = 0;

    args.forEach(arg => {
        sum += arg;
    })

    this.value += sum;

    return this;
}

IntBuilder.prototype.minus = function (...args) {
    let substract = 0;

    args.forEach(arg => {
        substract += arg;
    })

    this.value -= substract;

    return this;
}

IntBuilder.prototype.multiply = function (param) {
    this.value *= param;


    return this;
}

IntBuilder.prototype.divide = function (param) {
    this.value = Math.floor(this.value / param);

    return this;
}

IntBuilder.prototype.mod = function (param) {
    const resultOfDivision = Math.floor(this.value / param);

    const resultWithRoundedValue = resultOfDivision * param;

    this.value -= resultWithRoundedValue;

    return this;
}

IntBuilder.random = function (from, to) {
    return Math.floor(from + Math.random() * (to + 1 - from));
}

class StringBuilder extends Builder {
    constructor(value) {
        super(value);

        if (value === undefined || value === null) {
            this.value = '';
        }
    }

    plus(...strings) {
        let newString = '';

        for (let i = 0; i < strings.length; i++) {
            newString += strings[i] + '';
        }

        this.value += newString;

        return this;
    }

    minus(amount) {
        this.value = this.value.slice(-this.value.length, -amount);

        return this;
    }

    multiply(amount) {
        this.value += ' ';

        const newString = this.value.repeat(amount);

        this.value = newString.trimRight();

        return this;
    }

    divide(amount) {
        const k = Math.floor(this.value.length / amount);

        this.value = this.value.slice(-this.value.length, k);

        return this;
    }

    remove(str) {
        if (this.value.includes(str)) {
            let newString = '';

            const symbolsArr = this.value.split(str);

            symbolsArr.forEach(el => {
                newString += el;
            })

            this.value = newString;

            return this;
        } else {
            console.log(`No "${str}" substring found in stored string`);
        }
    }

    sub(from, length) {
        this.value = this.value.substr(from, length);

        return this;
    }
}

const int = new IntBuilder(15);
const str = new StringBuilder('Hello');

console.log(`Default int value: ${int.get()}`);
console.log(`Default str value: ${str.get()}`);