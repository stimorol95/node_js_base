const colors = require('colors');

const green = colors.green
const yellow = colors.yellow
const red = colors.red

let a = +process.argv[2]
let b = +process.argv[3]
let arr = []

const outputConsole = () => {
    for (let i = 0; i < arr.length; i += 3) {

        console.log(green(arr[i]))

        if (arr[i + 1] === undefined) {
            break
        }
        console.log(yellow(arr[i + 1]))

        if (arr[i + 2] === undefined) {
            break
        }
        console.log(red(arr[i + 2]))
    }
}

const simpleNum = () => {
    if (a < 2) {
        a = 2
        console.log("простые числа начинаются с 2")
    }

    while (a <= b) {
        if (a % 2 == 0 & a != 2) {
            ++a;
        } else if (a % 3 == 0 & a != 3) {
            ++a;
        } else if (a % 5 == 0 & a != 5) {
            ++a;
        } else if (a % 7 == 0 & a != 7) {
            ++a;
        } else {
            arr.push(a)
            ++a;
        }
    }
    if (arr.length == 0) {
        console.log(red("здесь нет простых чисел"))
        return
    }
    outputConsole();
}

const isValid = () => {
    if (isNaN(a) || isNaN(b)) {
        console.log("наберите числа")
    } else {
        if (a > b) {
            [b, a] = [a, b]
        }
        simpleNum();
    }
}

isValid();

