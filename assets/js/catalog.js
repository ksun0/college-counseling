var catalogLinks = document.getElementsByClassName("catalog-audio");
var catalogPlayer = document.getElementById("catalog-player");
var catalogPlayerFrame = document.getElementById("catalog-player-frame");
var catalogPlayerTitle = document.getElementById("catalog-player-title");

function getDrivePreviewUrl(url) {
  var match = url.match(/\/file\/d\/([^/]+)/);

  if (!match) {
    return null;
  }

  return "https://drive.google.com/file/d/" + match[1] + "/preview?autoplay=1";
}

for (var i = 0; i < catalogLinks.length; i++) {
  catalogLinks[i].addEventListener("click", function(event) {
    var previewUrl = getDrivePreviewUrl(this.href);

    if (!previewUrl || !catalogPlayer || !catalogPlayerFrame) {
      return;
    }

    event.preventDefault();
    catalogPlayer.hidden = false;
    catalogPlayerTitle.textContent = "正在播放：" + this.textContent.trim();
    catalogPlayerFrame.src = previewUrl;
    catalogPlayer.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
