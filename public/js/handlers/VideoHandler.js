import fileExt from "/js/lib/fileExt.js";

class VideoHandler {
  accept(file) {
    if (!(file instanceof File)) throw "invalid type";

    return file.type.startsWith("video/");
  }

  async process(file, { timeOffset, onProgress }) {
    const ffmpeg = FFmpeg.createFFmpeg({
      log: true,
      corePath: "/js/vendor/ffmpeg-core.js",
      progress: ({ ratio }) => onProgress(ratio),
    });
    await ffmpeg.load();
    ffmpeg.FS("writeFile", file.name, await FFmpeg.fetchFile(file));
    ffmpeg.FS(
      "writeFile",
      "NotoSansTC-Regular.otf",
      await FFmpeg.fetchFile("/fonts/NotoSansTC-Regular.otf")
    );
    const outputFilename = `out.${fileExt(file.name)}`;
    await ffmpeg.run(
      "-i",
      file.name,
      "-map_metadata",
      "0",
      "-vf",
      "drawtext=text=%{pts\\\\:localtime\\\\:1632050977}:fontfile=NotoSansTC-Regular.otf:fontcolor=white:fontsize=64:x=32:y=32:box=1:boxcolor=#000000B3:boxborderw=8",
      outputFilename
    );
    const result = new File(
      [ffmpeg.FS("readFile", outputFilename).buffer],
      file.name,
      {
        type: file.type,
      }
    );
    return result;
  }
}

export default VideoHandler;
