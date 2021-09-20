import handlers from "/js/handlers.js";

const $form = document.getElementById("form");
const $progress = document.getElementById("progress");
const $progress_bar = document.getElementById("progress_bar");
const $player = document.getElementById("player");
const $download = document.getElementById("download");
const $output = document.getElementById("output");

const onProgress = (ratio) => {
  $progress_bar.style.width = `${ratio * 100}%`;
};

$form.addEventListener("submit", async (event) => {
  event.preventDefault();
  $progress_bar.style.removeProperty("width");
  $output.classList.add("d-none");
  const data = new FormData(event.currentTarget);
  const file = data.get("input_file");
  const timeOffset = Date.parse(data.get("time_offset"));
  if (isNaN(timeOffset)) {
    alert("invalid time offset");
    return;
  }
  const handler = handlers.find((i) => i.accept(file));
  if (handler === undefined) {
    alert("invalid file");
    return;
  }

  $progress.classList.remove("d-none");
  const newFile = await handler.process(file, { timeOffset, onProgress });
  $progress.classList.add("d-none");
  const videoURL = URL.createObjectURL(newFile);
  $download.href = videoURL;
  $download.download = newFile.name;
  $player.src = videoURL;
  $output.classList.remove("d-none");
  $player.play();
});
