import handlers from "/js/handlers.js";

const $player = document.getElementById("player");
const $input_file = document.getElementById("input_file");
const $downloadButton = document.getElementById("download");
const $progress = document.getElementById("progress").childNodes[0];

const onProgress = (ratio) => {
  $progress.data = `${Math.round(ratio * 1000) / 10}%`;
};

(async () => {
  $input_file.addEventListener("change", async (event) => {
    const file = event.currentTarget.files[0];
    const handler = handlers.find((i) => i.accept(file));
    if (handler === undefined) {
      alert("invalid file");
      return;
    }

    const newFile = await handler.process(file, { onProgress });
    const videoURL = URL.createObjectURL(newFile);
    $downloadButton.href = videoURL;
    $downloadButton.download = newFile.name;
    $player.src = videoURL;
    $player.loop = true;
    $player.play();
  });
})();

