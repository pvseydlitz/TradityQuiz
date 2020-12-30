function setGroup() {
  const number = Math.floor(Math.random() * 2 + 1);
  console.log(number);
  setQuestions();
}

function setQuestions() {
  fetch('https://api.apispreadsheets.com/data/5767/').then((res) => {
    if (res.status === 200) {
      // SUCCESS
      res
        .json()
        .then((fragenDaten) => {
          console.log(fragenDaten);
          setHTML(fragenDaten);
        })
        .catch((err) => console.log(err));
    } else {
      // ERROR
    }
  });
}

function setHTML(fragenDaten) {
  const form = document.getElementById('quizForm');
  if (fragenDaten.data[0].Art === 'Multiple-Choice 4 Antworten') {
    let template = document
      .getElementById('4RadioButtons')
      .content.cloneNode(true);
    const frage = template.querySelector('#frage');
    frage.innerHTML = fragenDaten.data[0].Frage;
    const möglichkeit1 = template.querySelector('#möglichkeit1');
    möglichkeit1.innerHTML = fragenDaten.data[0].Antwortmöglichkeit1;
    const möglichkeit2 = template.querySelector('#möglichkeit2');
    möglichkeit2.innerHTML = fragenDaten.data[0].Antwortmöglichkeit2;
    const möglichkeit3 = template.querySelector('#möglichkeit3');
    möglichkeit3.innerHTML = fragenDaten.data[0].Antwortmöglichkeit3;
    const möglichkeit4 = template.querySelector('#möglichkeit4');
    möglichkeit4.innerHTML = fragenDaten.data[0].Antwortmöglichkeit4;
    form.appendChild(template);
  }
  if (fragenDaten.data[0].Art === 'Multiple-Choice 3 Antworten') {
    let template = document
      .getElementById('3RadioButtons')
      .content.cloneNode(true);
    const frage = template.querySelector('#frage');
    frage.innerHTML = fragenDaten.data[0].Frage;
    const möglichkeit1 = template.querySelector('#möglichkeit1');
    möglichkeit1.innerHTML = fragenDaten.data[0].Antwortmöglichkeit1;
    const möglichkeit2 = template.querySelector('#möglichkeit2');
    möglichkeit2.innerHTML = fragenDaten.data[0].Antwortmöglichkeit2;
    const möglichkeit3 = template.querySelector('#möglichkeit3');
    möglichkeit3.innerHTML = fragenDaten.data[0].Antwortmöglichkeit3;
    form.appendChild(template);
  }
  if (fragenDaten.data[0].Art === 'Multiple-Choice 2 Antworten') {
    let template = document
      .getElementById('2RadioButtons')
      .content.cloneNode(true);
    const frage = template.querySelector('#frage');
    frage.innerHTML = fragenDaten.data[0].Frage;
    const möglichkeit1 = template.querySelector('#möglichkeit1');
    möglichkeit1.innerHTML = fragenDaten.data[0].Antwortmöglichkeit1;
    const möglichkeit2 = template.querySelector('#möglichkeit2');
    möglichkeit2.innerHTML = fragenDaten.data[0].Antwortmöglichkeit2;
    form.appendChild(template);
  }
}

function submitData() {
  const form = document.forms['quiz'];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData(event.target);
    const data = Object.fromEntries(form);
    console.log(data);
    let uploadData = { data: data };
    console.log(uploadData);
    fetch('https://api.apispreadsheets.com/data/5333/', {
      method: 'POST',
      body: JSON.stringify(uploadData),
    }).then((res) => {
      if (res.status === 201) {
        console.log('Success');
      } else {
        // ERROR
      }
    });
  });
}
