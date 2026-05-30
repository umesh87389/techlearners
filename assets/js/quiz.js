const quizBox = document.getElementById('quizBox');
let quizData = [];

TechLearnersContent.get('quizzes', '../../data')
  .then(data=>{
    quizData = data;
    quizBox.innerHTML = data.map((q,i)=>`
      <div class="list-item">
        <b>${i+1}. ${q.question}</b>
        ${q.options.map((o,j)=>`
          <label><input type="radio" name="q${i}" value="${j}"> ${o}</label>
        `).join('')}
      </div>
    `).join('');
  });

function submitQuiz(){
  let score = 0;
  quizData.forEach((q,i)=>{
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if(selected && Number(selected.value) === q.answer) score++;
  });
  document.getElementById('scoreText').textContent = `Your Score: ${score}/${quizData.length}`;
}
