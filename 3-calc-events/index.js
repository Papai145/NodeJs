const EventEmmiter = require("events");
const myEmmiter = new EventEmmiter();

let firstName = parseInt(process.argv[2]);
let secondName = parseInt(process.argv[3]);
let sign = process.argv[4];

myEmmiter.on("add", (a, b) => {
  myEmmiter.emit("result", a + b);
});

myEmmiter.on("multiply", (a, b) => {
  myEmmiter.emit("result", a * b);
});

myEmmiter.on("result", (result) => {
  console.log(result);
});

myEmmiter.emit(sign, firstName, secondName);
