# college-app-service

## Live URLs

- GitHub Pages: [https://ksun0.github.io/college-counseling/](https://ksun0.github.io/college-counseling/)
- Firebase Hosting: [https://bingjincounseling.web.app](https://bingjincounseling.web.app)

## Firebase Hosting

This site is configured for Firebase Hosting as a static site served from the repo root.

### Files added

- `firebase.json`: Hosting config
- `.firebaserc`: Firebase project mapping
- `.firebaseignore`: Files excluded from deploy

### One-time setup

1. Install the Firebase CLI:
   `npm install -g firebase-tools`
2. Log in:
   `firebase login`
3. Create a Firebase project in the Firebase console and choose a project id.
4. Set `.firebaserc` to your Firebase project id.

### Deploy

From this folder, run:

`firebase deploy`

This repo is currently configured for:

- Firebase project id: `college-counseling-1182b`
- Firebase Hosting site id: `bingjincounseling`
- Firebase Web app id: `1:780144804893:web:5597005682e6002699b2f4`
- Google Analytics measurement id: `G-04TXSLJPV8`

After deploy, Firebase gives free default domains like:

- `your-project-id.web.app`
- `your-project-id.firebaseapp.com`

## GitHub Actions Deploy

This repo now includes a workflow at `.github/workflows/deploy.yml` that deploys on every push to `main`:

- GitHub Pages
- Firebase Hosting

### GitHub Pages setup

In the GitHub repository settings:

1. Open `Settings -> Pages`
2. Set `Source` to `GitHub Actions`

### Firebase GitHub Actions secret

Add this repository secret in `Settings -> Secrets and variables -> Actions`:

- `FIREBASE_SERVICE_ACCOUNT_COLLEGE_COUNSELING_1182B`

Important:

- Add it under `Repository secrets`, not under `Variables`
- The name must match exactly: `FIREBASE_SERVICE_ACCOUNT_COLLEGE_COUNSELING_1182B`
- The value must be the full JSON contents of the service account key, not a file path
- Do not commit the JSON key file into the repo

The value should be the full JSON credentials for a Firebase or Google Cloud service account that has permission to deploy Hosting for project `college-counseling-1182b`.

If the secret is missing or named incorrectly, the GitHub Actions Firebase step fails with:

`Input required and not supplied: firebaseServiceAccount`

Once that secret is added, pushing to `main` will deploy to both GitHub Pages and Firebase Hosting.

### Notes

- `index.html` is the main Chinese homepage and default root page.
- `index-english.html` is the English homepage.
- `index-chinese.html` is kept as a compatibility copy and will also be available at `/index-chinese`.
- `audio.html` is the standalone audio catalog. It is not linked from either homepage; `catalog.html` has been removed.
- `index.php` is not needed on Firebase Hosting because the site is deployed as static files.
- Repo-only files like `README.md`, `LICENSE.txt`, `composer.json`, `index.php`, and the Tencent verification text file are excluded from deploy.
- GitHub Actions generates a compatibility route at `index-chinese/index.html` during deploy so `/index-chinese/` keeps working on GitHub Pages.
- Audio play counts are tracked as Google Analytics event `audio_play` from `assets/js/audio.js`. These counts are not shown publicly; view them in Firebase/Google Analytics.

## Self-Hosted Audio

The `audio.html` page uses a native HTML `<audio>` player instead of Google Drive preview if the recording exists in `audio/`.

Implementation details:

- Audio files live in `audio/` and are named by the original Google Drive file id, for example `audio/1_ZZAvc8VrA3fHSKX1h88guUT7hS3nMA-.mp3`.
- Audio links use `href="#"` plus `data-drive-id="..."`; they should not link directly to Google Drive.
- `assets/js/audio.js` maps available file ids to their local file extensions.
- The player uses `controlsList="nodownload"` and blocks right-click on the audio element.
- This removes the normal browser download button and removes visible Google Drive links, but it is still download deterrence, not true DRM. A determined user can still inspect network requests for public audio files.
- `.github/workflows/deploy.yml` copies `audio/` into the generated deploy bundle.

As of the local-audio migration, 27 public recordings have local files. These 12 recordings intentionally remain on locked Google Drive links so viewers can request access:

- `1i_wFeTuNjrBnkSJAa846sHO5QlnH-EY0` - 如何从小培养孩子的兴趣爱好(家长嘉宾讲座)
- `1Zv554SyDzb1NOtRRd0UODqhnqoxiohrG` - 我如何指导学生写大学申请的牛皮书
- `1GsYXQ9KQbejLfbV6XVuz-o1Ftb_IqrVt` - 什么时候用tutor，如何选择，如何沟通
- `1f0o7MvlHpGzLYAZFUxHrZ1w9goXtqtyc` - MIT学生案例
- `13Kj74GZeU2jjlxFfyqvf6GmqQcJLlLyL` - RSI申请
- `1pbOKv0LKhTdOKnEjUsV2ZqdLQzjnan1M` - 我的职业生涯以及两次经济危机的经历
- `19B7bKB0xCm2QRu4wbCMAHrzt1vMhU7FM` - 高中生如何做研究
- `1sFZINF1s4_e-B8CFJwTmqBPg3KKYLdUh` - 我的医学院申请和就业
- `1toD3ueLIzZsblKTc-TYJMYS_x8FRWy7k` - 我的法学院申请和就业
- `1Av2M9UinsT776-rjlNokC57CXxoFBsef` - 女生如何在STEM领域胜出
- `1DA8N6C16fCB1en1mxfu6S_--0Jq3kwbO` - 我如何申请到哥伦比亚
- `1wBn7J-QCxmyk6JDrbB-gcpZCbhWbskld` - 我在华尔街的工作

To move one of the locked recordings to local playback later:

1. Download the recording from Google Drive while signed in with access.
2. Save it under `audio/` as `{drive-file-id}.mp3` or `{drive-file-id}.m4a`.
3. Add the file id and extension to `localAudioFiles` in `assets/js/audio.js`.
4. Change the link in `audio.html` from a Drive URL to `href="#" data-drive-id="{drive-file-id}"`.
5. Commit the new audio file, `audio.html` change, and JS change.

## Audio Play Analytics

Audio play tracking uses Google Analytics 4 event tracking.

Event name:

- `audio_play`

Event parameters:

- `audio_title`: visible recording title text
- `audio_file_id`: Google Drive file id
- `page_path`: page where the recording was opened

To confirm tracking in realtime:

1. Open [Google Analytics](https://analytics.google.com/).
2. Select the `college-counseling-1182b` property.
3. Go to `Reports -> Realtime overview`.
4. Open `https://bingjincounseling.web.app/audio.html` in another browser tab.
5. Click an audio recording.
6. Wait 10-60 seconds and look for event `audio_play`.

To view play counts by recording:

1. Go to `Admin`.
2. Under `Data display`, open `Custom definitions`.
3. Click `Create custom dimension`.
4. Create an event-scoped dimension:
   - Dimension name: `Audio title`
   - Scope: `Event`
   - Event parameter: `audio_title`
5. Create another event-scoped dimension:
   - Dimension name: `Audio file ID`
   - Scope: `Event`
   - Event parameter: `audio_file_id`
6. After GA has processed new events, go to `Explore`.
7. Create a free-form exploration with:
   - Rows: `Audio title`
   - Metrics: `Event count`
   - Filter: `Event name exactly matches audio_play`

Notes:

- `audio_play` counts player opens/clicks, not full listens.
- Standard GA reports can lag. Use realtime reports for immediate testing.
- Ad blockers can block Google Analytics during testing.
- Keep one event name, `audio_play`, and split by `audio_title` or `audio_file_id`; do not create a separate event name for every recording.
