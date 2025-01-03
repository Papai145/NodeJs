const NotificationCenter = require("node-notifier").NotificationCenter;
const path = require("path");

let notificationCenterNotifier = new NotificationCenter({
  withFallback: true,
});

const timeArr = [process.argv[2], process.argv[3], process.argv[4]];

function getObjTime(arr) {
  const objTime = {};
  const timeArr = arr.filter((el) => {
    if (el !== undefined) {
      return el;
    }
  });

  for (let elem of timeArr) {
    if (elem.slice(-1) == "h") {
      objTime["hour"] = Number(elem.slice(0, -1));
    }
    if (elem.slice(-1) == "m") {
      objTime["minutes"] = Number(elem.slice(0, -1));
    }
    if (elem.slice(-1) == "s") {
      objTime["second"] = Number(elem.slice(0, -1));
    }
  }
  return objTime;
}

function timer(obj) {
  let ms = 0;
  let message = "Таймер сработает через ";
  for (const key in obj) {
    if (key == "hour") {
      message += `${obj[key]} час `;
      ms += obj[key] * 3600000;
    }
    if (key == "minutes") {
      message += `${obj[key]} минут `;
      ms += obj[key] * 60000;
    }
    if (key == "second") {
      message += `${obj[key]} секунд `;
      ms += obj[key] * 1000;
    }
  }
  console.log(message);
  setTimeout(() => {
    notificationCenterNotifier.notify(
      {
        title: "Сработал таймер",
        message: "Поздравляю,таймер работает!",
        sound: "Blow",
        // icon: path.join(__dirname, "icon2.jpg"),
        // contentImage: path.join(__dirname, "icon2.jpg"),
        open: undefined,
        wait: false,
      },
      function (error, response, metadata) {
        console.log(response, metadata);
      }
    );
  }, ms);
}
const objTime = getObjTime(timeArr);
timer(objTime);
