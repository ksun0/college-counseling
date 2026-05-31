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
