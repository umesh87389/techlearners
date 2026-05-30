document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('navMenu');
  if(btn && nav) btn.addEventListener('click', () => nav.classList.toggle('show'));

  const announcementList = document.getElementById('announcementList');
  if(announcementList){
    TechLearnersContent.get('announcements', 'data').then(data=>{
      announcementList.innerHTML = data.map(a=>`<div class="list-item"><b>${a.title}</b><p>${a.message}</p></div>`).join('');
    }).catch(()=> announcementList.textContent='Unable to load announcements.');
  }

  const footer = document.querySelector('.footer');
  if(footer){
    const root = location.pathname.includes('/pages/') ? '../../' : '';
    footer.innerHTML = `<div class="footer-grid">
      <div><b>TechLearners</b><p>Simple learning support for Class 9 and Class 10 students.</p></div>
      <div><b>Contact Us</b><p><a href="${root}contact.html">Send a message</a></p></div>
      <div><b>Follow Us</b><p><a href="https://github.com/umesh87389" target="_blank" rel="noopener">GitHub</a></p></div>
      <div><b>Legal</b><p><a href="${root}privacy.html">Privacy Policy</a></p></div>
    </div><p class="footer-bottom">&copy; 2026 TechLearners. Built for AI students.</p>`;
  }
});

function loadNotes(className){
  const box = document.getElementById('notesList');
  if(!box) return;
  TechLearnersContent.get('notes', '../../data').then(data=>{
    const filtered = data.filter(n => n.class === className);
    box.innerHTML = filtered.map(n=>`
      <article class="card">
        <h3>${n.title}</h3>
        <p>${n.description}</p>
        <a href="${/^https?:\/\//.test(n.file) ? n.file : `../../${n.file}`}" download>Download</a>
      </article>`).join('');
  });
}

function loadLectures(className){
  const box = document.getElementById('lectureGrid');
  if(!box) return;
  TechLearnersContent.get('lectures', '../../data').then(data=>{
    const filtered = data.filter(v => v.class === className);
    box.innerHTML = filtered.map(v=>`
      <article class="card">
        <iframe src="https://www.youtube.com/embed/${v.videoId}" allowfullscreen></iframe>
        <h3>${v.title}</h3>
        <p>${v.description}</p>
      </article>`).join('');
  });
}
