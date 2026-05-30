document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('navMenu');
  if(btn && nav) btn.addEventListener('click', () => nav.classList.toggle('show'));

  const announcementList = document.getElementById('announcementList');
  if(announcementList){
    fetch('data/announcements.json').then(r=>r.json()).then(data=>{
      announcementList.innerHTML = data.map(a=>`<div class="list-item"><b>${a.title}</b><p>${a.message}</p></div>`).join('');
    }).catch(()=> announcementList.textContent='Unable to load announcements.');
  }
});

function loadNotes(className){
  const box = document.getElementById('notesList');
  if(!box) return;
  fetch('../../data/notes.json').then(r=>r.json()).then(data=>{
    const filtered = data.filter(n => n.class === className);
    box.innerHTML = filtered.map(n=>`
      <article class="card">
        <h3>${n.title}</h3>
        <p>${n.description}</p>
        <a href="../../${n.file}" download>Download</a>
      </article>`).join('');
  });
}

function loadLectures(className){
  const box = document.getElementById('lectureGrid');
  if(!box) return;
  fetch('../../data/lectures.json').then(r=>r.json()).then(data=>{
    const filtered = data.filter(v => v.class === className);
    box.innerHTML = filtered.map(v=>`
      <article class="card">
        <iframe src="https://www.youtube.com/embed/${v.videoId}" allowfullscreen></iframe>
        <h3>${v.title}</h3>
        <p>${v.description}</p>
      </article>`).join('');
  });
}
