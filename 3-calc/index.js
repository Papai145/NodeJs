const { add } = require("./add");
const { multiply } = require("./multiply");

let num1 = process.argv[2];
let num2 = process.argv[3];
let sign = process.argv[4];

function operation(num1, num2, sign) {
  num1 = parseInt(num1);
  num2 = parseInt(num2);
  let result;
  switch (sign) {
    case "add":
      result = add(num1, num2);
      break;
    case "multiply":
      result = multiply(num1, num2);
      break;
    default:
      result = `произошла ошибка операции, введите:
      <node index.js [операнд1] [операнд2] [add|multiply]>`;
  }
  return result;
}

console.log(operation(num1, num2, sign));
