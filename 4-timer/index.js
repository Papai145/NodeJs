const timeArr = [process.argv[2], process.argv[3], process.argv[4]];

function transformTimeArr(arr) {
  const timeObject = {};
  const timeArr = arr.filter((el) => {
    if (el !== undefined) {
      return el;
    }
  });

  for (let elem of timeArr) {
    if (elem.slice(-1) == "h") {
      timeObject["hour"] = Number(elem.slice(0, -1));
    }
    if (elem.slice(-1) == "m") {
      timeObject["minutes"] = Number(elem.slice(0, -1));
    }
    if (elem.slice(-1) == "s") {
      timeObject["second"] = Number(elem.slice(0, -1));
    }
  }
  return timeObject;
}

function timer(obj) {
  let ms = 0;
  let str = "Таймер сработает через ";
  for (const key in obj) {
    if (key == "hour") {
      str += `${obj[key]} час `;
      ms += obj[key] * 3600000;
    }
    if (key == "minutes") {
      str += `${obj[key]} минут `;
      ms += obj[key] * 60000;
    }
    if (key == "second") {
      str += `${obj[key]} секунд `;
      ms += obj[key] * 1000;
    }
  }
  console.log(str);
  setTimeout(() => {
    console.log("таймер сработал");
  }, ms);
}
const a = transformTimeArr(timeArr);
timer(a);
