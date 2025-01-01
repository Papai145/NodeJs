const { parentPort, workerData } = require("worker_threads");

// process.env.UV_THREADPOOL_SIZE = 8;

const compute = ({ array }) => {
  const start = performance.now();
  let count = [];
  for (i = 0; i < array.length; i++) {
    if (array[i] % 3 === 0) {
      count++;
    }
  }
  const time = performance.now() - start;
  const result = { result: count, time: time };
  return result;
};
parentPort.postMessage(compute(workerData));
