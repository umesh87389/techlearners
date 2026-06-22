# TechLearners

A GitHub Pages-ready educational website for CBSE Class 9 and CBSE Class 10 AI learning.

## Folder Structure

- `index.html` - Homepage
- `about.html` - About page
- `contact.html` - Contact page
- `login.html` - Demo student login
- `dashboard.html` - Student dashboard
- `assets/css` - Stylesheets
- `assets/js` - JavaScript files
- `pages/class9` - CBSE Class 9 pages
- `pages/class10` - CBSE Class 10 pages
- `pages/notes` - Notes page
- `pages/quiz` - Interactive practice quiz page
- `pages/quizzes` - MCQ resources page
- `pages/admin` - Browser-based admin panel served from `admin.techlearners.in`
- `data` - JSON files for notes, quizzes, lectures and announcements
- `downloads` - Optional downloadable note files

## How to Use

1. Upload this folder to your GitHub repository.
2. Enable GitHub Pages from repository settings.
3. Open `https://admin.techlearners.in/pages/admin/admin-login.html` to manage notes, lectures, quizzes, announcements and homepage advertisement posters in your browser.
4. Add note content through the admin panel. Replace sample files inside `downloads/` only when you want to offer an optional file.

## Firebase Setup

The admin panel supports Firebase Authentication and Cloud Firestore. Once connected, edits are published for all visitors, and active advertisement posters appear as dismissible homepage popups. Advertisement posters use public image URLs so they can be managed without enabling paid Firebase Storage.

Student login and registration also use Firebase Authentication. Contact form submissions are stored in the `contactMessages` Firestore collection and can be viewed only from the UID-restricted admin inbox.

Student and admin login pages use Firebase Authentication. For high-risk production traffic, add a server-verified CAPTCHA provider such as reCAPTCHA Enterprise or Cloudflare Turnstile through a trusted backend.

For student accounts, enable both **Email/Password** and **Google** under Firebase Authentication > Sign-in method. Google sign-in uses a popup with a redirect fallback for browsers that block popups.

1. Create a Firebase project and register a Web app in Firebase Console.
2. Enable **Authentication > Sign-in method > Email/Password**.
3. Enable **Authentication > Sign-in method > Google** and add `www.techlearners.in`, `techlearners.in`, and `admin.techlearners.in` under **Authentication > Settings > Authorized domains**.
4. Add your admin user in **Authentication > Users** and copy its UID.
5. Create a Cloud Firestore database.
6. Enable Firebase Storage.
7. Paste your Web app config into `assets/js/firebase-config.js`.
8. Replace `REPLACE_WITH_YOUR_ADMIN_UID` in `firebase/firestore.rules` and `firebase/storage.rules`.
9. Paste and publish those rules in the matching Firebase Console rule editors.
10. Deploy this folder to GitHub Pages, point the admin subdomain at the same Pages site, then sign in at `https://admin.techlearners.in/pages/admin/admin-login.html`.

Firebase Storage is optional. Advertisement posters can be managed on the free plan by hosting the image publicly and pasting its direct image URL into the admin panel. If you enable Firebase Storage later, publish `firebase/storage.rules` before using Storage uploads.

The Firebase config values in `assets/js/firebase-config.js` identify your project; they are not a substitute for security rules. Keep the rule files restricted to your admin UID.

Until you paste a Firebase config, the website remains usable in local demo mode with password `admin123`. Demo edits are stored only in the current browser.
