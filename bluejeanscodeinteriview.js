//interview on march 1 2018


const _ = require('underscore');
const chai = require('chai');
const expect = chai.expect;


// Question 1. Convert object to a formatted string
const obj = {
    a: '1',
    b: '2.4',
    c: '3.2',
    'd.e': '5'
}


const expected = "1->a, 2.4->b, 3.2->c, 5->d.e";
var text = "";

function print(obj) {
    // Add you code here
    var objectkeys = Object.keys(obj);

    for (var i = 0; i < objectkeys.length; i++) {
        // key[i] + "->" + i.key

        text += obj[objectkeys[i]] + "->" + objectkeys[i] + " ";


    }

    return text;
}

// task: output
expect(print(obj)).to.equal(expected);
console.log('Object formatting done');