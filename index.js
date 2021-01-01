function setGroup() {
  const number = Math.floor(Math.random() * 2 + 1);
  const gruppe = localStorage.getItem('gruppe');
  if (gruppe === null) {
    localStorage.setItem('gruppe', number);
  }
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
  const platzhalterText = document.getElementById('platzhalterText');
  platzhalterText.remove();
  const gruppeText = document.getElementById('gruppe');
  gruppeText.innerHTML = 'Gruppe: ' + localStorage.getItem('gruppe');

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
      checkIfUserAlreadyDidQuiz();
    }
  });
}

function closeModal() {
  document.body.classList.remove('confirm-alert-body-element');
  const modal = document.querySelector('.confirm-alert-overlay');
  modal.remove();
}

function checkIfUserAlreadyDidQuiz() {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  let datum = new Date().toLocaleString('de-De', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  data.datum = datum.slice(0, 10);
  data.uhrzeit = datum.slice(12, 20);
  let uploadData = { data: data };
  const gruppe = localStorage.getItem('gruppe');
  let id = '';
  if (gruppe === '1') {
    id = '5786';
  }
  if (gruppe === '2') {
    id = '5785';
  }
  const benutzer = uploadData.data.benutzername;
  const email = uploadData.data.email;
  fetch(`https://api.apispreadsheets.com/data/${id}/`).then((res) => {
    if (res.status === 200) {
      // SUCCESS
      res
        .json()
        .then((data) => {
          let resultFilteredByBenutzer = data.data.filter(
            (zeilen) => zeilen.benutzername === benutzer
          );
          let resultFilteredByEmail = data.data.filter(
            (zeilen) => zeilen.email === email
          );
          if (
            resultFilteredByBenutzer.length > 0 &&
            resultFilteredByEmail.length > 0
          ) {
            closeModal();
            showModal({
              art: 'fehler',
              messageText:
                'Mit disem Benutzernamen und der E-Mail Adresse wurde das Quiz schon einmal absolviert, deswegen wird dein Ergebnis nicht gewertet.',
              button1Show: false,
              button1Text: '',
              button2Show: true,
              button2Text: 'Hinweis schließen',
            });
          } else if (resultFilteredByBenutzer.length > 0) {
            closeModal();
            showModal({
              art: 'fehler',
              messageText:
                'Mit disem Benutzernamen wurde das Quiz schon einmal absolviert, deswegen wird dein Ergebnis nicht gewertet.',
              button1Show: false,
              button1Text: '',
              button2Show: true,
              button2Text: 'Hinweis schließen',
            });
          } else if (resultFilteredByEmail.length > 0) {
            closeModal();
            showModal({
              art: 'fehler',
              messageText:
                'Mit diser E-Mail Adresse wurde das Quiz schon einmal absolviert, deswegen wird dein Ergebnis nicht gewertet.',
              button1Show: false,
              button1Text: '',
              button2Show: true,
              button2Text: 'Hinweis schließen',
            });
          } else {
            uploadAnswers(uploadData);
          }
        })
        .catch((err) => console.log(err));
    } else {
      // ERROR
    }
  });
}

function uploadAnswers(uploadData) {
  closeModal();
  showModal({
    art: 'warten',
    messageText: 'Bitte warte kurz, deine Antworten werden ausgewertet',
    button1Show: false,
    button1Text: '',
    button2Show: false,
    button2Text: '',
  });
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
      getResult(uploadData);
    } else {
      // ERROR
    }
  });
}

function getResult(uploadData) {
  const gruppe = localStorage.getItem('gruppe');
  let id = '';
  if (gruppe === '1') {
    id = '5781';
  }
  if (gruppe === '2') {
    id = '5783';
  }
  const benutzer = uploadData.data.benutzername;
  fetch(`https://api.apispreadsheets.com/data/${id}/`).then((res) => {
    if (res.status === 200) {
      res
        .json()
        .then((data) => {
          let resultFilteredByBenutzer = data.data.filter(
            (zeilen) => zeilen.benutzername === benutzer
          );

          let messageText = '';
          if (resultFilteredByBenutzer[0].anzahlRichtigerAntworten === '1') {
            messageText = 'Du hast 1 Frage richtig beantwortet';
          } else {
            messageText = `Du hast ${resultFilteredByBenutzer[0].anzahlRichtigerAntworten} Fragen richtig beantwortet`;
          }
          closeModal();
          showModal({
            art: 'ergebnis',
            messageText: messageText,
            button1Show: false,
            button1Text: '',
            button2Show: true,
            button2Text: 'Hinweis schließen',
          });
        })
        .catch((err) => console.log(err));
    } else {
      // ERROR
    }
  });
}
