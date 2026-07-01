var catalogLinks = document.getElementsByClassName("catalog-audio");
var catalogPlayer = document.getElementById("catalog-player");
var catalogPlayerFrame = document.getElementById("catalog-player-frame");
var catalogPlayerTitle = document.getElementById("catalog-player-title");
var firebaseMeasurementId = "G-04TXSLJPV8";

window.dataLayer = window.dataLayer || [];

function gtag() {
  window.dataLayer.push(arguments);
}

function initializeAnalytics() {
  if (!firebaseMeasurementId || document.getElementById("google-analytics-script")) {
    return;
  }

  var analyticsScript = document.createElement("script");
  analyticsScript.id = "google-analytics-script";
  analyticsScript.async = true;
  analyticsScript.src = "https://www.googletagmanager.com/gtag/js?id=" + firebaseMeasurementId;
  document.head.appendChild(analyticsScript);

  gtag("js", new Date());
  gtag("config", firebaseMeasurementId);
}

function getDrivePreviewUrl(url) {
  var match = url.match(/\/file\/d\/([^/]+)/);

  if (!match) {
    return null;
  }

  return "https://drive.google.com/file/d/" + match[1] + "/preview?autoplay=1";
}

function getDriveFileId(url) {
  var match = url.match(/\/file\/d\/([^/]+)/);

  return match ? match[1] : "";
}

function trackAudioPlay(link) {
  if (typeof gtag !== "function") {
    return;
  }

  gtag("event", "audio_play", {
    audio_title: link.textContent.trim(),
    audio_file_id: getDriveFileId(link.href),
    page_path: window.location.pathname
  });
}

initializeAnalytics();

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
    trackAudioPlay(this);
    catalogPlayer.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
