const { add } = require("./add");
const { multiply } = require("./multiply");

let firstName = process.argv[2];
let secondName = process.argv[3];
let sign = process.argv[4];

function operation(firstName, secondName, sign) {
  firstName = parseInt(firstName);
  secondName = parseInt(secondName);
  let result;
  switch (sign) {
    case "add":
      result = add(firstName, secondName);
      break;
    case "multiply":
      result = multiply(firstName, secondName);
      break;
    default:
      result = "произошла ошибка";
  }
  return result;
}

console.log(operation(firstName, secondName, sign));
