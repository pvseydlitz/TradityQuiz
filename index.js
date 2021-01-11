//Fragen werden von Google Sheets geladen
let day = '';
function getQuestions(weekday) {
  day = weekday;
  const headline = document.getElementById('headline');
  headline.innerHTML = 'Education Week Quiz ' + day;
  fetch('https://api.apispreadsheets.com/data/6243/').then((res) => {
    if (res.status === 200) {
      res
        .json()
        .then((fragenDaten) => {
          if (day === 'Montag') {
            fragenDaten = fragenDaten.data.filter(
              (frage) => frage.Tag === 'Montag'
            );
          }
          if (day === 'Dienstag') {
            fragenDaten = fragenDaten.data.filter(
              (frage) => frage.Tag === 'Dienstag'
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
  console.log(day);
  const form = document.getElementById('platzhalterFragen');
  const platzhalterText = document.getElementById('platzhalterText');
  platzhalterText.remove();

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

//Funktion zum Schließen des Modales
function closeModal() {
  document.body.classList.remove('confirm-alert-body-element');
  const modal = document.querySelector('.confirm-alert-overlay');
  modal.remove();
}

//Diese Funktion überprüft anhand der Tabelle Alle Benutzer, ob der Benutzer schon einmal an dem Quiz teilgenommen hat
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

  const benutzer = uploadData.data.benutzername;
  const email = uploadData.data.email;
  let id = '';
  if (day === 'Montag') {
    id = '6245';
  }
  fetch(`https://api.apispreadsheets.com/data/${id}/`).then((res) => {
    if (res.status === 200) {
      res
        .json()
        .then((data) => {
          let resultFilteredByBenutzer = data.data.filter(
            (zeilen) => zeilen.benutzername === benutzer
          );
          let resultFilteredByEmail = data.data.filter(
            (zeilen) => zeilen.email === email
          );
          let dayLinks = [
            {
              day: 'Montag',
              link: 'index.html',
            },
            {
              day: 'Dienstag',
              link: 'tuesday.html',
            },
          ];
          console.log(dayLinks);
          dayLinks = dayLinks.filter((object) => object.day !== day);
          console.log(dayLinks);
          if (
            resultFilteredByBenutzer.length > 0 &&
            resultFilteredByEmail.length > 0
          ) {
            closeModal();
            showModal({
              art: 'fehler',
              messageText: `Mit disem Benutzernamen und der E-Mail Adresse wurde das Quiz für <b>${day}</b> schon einmal absolviert. Hier gelangst du zu den Quiz der anderen Tage: 
              <a href="${dayLinks[0].link}">${dayLinks[0].day}</a>`,
              button1Show: false,
              button1Text: '',
              button2Show: true,
              button2Text: 'Hinweis schließen',
            });
          } else if (resultFilteredByBenutzer.length > 0) {
            closeModal();
            showModal({
              art: 'fehler',
              messageText: `Mit disem Benutzernamen wurde das Quiz für <b>${day}</b> schon einmal absolviert. Hier gelangst du zu den Quiz der anderen Tage: 
              <a href="${dayLinks[0].link}">${dayLinks[0].day}</a>`,
              button1Show: false,
              button1Text: '',
              button2Show: true,
              button2Text: 'Hinweis schließen',
            });
          } else if (resultFilteredByEmail.length > 0) {
            closeModal();
            showModal({
              art: 'fehler',
              messageText: `Mit diser E-Mail Adresse wurde das Quiz für <b>${day}</b> schon einmal absolviert. Hier gelangst du zu den Quiz der anderen Tage: 
              <a href="${dayLinks[0].link}">${dayLinks[0].day}</a>`,
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

//Wenn der Benutzer noch nicht teilgenommen hat, werden seine Antworten hochgeladen
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
  let id = '';
  if (day === 'Montag') {
    id = '6245';
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

//Aus der Tabelle Auswertung Gruppe 1 oder 2 wird das Ergebnis an richtig beantworteten Fragen ausgelesen
function getResult(uploadData) {
  let id = '';
  if (day === 'Montag') {
    id = '6249';
  }
  if (day === 'Dienstag') {
    id = '';
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

//Der Benutzer wird in die mit Email, Benutzername und Gruppe in die Tabelle Alle Benutzer eingetragen
/* function insertUser(uploadData) {
  let data = {};
  data.gruppe = localStorage.getItem('gruppe');
  data.benutzername = uploadData.data.benutzername;
  data.email = uploadData.data.email;
  let dataToUpload = { data: data };
  fetch('https://api.apispreadsheets.com/data/5861/', {
    method: 'POST',
    body: JSON.stringify(dataToUpload),
  }).then((res) => {
    if (res.status === 201) {
      getResult(uploadData);
    } else {
      // ERROR
    }
  });
} */
