# techlearners — Class 10 IT Part A Detailed Notes (GitHub Pages)

Expanded from: https://www.techlearners.in/pages/notes/detail.html?class=Class+10&subject=IT&note=Class+10%7CIT%7CPart+A:+Employability+Skills+-+Class+10+IT+Complete+Notes

Original short note was ~4.1 KB / 39 lines (5 bullets per unit).
This repo expands it into full CBSE IT-402 session-wise notes with tables, examples, Q-bank, 60 MCQs, checklist.

Live site after Pages enable: `https://umesh87389.github.io/techlearners/`

## Structure
```
index.html
notes/class-10-it-employability-skills.html
assets/css/style.css
```

## Deploy (userid: umesh87389, repo: techlearners)

### Option A – browser (easiest, no install)
1. Go to https://github.com/new → Owner: `umesh87389` → Repository name: `techlearners` → Public → Create.
2. Click `uploading an existing file` → drag all files from this folder (`index.html`, `notes/`, `assets/`) → Commit.
3. Repo → Settings → Pages → Build and deployment → Source: `Deploy from a branch` → Branch: `main` + `/ (root)` → Save.
4. Wait 1–2 min → open `https://umesh87389.github.io/techlearners/`

### Option B – terminal (this folder is already git-ready)
```bash
cd ~/techlearners
git remote add origin https://github.com/umesh87389/techlearners.git
git branch -M main
git push -u origin main
# then enable Pages as in step 3 above
# update later:
git add . && git commit -m "update notes" && git push
```

Get a Personal Access Token for push if asked (GitHub → Settings → Developer settings → PAT classic with `repo` scope). Username: `umesh87389`, Password: paste token.

## Local preview (no npm/node needed)
```bash
cd ~/techlearners
python3 -m http.server 8000
# open http://localhost:8000
```
