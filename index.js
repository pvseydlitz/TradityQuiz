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
  const form = document.getElementById('platzhalterFragen');

  fragenDaten.data.forEach((frage, index) => {
    let i = index;
    if (frage.Fragennummer !== '' && frage.Art !== 'Frage ausblenden') {
      if (fragenDaten.data[i].Art === 'Multiple-Choice 4 Antworten') {
        let template = document
          .getElementById('4RadioButtons')
          .content.cloneNode(true);
        const frage = template.querySelector('#frage');
        frage.innerHTML =
          fragenDaten.data[i].Fragennummer + '. ' + fragenDaten.data[i].Frage;
        const möglichkeit1 = template.querySelector('#möglichkeit1');
        möglichkeit1.innerHTML = fragenDaten.data[i].Antwortmöglichkeit1;
        const möglichkeit2 = template.querySelector('#möglichkeit2');
        möglichkeit2.innerHTML = fragenDaten.data[i].Antwortmöglichkeit2;
        const möglichkeit3 = template.querySelector('#möglichkeit3');
        möglichkeit3.innerHTML = fragenDaten.data[i].Antwortmöglichkeit3;
        const möglichkeit4 = template.querySelector('#möglichkeit4');
        möglichkeit4.innerHTML = fragenDaten.data[i].Antwortmöglichkeit4;

        const radios = template.querySelectorAll('input[type=radio]');
        radios.forEach((radio, index) => {
          radio.setAttribute(
            'name',
            `frage${fragenDaten.data[i].Fragennummer}`
          );
          radio.setAttribute(
            'value',
            fragenDaten.data[i][`Antwortmöglichkeit${index + 1}`]
          );
        });

        form.appendChild(template);
      }
      if (fragenDaten.data[index].Art === 'Multiple-Choice 3 Antworten') {
        let template = document
          .getElementById('3RadioButtons')
          .content.cloneNode(true);
        const frage = template.querySelector('#frage');
        frage.innerHTML =
          fragenDaten.data[index].Fragennummer +
          '. ' +
          fragenDaten.data[index].Frage;
        const möglichkeit1 = template.querySelector('#möglichkeit1');
        möglichkeit1.innerHTML = fragenDaten.data[index].Antwortmöglichkeit1;
        const möglichkeit2 = template.querySelector('#möglichkeit2');
        möglichkeit2.innerHTML = fragenDaten.data[index].Antwortmöglichkeit2;
        const möglichkeit3 = template.querySelector('#möglichkeit3');
        möglichkeit3.innerHTML = fragenDaten.data[index].Antwortmöglichkeit3;

        const radios = template.querySelectorAll('input[type=radio]');
        radios.forEach((radio, index) => {
          radio.setAttribute(
            'name',
            `frage${fragenDaten.data[i].Fragennummer}`
          );
          radio.setAttribute(
            'value',
            fragenDaten.data[i][`Antwortmöglichkeit${index + 1}`]
          );
        });
        form.appendChild(template);
      }
      if (fragenDaten.data[index].Art === 'Multiple-Choice 2 Antworten') {
        let template = document
          .getElementById('2RadioButtons')
          .content.cloneNode(true);
        const frage = template.querySelector('#frage');
        frage.innerHTML =
          fragenDaten.data[index].Fragennummer +
          '. ' +
          fragenDaten.data[index].Frage;
        const möglichkeit1 = template.querySelector('#möglichkeit1');
        möglichkeit1.innerHTML = fragenDaten.data[index].Antwortmöglichkeit1;
        const möglichkeit2 = template.querySelector('#möglichkeit2');
        möglichkeit2.innerHTML = fragenDaten.data[index].Antwortmöglichkeit2;

        const radios = template.querySelectorAll('input[type=radio]');
        radios.forEach((radio, index) => {
          radio.setAttribute(
            'name',
            `frage${fragenDaten.data[i].Fragennummer}`
          );
          radio.setAttribute(
            'value',
            fragenDaten.data[i][`Antwortmöglichkeit${index + 1}`]
          );
        });
        form.appendChild(template);
      }
    }
  });
}

const form = document.querySelector('#quizForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.target);
  const data = Object.fromEntries(form);
  data.datum = new Date();
  console.log(data);
  let uploadData = { data: data };
  console.log(uploadData);
  fetch('https://api.apispreadsheets.com/data/5770/', {
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
