# 🎓 School Digital Student Portfolio System

A complete, production-ready **Digital Student Portfolio Platform** built for schools, coding academies (such as TechLearners), and educational institutions.

Designed around a **simple, practical 3-Team Framework** and the universal **Learn → Make → Show → Record** Activity Cycle.

---

## ⚡ Core Philosophy & 3 Technology Teams

Each team has **one clear job** and students produce tangible deliverables verified in their digital portfolio:

| Team Track | Primary Work | Student Activities / Deliverables | Target Portfolio Output |
| :--- | :--- | :--- | :--- |
| 💻 **IT Team** | Create digital content | Posters, Presentations, Documents, Spreadsheets, School/Event notices | **Best 3–5 digital works + photos + short team video** |
| 🤖 **Robotics Team** | Build and demonstrate robots/models | Simple circuits, Sensors, Small robots, Robot programming, Working models | **1–3 working projects + photos + demonstration video** |
| 🧠 **AI Team** | Explore and create simple AI projects | Learn about AI, Use AI tools, Simple AI projects, Image/Text recognition, AI demos | **1–3 AI projects + screenshots/photos + short team video** |

---

## ⭐ The Simple Team Activity Cycle

For **every team and every project**:

```
[ 1️⃣ LEARN ]  ➔  [ 2️⃣ MAKE ]  ➔  [ 3️⃣ SHOW ]  ➔  [ 4️⃣ RECORD ]
(Study Concepts)    (Build Project)    (Demonstrate Live)    (1-Min Video Demo)
```

1. **Learn**: Students explore key concepts, learn design rules, study circuit logic, or understand how AI models train.
2. **Make**: Students build hands-on digital works, assemble working circuits, or train real AI vision/NLP models.
3. **Show**: Students demonstrate their work live in front of the class, teacher, assembly, or science expo.
4. **Record**: Students record a concise 1-minute video demo and capture photos/screenshots for their digital portfolio.

---

## 🌟 Platform Components

```
school-portfolio/
├── index.html          # 🏫 School Directory & Portal (Search, Team Tabs & Grade Filters)
├── teams.html          # ⚡ 3 Technology Teams & Activity Cycle Guide + Roster
├── portfolio.html      # 🎓 Interactive Student Portfolio (Timeline, 1-Min Video, Deliverables)
├── admin.html          # 🛠️ Teacher & Admin Assessment & Activity Cycle Dashboard
├── id-card.html        # 🪪 Printable Physical QR Portfolio Badges (Team Color-Coded)
├── css/
│   └── styles.css      # Modern responsive styling, team themes & print media queries
├── js/
│   ├── qrcode.min.js   # Embedded offline client-side QR Code Engine
│   ├── data.js         # Master data model with LocalStorage synchronization
│   ├── app.js          # Hub search, team filtering & directory logic
│   ├── portfolio.js    # Dynamic portfolio renderer, activity cycle timeline & lightbox
│   ├── admin.js        # Form validation, team assignment, dynamic row builders & JSON export
│   └── id-card.js      # Printable ID & QR card generator with team badges
└── data/
    └── students.json   # Seed JSON dataset for backend integration
```

---

## 💻 Quick Start & Running Locally

You can run the portfolio system locally using Python's built-in HTTP server:

```bash
cd school-portfolio
python3 -m http.server 8080
```

Then open your browser and navigate to:
* **School Directory**: `http://localhost:8080/index.html`
* **Teams & Activity Cycle Guide**: `http://localhost:8080/teams.html`
* **Sample Portfolio (Robotics Lead - Rahul Kumar)**: `http://localhost:8080/portfolio.html?id=tl-2026-8a-12`
* **Sample Portfolio (IT Lead - Priya Sharma)**: `http://localhost:8080/portfolio.html?id=tl-2026-7b-07`
* **Sample Portfolio (AI Lead - Arjun Patel)**: `http://localhost:8080/portfolio.html?id=tl-2026-9a-04`
* **Teacher Admin Panel**: `http://localhost:8080/admin.html`
* **Printable QR Badges**: `http://localhost:8080/id-card.html`

---

## 🌐 Zero-Dependency Deployment

Because this system uses standard HTML5, CSS3, and modern JavaScript with zero build dependencies, you can deploy it in seconds:

1. **GitHub Pages**: Push the repository to GitHub and enable Pages in repository settings.
2. **Vercel / Netlify**: Drag and drop the `school-portfolio` folder into the Netlify / Vercel dashboard.
3. **School Website**: Upload the `school-portfolio` folder into your school's web host.
