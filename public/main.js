document.getElementById("download-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = document.getElementById("url").value;
  
    if (!url) {
      alert("Please enter a YouTube URL.");
      return;
    }
  
    const response = await fetch(`/download?url=${encodeURIComponent(url)}`);
    const blob = await response.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "video.mp4";
    a.click();
  });
  