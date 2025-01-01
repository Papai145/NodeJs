const { error, time } = require("console");
const { resolve } = require("path");
const { PerformanceObserver } = require("perf_hooks");
const { Worker } = require("worker_threads");

function getArr() {
  // создание массива
  let arr = [];
  for (i = 1; i <= 300000; i++) {
    arr.push(i);
  }
  return arr;
}

function lineFunc(arr) {
  // определение времени на операцию на одном потоке
  let count = 0;

  performance.mark("startLine");
  for (i = 0; i <= arr.length - 1; i++) {
    if (i % 3 === 0) {
      count++;
    }
  }
  performance.mark("finishLine");
  const finish = performance.measure(
    "test",
    "startLine",
    "finishLine"
  ).duration;
  const result = { time: finish, result: count };
  return result;
}
const timeLineFunc = lineFunc(getArr());
console.log(`На выполнение обычной функции  затрачено ${timeLineFunc.time}`);

////////////////////////////////////////////////////////////////

// process.env.UV_THREADPOOL_SIZE = 8;

function sliceIntoChunks(arr, chunkSize) {
  //разделение массива на n частей
  const result = [];
  const size = arr.length / chunkSize;

  for (let i = 0; i < arr.length - 1; i += size) {
    const chunk = arr.slice(i, i + size);
    result.push(chunk);
  }

  return result;
}

const compute = async (array) => {
  //отправка массива на другой поток
  return await new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", { workerData: { array } });
    worker.on("message", (msg) => {
      resolve(msg);
    });
    worker.on("error", (err) => {
      reject(err);
    });
  });
};

const main = async (arr) => {
  performance.mark("start");
  const result = await Promise.all(arr.map((el) => compute(el))).catch((e) => {
    console.log(e.message);
  });
  performance.mark("finish");
  const finish = performance.measure("main", "start", "finish").duration;
  const timeOfEachProcess = result.reduce((acc, el) => {
    return (acc += el.time);
  }, 0);
  // console.log({ resultProcces: result, time: finish });
  console.log(
    `Весь процесс занял ${finish} ,при этом сумма измерение каждой итерации в сумме показало ${timeOfEachProcess}`
  );
};
const newArr = sliceIntoChunks(getArr(), 8);
main(newArr);
