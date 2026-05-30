# TechLearners

A GitHub Pages-ready educational website for Class 9 and Class 10 AI learning.

## Folder Structure

- `index.html` - Homepage
- `about.html` - About page
- `contact.html` - Contact page
- `login.html` - Demo student login
- `dashboard.html` - Student dashboard
- `assets/css` - Stylesheets
- `assets/js` - JavaScript files
- `pages/class9` - Class 9 pages
- `pages/class10` - Class 10 pages
- `pages/notes` - Notes page
- `pages/quizzes` - Quiz page
- `pages/admin` - Browser-based admin panel
- `data` - JSON files for notes, quizzes, lectures and announcements
- `downloads` - Downloadable notes/files

## How to Use

1. Upload this folder to your GitHub repository.
2. Enable GitHub Pages from repository settings.
3. Open `pages/admin/admin-login.html` to manage notes, lectures, quizzes and announcements in your browser.
4. Replace sample files inside `downloads/` with your actual notes.
5. Replace YouTube video IDs inside `data/lectures.json`.

## Firebase Setup

The admin panel supports Firebase Authentication, Cloud Firestore and Firebase Storage. Once connected, edits are published for all visitors and note files are uploaded online.

Student login and registration also use Firebase Authentication. Contact form submissions are stored in the `contactMessages` Firestore collection and can be viewed only from the UID-restricted admin inbox.

For student accounts, enable both **Email/Password** and **Google** under Firebase Authentication > Sign-in method. Google sign-in uses a popup with a redirect fallback for browsers that block popups.

1. Create a Firebase project and register a Web app in Firebase Console.
2. Enable **Authentication > Sign-in method > Email/Password**.
3. Enable **Authentication > Sign-in method > Google** and add `www.techlearners.in` under **Authentication > Settings > Authorized domains**.
4. Add your admin user in **Authentication > Users** and copy its UID.
5. Create a Cloud Firestore database.
6. Enable Firebase Storage.
7. Paste your Web app config into `assets/js/firebase-config.js`.
8. Replace `REPLACE_WITH_YOUR_ADMIN_UID` in `firebase/firestore.rules` and `firebase/storage.rules`.
9. Paste and publish those rules in the matching Firebase Console rule editors.
10. Deploy this folder to GitHub Pages, then sign in at `pages/admin/admin-login.html`.

The Firebase config values in `assets/js/firebase-config.js` identify your project; they are not a substitute for security rules. Keep the rule files restricted to your admin UID.

Until you paste a Firebase config, the website remains usable in local demo mode with password `admin123`. Demo edits are stored only in the current browser.
