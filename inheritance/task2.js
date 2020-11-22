function Builder(value) {
    this.value = value;
}

Builder.prototype.get = function () {
    return this.value;
}

// const instance = new Builder(10);

function IntBuilder(value) {
    Builder.call(this, value);
}

IntBuilder.prototype = Object.create(Builder.prototype);
IntBuilder.prototype.constructor = IntBuilder;

/* IntBuilder.prototype.constructor = function () {
    debugger;
    if (this.value === null || this.value === undefined) {
        this.value = 0;
    }

    Builder.prototype.constructor.call(this);
} */

IntBuilder.prototype.plus = function (...args) {
    let sum = 0;

    args.forEach(arg => {
        sum += arg;
    })

    const result = this.value + sum;

    this.value = result;

    return this.value;
}

IntBuilder.prototype.minus = function (...args) {
    let substract = 0;

    args.forEach(arg => {
        substract += arg;
    })

    const result = this.value - substract;

    this.value = result;

    return this.value;
}

IntBuilder.prototype.multiply = function (param) {
    const result = this.value * param;

    this.value = result;

    return this.value;
}

IntBuilder.prototype.divide = function (param) {
    const result = Math.floor(this.value / param);

    this.value = result;

    return this.value;
}

IntBuilder.prototype.mod = function (param) {
    const resultOfDivision = Math.floor(this.value / param);

    const resultWithRoundedValue = resultOfDivision * param;

    const result = this.value - resultWithRoundedValue;

    this.value = result;

    return this.value;
}

class StringBuilder extends Builder {
    constructor(value) {
        super(value);
    }

    plus(...strings) {
        let newString = '';

        for (let i = 0; i < strings.length; i++) {
            newString += strings[i] + '';
        }

        const result = this.value + newString;

        this.value = result;

        return this.value;
    }

    minus(amount) {
        const newString = this.value.slice(-this.value.length, -amount);

        this.value = newString;

        return this.value;
    }

    multiply(amount) {
        this.value += ' ';

        const newString = this.value.repeat(amount);

        this.value = newString.trimRight();

        return this.value;
    }

    divide(amount) {
        const k = Math.floor(this.value.length / amount);

        const newString = this.value.slice(-this.value.length, k);

        this.value = newString;

        return this.value;
    }

    remove(str) {
        if (this.value.includes(str)) {
            const startIdx = this.value.indexOf(str);
            const endIdx = startIdx + str.length;

            const stringBeforeSub = this.value.slice(-this.value.length, startIdx);
            const stringAfterSub = this.value.slice(endIdx, this.value.length);

            const newString = stringBeforeSub + stringAfterSub;

            this.value = newString;

            return this.value;
        } else {
            console.log(`No "${str}" substring found in stored string`);
        }
    }

    sub(from, length) {
        const newString = this.value.substr(from, length);

        this.value = newString;

        return this.value;
    }
}

const int = new IntBuilder(15);
const str = new StringBuilder('Hello');

console.log(`Default int value: ${int.get()}`);
console.log(`Default str value: ${str.get()}`);