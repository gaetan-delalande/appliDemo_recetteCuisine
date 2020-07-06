//crée le worker et communique avec lui
const worker = new Worker("/serviceWorker/app/sw.js");

function sendMessageToWorker() {
  worker.postMessage("hello");
}

function askWorkerRecurringTask() {
  worker.postMessage("recurring");
}

worker.addEventListener("message", function (messageEvent) {
  const log = document.createElement("p");
  log.textContent = messageEvent.data;
  document.querySelector("#output").prepend(log);
});