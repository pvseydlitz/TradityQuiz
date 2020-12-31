function setGroup() {
  const number = Math.floor(Math.random() * 2 + 1);
  const gruppe = localStorage.getItem('gruppe');
  if (gruppe === null) {
    localStorage.setItem('gruppe', number);
  }
  console.log(gruppe);
  getQuestions();
}

//Fragen werden von Google Sheets geladen
function getQuestions() {
  fetch('https://api.apispreadsheets.com/data/5767/').then((res) => {
    if (res.status === 200) {
      res
        .json()
        .then((fragenDaten) => {
          const gruppe = localStorage.getItem('gruppe');
          if (gruppe === '1') {
            fragenDaten = fragenDaten.data.filter(
              (frage) => frage.Gruppe === '1'
            );
          }
          if (gruppe === '2') {
            fragenDaten = fragenDaten.data.filter(
              (frage) => frage.Gruppe === '2'
            );
          }
          setHTML(fragenDaten);
        })
        .catch((err) => console.log(err));
    } else {
      // ERROR
    }
  });
}

//Aus den geladenen Daten werden die Multiple-Choice Fragen gerendert
function setHTML(fragenDaten) {
  const form = document.getElementById('platzhalterFragen');

  fragenDaten.forEach((frage, index) => {
    let i = index;
    if (frage.Fragennummer !== '' && frage.Art !== 'Frage ausblenden') {
      if (fragenDaten[i].Art === 'Multiple-Choice 4 Antworten') {
        let template = document
          .getElementById('4RadioButtons')
          .content.cloneNode(true);
        const frage = template.querySelector('#frage');
        frage.innerHTML =
          fragenDaten[i].Fragennummer + '. ' + fragenDaten[i].Frage;
        const möglichkeit1 = template.querySelector('#möglichkeit1');
        möglichkeit1.innerHTML = fragenDaten[i].Antwortmöglichkeit1;
        const möglichkeit2 = template.querySelector('#möglichkeit2');
        möglichkeit2.innerHTML = fragenDaten[i].Antwortmöglichkeit2;
        const möglichkeit3 = template.querySelector('#möglichkeit3');
        möglichkeit3.innerHTML = fragenDaten[i].Antwortmöglichkeit3;
        const möglichkeit4 = template.querySelector('#möglichkeit4');
        möglichkeit4.innerHTML = fragenDaten[i].Antwortmöglichkeit4;

        const radios = template.querySelectorAll('input[type=radio]');
        radios.forEach((radio, index) => {
          radio.setAttribute('name', `frage${fragenDaten[i].Fragennummer}`);
          radio.setAttribute(
            'value',
            fragenDaten[i][`Antwortmöglichkeit${index + 1}`]
          );
        });

        form.appendChild(template);
      }
      if (fragenDaten[index].Art === 'Multiple-Choice 3 Antworten') {
        let template = document
          .getElementById('3RadioButtons')
          .content.cloneNode(true);
        const frage = template.querySelector('#frage');
        frage.innerHTML =
          fragenDaten[index].Fragennummer + '. ' + fragenDaten[index].Frage;
        const möglichkeit1 = template.querySelector('#möglichkeit1');
        möglichkeit1.innerHTML = fragenDaten[index].Antwortmöglichkeit1;
        const möglichkeit2 = template.querySelector('#möglichkeit2');
        möglichkeit2.innerHTML = fragenDaten[index].Antwortmöglichkeit2;
        const möglichkeit3 = template.querySelector('#möglichkeit3');
        möglichkeit3.innerHTML = fragenDaten[index].Antwortmöglichkeit3;

        const radios = template.querySelectorAll('input[type=radio]');
        radios.forEach((radio, index) => {
          radio.setAttribute('name', `frage${fragenDaten[i].Fragennummer}`);
          radio.setAttribute(
            'value',
            fragenDaten[i][`Antwortmöglichkeit${index + 1}`]
          );
        });
        form.appendChild(template);
      }
      if (fragenDaten[index].Art === 'Multiple-Choice 2 Antworten') {
        let template = document
          .getElementById('2RadioButtons')
          .content.cloneNode(true);
        const frage = template.querySelector('#frage');
        frage.innerHTML =
          fragenDaten[index].Fragennummer + '. ' + fragenDaten[index].Frage;
        const möglichkeit1 = template.querySelector('#möglichkeit1');
        möglichkeit1.innerHTML = fragenDaten[index].Antwortmöglichkeit1;
        const möglichkeit2 = template.querySelector('#möglichkeit2');
        möglichkeit2.innerHTML = fragenDaten[index].Antwortmöglichkeit2;

        const radios = template.querySelectorAll('input[type=radio]');
        radios.forEach((radio, index) => {
          radio.setAttribute('name', `frage${fragenDaten[i].Fragennummer}`);
          radio.setAttribute(
            'value',
            fragenDaten[i][`Antwortmöglichkeit${index + 1}`]
          );
        });
        form.appendChild(template);
      }
    }
  });
}

//Bei Klick auf den Submit Button wird das Modal zur Bestätigung angezeigt
const form = document.querySelector('#quizForm');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  showModal({
    art: 'hochladen',
    messageText:
      'Möchtest du deine Antworten wirklich abschicken? Du hast nur einmal die Möglichkeit am Quiz teilzunehmen.',
    button1Show: true,
    button1Text: 'Ja',
    button2Show: true,
    button2Text: 'Nein',
  });
});

//Diese Funktion rendert das Modal
function showModal({
  art,
  messageText,
  button1Show,
  button1Text,
  button2Show,
  button2Text,
}) {
  console.log('show Modal');
  const modal = document.getElementById('modal').content.cloneNode(true);
  const message = modal.getElementById('message');
  message.innerHTML = messageText;
  const button1 = modal.getElementById('button1');
  if (button1Show === true) {
    button1.innerHTML = button1Text;
  } else {
    button1.remove();
  }
  const button2 = modal.getElementById('button2');
  if (button2Show === true) {
    button2.innerHTML = button2Text;
  } else {
    button2.remove();
  }
  document.body.classList.add('confirm-alert-body-element');
  document.body.appendChild(modal);
  const overlay = document.querySelector('.confirm-alert-overlay');
  overlay.addEventListener('click', (event) => {
    if (overlay === event.target) {
      closeModal();
    }
  });
  button2.addEventListener('click', () => {
    closeModal();
  });
  button1.addEventListener('click', () => {
    if (art === 'hochladen') {
      uploadAnswers();
      closeModal();
    }
  });
}

function closeModal() {
  document.body.classList.remove('confirm-alert-body-element');
  const modal = document.querySelector('.confirm-alert-overlay');
  modal.remove();
}

function uploadAnswers() {
  showModal({
    art: 'warten',
    messageText: 'Bitte warte kurz, deine Antworten werden ausgewertet',
    button1Show: false,
    button1Text: '',
    button2Show: false,
    button2Text: '',
  });
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  data.datum = new Date();
  let uploadData = { data: data };
  console.log(uploadData);
  const gruppe = localStorage.getItem('gruppe');
  let id = '';
  if (gruppe === '1') {
    id = '5786';
  }
  if (gruppe === '2') {
    id = '5785';
  }
  fetch(`https://api.apispreadsheets.com/data/${id}/`, {
    method: 'POST',
    body: JSON.stringify(uploadData),
  }).then((res) => {
    if (res.status === 201) {
      console.log('Success');
      getResult();
    } else {
      // ERROR
    }
  });
}

function getResult() {
  const gruppe = localStorage.getItem('gruppe');
  let id = '';
  if (gruppe === '1') {
    id = '5781';
  }
  if (gruppe === '2') {
    id = '5783';
  }
  fetch(`https://api.apispreadsheets.com/data/${id}/`).then((res) => {
    if (res.status === 200) {
      // SUCCESS
      res
        .json()
        .then((data) => {
          console.log(data.data[2].anzahlRichtigerAntworten);
          closeModal();
          showModal({
            art: 'ergebnis',
            messageText: `Du hast ${data.data[5].anzahlRichtigerAntworten} Fragen richtig beantwortet`,
            button1Show: false,
            button1Text: '',
            button2Show: true,
            button2Text: 'Modal schließen',
          });
        })
        .catch((err) => console.log(err));
    } else {
      // ERROR
    }
  });
}
