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
- `index.php` is not needed on Firebase Hosting because the site is deployed as static files.
- Repo-only files like `README.md`, `LICENSE.txt`, `composer.json`, `index.php`, and the Tencent verification text file are excluded from deploy.
- GitHub Actions generates a compatibility route at `index-chinese/index.html` during deploy so `/index-chinese/` keeps working on GitHub Pages.
- Audio play counts are tracked as Google Analytics event `audio_play` from `assets/js/catalog.js`. These counts are not shown publicly; view them in Firebase/Google Analytics.

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
4. Open `https://bingjincounseling.web.app/catalog.html` in another browser tab.
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
