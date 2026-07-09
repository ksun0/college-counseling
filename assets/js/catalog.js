var catalogLinks = document.getElementsByClassName("catalog-audio");
var catalogPlayer = document.getElementById("catalog-player");
var catalogPlayerAudio = document.getElementById("catalog-player-audio");
var catalogPlayerTitle = document.getElementById("catalog-player-title");
var firebaseMeasurementId = "G-04TXSLJPV8";
var localAudioFiles = {
  "10lEf7yDD-SnA24_5jnZoMfvTKkbBr7zc": "m4a",
  "12qLh3Y8-W07bFQe39jyAGSLLJT-aMMYl": "mp3",
  "13xcs9iihRoq8DagGabRBvbZlggacfjSJ": "m4a",
  "14uzJnmF-PzzXwjdE0uHIiikK5Whmz2Z_": "mp3",
  "15KNJ4Zx3YrhCSqN2r8BfMZFCf_WBwxTO": "mp3",
  "19GsvNW9Zq3mAzYUDXb28E0JETWU6OTDw": "m4a",
  "1FqPkHHMmk4Z39reR29MeKDHZitI_U7Va": "m4a",
  "1HLP_gVJCTGStMXRlKuXRuMhmjbf9w6Gx": "mp3",
  "1LS6rPq0cRA4-eLHLZMAJdqC57E56LitQ": "m4a",
  "1MhJB7moDdv3fUuUw0a3iYAgsICLTD-XK": "m4a",
  "1PzuaZVbiEV_ul_sgXK6GI3JpBd0GR6fW": "mp3",
  "1Sol1LIDcWZUVBWBHl5rxtoU5VY-EQf5K": "m4a",
  "1VtTIdrg6Mc7JHbRlzybOtdeVeaWA_cmB": "mp3",
  "1W2rbXgwrAE90cxRoGahJpT3ok64tobit": "mp3",
  "1WHXtTATiOQCTjzoFamidPXMb35wasR_7": "mp3",
  "1WMTtWrl8ngMIAHNd7jGz1jiBEw8Mj7Sm": "mp3",
  "1YfcESnnO9vLP1fJVUaR7OwuvDdcd_yDx": "m4a",
  "1_ZZAvc8VrA3fHSKX1h88guUT7hS3nMA-": "mp3",
  "1beClKRB8oRAU4el6m4REs1oAL5SkV2Z9": "m4a",
  "1c3fhqDE_BxDCke2jYpnkuMVMdidfJfk-": "mp3",
  "1cM0wfKON9-WII2ry1tBdTaNj96qToj2H": "mp3",
  "1jkO2OZb2Wlh-ExX0OO3VtzLAMR8f5175": "mp3",
  "1kQ9ytbM48q68R6chLt_gMbdVZAwmhqRk": "mp3",
  "1nDHFOgFvjVGr39Xb1yfTWQ8dVEwqgk5w": "m4a",
  "1ooTTYkc3P9mH54ZvBG1NL9RBfPbC0TTP": "mp3",
  "1qG9SkTycfs2La3VONspm144WdEPAuu6x": "mp3",
  "1yWjFhSlIU8CHv2IdK8Mh0DI60NpHJq9e": "m4a"
};

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

function getDriveFileId(link) {
  if (link.dataset.driveId) {
    return link.dataset.driveId;
  }

  var match = link.href.match(/\/file\/d\/([^/]+)/);

  return match ? match[1] : "";
}

function getLocalAudioUrl(fileId) {
  if (!fileId || !localAudioFiles[fileId]) {
    return null;
  }

  return "audio/" + fileId + "." + localAudioFiles[fileId];
}

function trackAudioPlay(link) {
  if (typeof gtag !== "function") {
    return;
  }

  gtag("event", "audio_play", {
    audio_title: link.textContent.trim(),
    audio_file_id: getDriveFileId(link),
    page_path: window.location.pathname
  });
}

initializeAnalytics();

if (catalogPlayerAudio) {
  catalogPlayerAudio.addEventListener("contextmenu", function(event) {
    event.preventDefault();
  });
}

for (var i = 0; i < catalogLinks.length; i++) {
  catalogLinks[i].addEventListener("click", function(event) {
    if (!this.dataset.driveId) {
      return;
    }

    var fileId = getDriveFileId(this);
    var audioUrl = getLocalAudioUrl(fileId);

    if (!catalogPlayer || !catalogPlayerAudio) {
      return;
    }

    event.preventDefault();
    catalogPlayer.hidden = false;
    catalogPlayerTitle.textContent = "正在播放：" + this.textContent.trim();

    if (!audioUrl) {
      catalogPlayerTitle.textContent = "录音文件尚未迁移到本网站：" + this.textContent.trim();
      catalogPlayerAudio.removeAttribute("src");
      catalogPlayerAudio.load();
      catalogPlayer.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    catalogPlayerAudio.src = audioUrl;
    catalogPlayerAudio.load();
    catalogPlayerAudio.play().catch(function() {});
    trackAudioPlay(this);
    catalogPlayer.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
