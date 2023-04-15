const express = require("express");
const ytdl = require("ytdl-core");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/download", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      res.status(400).send("URL is required");
      return;
    }

    if (!ytdl.validateURL(url)) {
      res.status(400).send("Invalid YouTube URL");
      return;
    }

    const videoInfo = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(videoInfo.formats, { quality: "highestvideo" });

    res.header("Content-Disposition", `attachment; filename="video.mp4"`);
    ytdl(url, { format }).pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
