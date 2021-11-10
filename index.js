//Fragen werden von Google Sheets geladen
let day = ''
function getQuestions(weekday) {
  day = weekday
  const headline = document.getElementById('headline')
  headline.innerHTML = 'Education Week Quiz ' + day

  fetch(
    `https://api.apispreadsheets.com/data/${keys[0].id}/?accessKey=${keys[0].accessKey}&secretKey=${keys[0].secretKey}`
  ).then((res) => {
    if (res.status === 200) {
      res
        .json()
        .then((fragenDaten) => {
          if (day === 'Montag') {
            fragenDaten = fragenDaten.data.filter(
              (frage) => frage.Tag === 'Montag'
            )
          }
          if (day === 'Dienstag') {
            fragenDaten = fragenDaten.data.filter(
              (frage) => frage.Tag === 'Dienstag'
            )
          }
          if (day === 'Mittwoch') {
            fragenDaten = fragenDaten.data.filter(
              (frage) => frage.Tag === 'Mittwoch'
            )
          }
          if (day === 'Donnerstag') {
            fragenDaten = fragenDaten.data.filter(
              (frage) => frage.Tag === 'Donnerstag'
            )
          }
          if (day === 'Freitag') {
            fragenDaten = fragenDaten.data.filter(
              (frage) => frage.Tag === 'Freitag'
            )
          }

          setHTML(fragenDaten)
        })
        .catch((err) => console.log(err))
    } else {
      // ERROR
      showModal({
        art: 'fehler',
        messageText: `Beim dem Quiz ist leider ein technischer Fehler aufgetreten. Versuche es bitte nochmal, indem du die Seite neu lädst. Wenn es weiterhin nicht funktioniert, schicke bitte eine kurze Email an <a href="mailto:support@tradity.de?subject=Quiz Fehler 401 bei Tabelle ${keys[0].id} Fragen">support@tradity.de</a>.`,
        button1Show: false,
        button1Text: '',
        button2Show: true,
        button2Text: 'Hinweis schließen',
      })
    }
  })
}

//Aus den geladenen Daten werden die Multiple-Choice Fragen gerendert
function setHTML(fragenDaten) {
  const form = document.getElementById('platzhalterFragen')
  const platzhalterText = document.getElementById('platzhalterText')
  platzhalterText.remove()

  fragenDaten.forEach((frage, index) => {
    let i = index

    if (frage.Fragennummer !== '' && frage.Art !== 'Frage ausblenden') {
      if (fragenDaten[i].Art === 'Multiple-Choice 4 Antworten') {
        let template = document
          .getElementById('4RadioButtons')
          .content.cloneNode(true)
        const frage = template.querySelector('#frage')
        frage.innerHTML =
          fragenDaten[i].Fragennummer + '. ' + fragenDaten[i].Frage
        const möglichkeit1 = template.querySelector('#möglichkeit1')
        möglichkeit1.innerHTML = fragenDaten[i].Antwortmöglichkeit1
        const möglichkeit2 = template.querySelector('#möglichkeit2')
        möglichkeit2.innerHTML = fragenDaten[i].Antwortmöglichkeit2
        const möglichkeit3 = template.querySelector('#möglichkeit3')
        möglichkeit3.innerHTML = fragenDaten[i].Antwortmöglichkeit3
        const möglichkeit4 = template.querySelector('#möglichkeit4')
        möglichkeit4.innerHTML = fragenDaten[i].Antwortmöglichkeit4

        const radios = template.querySelectorAll('input[type=radio]')
        radios.forEach((radio, index) => {
          radio.setAttribute('id', `frage${i + 1}radio${index + 1}`)
          radio.setAttribute('name', `frage${fragenDaten[i].Fragennummer}`)
          radio.setAttribute(
            'value',
            fragenDaten[i][`Antwortmöglichkeit${index + 1}`]
          )
        })

        const labels = template.querySelectorAll('.form-check-label')
        labels.forEach((label, index) => {
          label.setAttribute('for', `frage${i + 1}radio${index + 1}`)
        })

        form.appendChild(template)
      }

      if (fragenDaten[index].Art === 'Multiple-Choice 3 Antworten') {
        let template = document
          .getElementById('3RadioButtons')
          .content.cloneNode(true)
        const frage = template.querySelector('#frage')
        frage.innerHTML =
          fragenDaten[index].Fragennummer + '. ' + fragenDaten[index].Frage
        const möglichkeit1 = template.querySelector('#möglichkeit1')
        möglichkeit1.innerHTML = fragenDaten[index].Antwortmöglichkeit1
        const möglichkeit2 = template.querySelector('#möglichkeit2')
        möglichkeit2.innerHTML = fragenDaten[index].Antwortmöglichkeit2
        const möglichkeit3 = template.querySelector('#möglichkeit3')
        möglichkeit3.innerHTML = fragenDaten[index].Antwortmöglichkeit3

        const radios = template.querySelectorAll('input[type=radio]')
        radios.forEach((radio, index) => {
          radio.setAttribute('id', `frage${i + 1}radio${index + 1}`)
          radio.setAttribute('name', `frage${fragenDaten[i].Fragennummer}`)
          radio.setAttribute(
            'value',
            fragenDaten[i][`Antwortmöglichkeit${index + 1}`]
          )
        })

        const labels = template.querySelectorAll('.form-check-label')
        labels.forEach((label, index) => {
          label.setAttribute('for', `frage${i + 1}radio${index + 1}`)
        })

        form.appendChild(template)
      }

      if (fragenDaten[index].Art === 'Multiple-Choice 2 Antworten') {
        let template = document
          .getElementById('2RadioButtons')
          .content.cloneNode(true)
        const frage = template.querySelector('#frage')
        frage.innerHTML =
          fragenDaten[index].Fragennummer + '. ' + fragenDaten[index].Frage
        const möglichkeit1 = template.querySelector('#möglichkeit1')
        möglichkeit1.innerHTML = fragenDaten[index].Antwortmöglichkeit1
        const möglichkeit2 = template.querySelector('#möglichkeit2')
        möglichkeit2.innerHTML = fragenDaten[index].Antwortmöglichkeit2

        const radios = template.querySelectorAll('input[type=radio]')
        radios.forEach((radio, index) => {
          radio.setAttribute('id', `frage${i + 1}radio${index + 1}`)
          radio.setAttribute('name', `frage${fragenDaten[i].Fragennummer}`)
          radio.setAttribute(
            'value',
            fragenDaten[i][`Antwortmöglichkeit${index + 1}`]
          )
        })

        const labels = template.querySelectorAll('.form-check-label')
        labels.forEach((label, index) => {
          label.setAttribute('for', `frage${i + 1}radio${index + 1}`)
        })

        form.appendChild(template)
      }
    }
  })
  /* showModal({
    art: 'hochladen',
    messageText:
      'Die Education Week ist am Sonntag 7.02.21 um 18 Uhr abgelaufen. Deswegen wird dir dein erspielter Bonus nicht mehr gutgeschrieben für das Börsenspiel.',
    button1Show: false,
    button1Text: '',
    button2Show: true,
    button2Text: 'Hinweis schließen',
  }) */
}

//Bei Klick auf den Submit Button wird das Modal zur Bestätigung angezeigt
const form = document.querySelector('#quizForm')
form.addEventListener('submit', (event) => {
  event.preventDefault()
  showModal({
    art: 'hochladen',
    messageText:
      'Möchtest du deine Antworten wirklich abschicken? Du hast nur einmal die Möglichkeit am Quiz teilzunehmen.',
    button1Show: true,
    button1Text: 'Ja',
    button2Show: true,
    button2Text: 'Nein',
  })
})

//Diese Funktion rendert die Modale
function showModal({
  art,
  messageText,
  button1Show,
  button1Text,
  button2Show,
  button2Text,
}) {
  const modal = document.getElementById('modal').content.cloneNode(true)
  const message = modal.getElementById('message')
  message.innerHTML = messageText

  const button1 = modal.getElementById('button1')
  if (button1Show === true) {
    button1.innerHTML = button1Text
  } else {
    button1.remove()
  }
  const button2 = modal.getElementById('button2')
  if (button2Show === true) {
    button2.innerHTML = button2Text
  } else {
    button2.remove()
  }

  document.body.classList.add('confirm-alert-body-element')
  document.body.appendChild(modal)

  /* Modal lässt sich schließen, wenn man außerhalb des weißen Kasten klickt
  const overlay = document.querySelector('.confirm-alert-overlay')
  if (art !== 'warten') {
    overlay.addEventListener('click', (event) => {
      if (overlay === event.target) {
        closeModal()
      }
    })
  } */

  button2.addEventListener('click', () => {
    closeModal()
  })
  button1.addEventListener('click', () => {
    if (art === 'hochladen') {
      checkIfUserAlreadyDidQuiz()
    }
  })
}

//Funktion zum Schließen der Modale
function closeModal() {
  document.body.classList.remove('confirm-alert-body-element')
  const modal = document.querySelector('.confirm-alert-overlay')
  modal.remove()
}

//Diese Funktion überprüft anhand der Tabelle Alle Benutzer, ob der Benutzer schon einmal an dem Quiz teilgenommen hat
function checkIfUserAlreadyDidQuiz() {
  closeModal()
  showModal({
    art: 'warten',
    messageText: 'Bitte warte kurz, deine Antworten werden ausgewertet',
    button1Show: false,
    button1Text: '',
    button2Show: false,
    button2Text: '',
  })
  const formData = new FormData(form)
  const data = Object.fromEntries(formData)
  let datum = new Date().toLocaleString('de-De', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })
  data.datum = datum.slice(0, 10)
  data.uhrzeit = datum.slice(12, 20)
  data.benutzername = data.benutzername.toLowerCase().trim()
  let uploadData = { data: data }
  const benutzer = uploadData.data.benutzername
  const benutzerEmail = uploadData.data.email
  let indexKeys = 0
  if (day === 'Montag') {
    indexKeys = 1
  } else if (day === 'Dienstag') {
    indexKeys = 2
  } else if (day === 'Mittwoch') {
    indexKeys = 3
  } else if (day === 'Donnerstag') {
    indexKeys = 4
  } else if (day === 'Freitag') {
    indexKeys = 5
  }

  fetch(
    `https://api.apispreadsheets.com/data/${keys[indexKeys].id}/?accessKey=${keys[indexKeys].accessKey}&secretKey=${keys[indexKeys].secretKey}`
  ).then((res) => {
    if (res.status === 200) {
      res
        .json()
        .then((data) => {
          let resultFilteredByBenutzer = data.data.filter(
            (zeilen) => zeilen.benutzername === benutzer
          )
          let resultFilteredByEmail = data.data.filter(
            (zeilen) => zeilen.email === benutzerEmail
          )
          let dayLinks = [
            {
              day: 'Montag',
              link: 'index.html',
            },
            {
              day: 'Dienstag',
              link: 'tuesday.html',
            },
            {
              day: 'Mittwoch',
              link: 'wednesday.html',
            },
            {
              day: 'Donnerstag',
              link: 'thursday.html',
            },
            {
              day: 'Freitag',
              link: 'friday.html',
            },
          ]
          dayLinks = dayLinks.filter((object) => object.day !== day)

          if (
            resultFilteredByBenutzer.length > 0 ||
            resultFilteredByEmail.length > 0
          ) {
            closeModal()
            showModal({
              art: 'nutzername vergeben',
              messageText: `Mit diesem Benutzerdaten wurde das Quiz für <b>${day}</b> schon einmal absolviert. Hier gelangst du zu den Quiz der anderen Tage: 
              <a href="${dayLinks[0].link}">${dayLinks[0].day}</a>&nbsp;&nbsp;<a href="${dayLinks[1].link}">${dayLinks[1].day}</a>&nbsp;&nbsp;<a href="${dayLinks[2].link}">${dayLinks[2].day}</a>&nbsp;&nbsp;
              <a href="${dayLinks[3].link}">${dayLinks[3].day}</a>`,
              button1Show: false,
              button1Text: '',
              button2Show: true,
              button2Text: 'Hinweis schließen',
            })
          } else {
            uploadAnswers(uploadData)
          }
        })
        .catch((err) => console.log(err))
    } else {
      // ERROR
      showModal({
        art: 'fehler',
        messageText: `Beim dem Quiz ist leider ein technischer Fehler aufgetreten. Versuche es bitte nochmal, indem du die Seite neu lädst. Wenn es weiterhin nicht funktioniert, schicke bitte eine kurze Email an <a href="mailto:support@tradity.de?subject=Quiz Fehler 401 bei Tabelle ${keys[indexKeys].id} Antworten ${day}">support@tradity.de</a>.`,
        button1Show: false,
        button1Text: '',
        button2Show: true,
        button2Text: 'Hinweis schließen',
      })
    }
  })
}

//Wenn der Benutzer noch nicht teilgenommen hat, werden seine Antworten hochgeladen
function uploadAnswers(uploadData) {
  let indexKeys = 0
  if (day === 'Montag') {
    indexKeys = 1
  } else if (day === 'Dienstag') {
    indexKeys = 2
  } else if (day === 'Mittwoch') {
    indexKeys = 3
  } else if (day === 'Donnerstag') {
    indexKeys = 4
  } else if (day === 'Freitag') {
    indexKeys = 5
  }

  fetch(`https://api.apispreadsheets.com/data/${keys[indexKeys].id}/`, {
    method: 'POST',
    headers: {
      accessKey: keys[indexKeys].accessKey,
      secretKey: keys[indexKeys].secretKey,
    },
    body: JSON.stringify(uploadData),
  }).then((res) => {
    if (res.status === 201) {
      insertUser(uploadData)
    } else {
      // ERROR
      showModal({
        art: 'fehler',
        messageText: `Beim dem Quiz ist leider ein technischer Fehler aufgetreten. Versuche es bitte nochmal, indem du die Seite neu lädst. Wenn es weiterhin nicht funktioniert, schicke bitte eine kurze Email an <a href="mailto:support@tradity.de?subject=Quiz Fehler 401 bei Tabelle ${keys[indexKeys].id} Antworten ${day}">support@tradity.de</a>.`,
        button1Show: false,
        button1Text: '',
        button2Show: true,
        button2Text: 'Hinweis schließen',
      })
    }
  })
}

//Der Benutzer wird mit Benutzername in die Tabelle Alle Benutzer eingetragen, solange für ihn noch kein Eintrag existiert
function insertUser(uploadData) {
  let data = {}
  data.benutzername = uploadData.data.benutzername
  data.email = uploadData.data.email
  let dataToUpload = { data: data }

  fetch(
    `https://api.apispreadsheets.com/data/${keys[6].id}/?accessKey=${keys[6].accessKey}&secretKey=${keys[6].secretKey}`
  ).then((res) => {
    if (res.status === 200) {
      res
        .json()
        .then((data) => {
          let resultFilteredByBenutzer = data.data.filter(
            (zeilen) => zeilen.benutzername === dataToUpload.data.benutzername
          )
          //Der Benutzer wird nur in die Tabelle Alle Benutzer eingetragen, wenn er dort noch nicht steht
          if (resultFilteredByBenutzer.length === 0) {
            fetch(`https://api.apispreadsheets.com/data/${keys[6].id}/`, {
              method: 'POST',
              headers: {
                accessKey: keys[6].accessKey,
                secretKey: keys[6].secretKey,
              },
              body: JSON.stringify(dataToUpload),
            }).then((res) => {
              if (res.status === 201) {
                getResult(uploadData)
              } else {
                // ERROR
              }
            })
          } else {
            getResult(uploadData)
          }
        })

        .catch((err) => console.log(err))
    } else {
      // ERROR
      showModal({
        art: 'fehler',
        messageText: `Beim dem Quiz ist leider ein technischer Fehler aufgetreten. Versuche es bitte nochmal, indem du die Seite neu lädst. Wenn es weiterhin nicht funktioniert, schicke bitte eine kurze Email an <a href="mailto:support@tradity.de?subject=Quiz Fehler 401 bei Tabelle ${keys[6].id} Tabelle alle Benutzer">support@tradity.de</a>.`,
        button1Show: false,
        button1Text: '',
        button2Show: true,
        button2Text: 'Hinweis schließen',
      })
    }
  })
}

//Aus der Tabelle Auswertung Alle Benutzer wird das Ergebnis geladen
function getResult(uploadData) {
  const benutzer = uploadData.data.benutzername
  fetch(
    `https://api.apispreadsheets.com/data/${keys[7].id}/?accessKey=${keys[7].accessKey}&secretKey=${keys[7].secretKey}`
  ).then((res) => {
    if (res.status === 200) {
      res
        .json()
        .then((data) => {
          let resultFiltered = data.data.filter(
            (zeilen) => zeilen.benutzername === benutzer
          )

          let resultMonday = resultFiltered[0].ergebnisMontag
          let resultTuesday = resultFiltered[0].ergebnisDienstag
          let resultWednesday = resultFiltered[0].ergebnisMittwoch
          let resultThursday = resultFiltered[0].ergebnisDonnerstag
          let resultFriday = resultFiltered[0].ergebnisFreitag

          if (resultMonday === 'Jetzt teilnehmen!') {
            resultMonday = `<a href="./index.html">${resultMonday}</a>`
          } else if (resultMonday === '1') {
            resultMonday = String(resultMonday) + ' Punkt'
          } else {
            resultMonday = String(resultMonday) + ' Punkte'
          }

          if (resultTuesday === 'Jetzt teilnehmen!') {
            resultTuesday = `<a href="./tuesday.html">${resultTuesday}</a>`
          } else if (resultTuesday === '1') {
            resultTuesday = String(resultTuesday) + ' Punkt'
          } else {
            resultTuesday = String(resultTuesday) + ' Punkte'
          }

          if (resultWednesday === 'Jetzt teilnehmen!') {
            resultWednesday = `<a href="./wednesday.html">${resultWednesday}</a>`
          } else if (resultWednesday === '1') {
            resultWednesday = String(resultWednesday) + ' Punkt'
          } else {
            resultWednesday = String(resultWednesday) + ' Punkte'
          }

          if (resultThursday === 'Jetzt teilnehmen!') {
            resultThursday = `<a href="./thursday.html">${resultThursday}</a>`
          } else if (resultThursday === '1') {
            resultThursday = String(resultThursday) + ' Punkt'
          } else {
            resultThursday = String(resultThursday) + ' Punkte'
          }

          if (resultFriday === 'Jetzt teilnehmen!') {
            resultFriday = `<a href="./friday.html">${resultFriday}</a>`
          } else if (resultFriday === '1') {
            resultFriday = String(resultFriday) + ' Punkt'
          } else {
            resultFriday = String(resultFriday) + ' Punkte'
          }

          let currentDay = ''
          if (day === 'Montag') {
            currentDay = resultMonday
          } else if (day === 'Dienstag') {
            currentDay = resultTuesday
          } else if (day === 'Mittwoch') {
            currentDay = resultWednesday
          } else if (day === 'Donnerstag') {
            currentDay = resultThursday
          } else if (day === 'Freitag') {
            currentDay = resultFriday
          }

          let messageText = ''
          if (
            resultFiltered[0].ergebnisMontag !== 'Jetzt teilnehmen!' &&
            resultFiltered[0].ergebnisDienstag !== 'Jetzt teilnehmen!' &&
            resultFiltered[0].ergebnisMittwoch !== 'Jetzt teilnehmen!' &&
            resultFiltered[0].ergebnisDonnerstag !== 'Jetzt teilnehmen!' &&
            resultFiltered[0].ergebnisFreitag !== 'Jetzt teilnehmen!'
          ) {
            const points = currentDay.split(' ')
            messageText = `Du hast <b>${points[0]}</b> Fragen richtig beantwortet.</br></br>Das sind deine Ergebnisse:</br><b>Montag:</b> ${resultMonday}</br><b>Dienstag:</b> ${resultTuesday}</br><b>Mittwoch:</b> ${resultWednesday}</br><b>Donnerstag:</b> ${resultThursday}</br><b>Freitag:</b> ${resultFriday}</br></br>Glüchwunsch, du hast an allen 5 Quiz erfolgreich teilgenommen und dir dadurch insgesamt <b>${resultFiltered[0].extraKapital} €</b> extra Kapital für das Börsenspiel erarbeitet!</br></br>Es wäre uns eine große Hilfe, wenn du diese kurze Umfrage zur Education Week ausfüllen könntest: <a href="https://forms.gle/UGwyyFbesGyhBG9FA" target="_blank">Zur Umfrage</a>. Vielen Dank!`
          } else if (currentDay === '1 Punkt') {
            messageText = `Du hast <b>1</b> Frage richtig beantwortet.</br></br>Das sind deine Ergebnisse:</br><b>Montag:</b> ${resultMonday}</br><b>Dienstag:</b> ${resultTuesday}</br><b>Mittwoch:</b> ${resultWednesday}</br><b>Donnerstag:</b> ${resultThursday}</br><b>Freitag:</b> ${resultFriday}</br></br>Durch das Quiz hast du dir aktuell <b>${resultFiltered[0].extraKapital} €</b> extra Kapital für das Börsenspiel erarbeitet.`
          } else {
            const points = currentDay.split(' ')
            messageText = `Du hast <b>${points[0]}</b> Fragen richtig beantwortet.</br></br>Das sind deine Ergebnisse:</br><b>Montag:</b> ${resultMonday}</br><b>Dienstag:</b> ${resultTuesday}</br><b>Mittwoch:</b> ${resultWednesday}</br><b>Donnerstag:</b> ${resultThursday}</br><b>Freitag:</b> ${resultFriday}</br></br>Durch das Quiz hast du dir aktuell <b>${resultFiltered[0].extraKapital} €</b> extra Kapital für das Börsenspiel erarbeitet.`
          }

          closeModal()
          showModal({
            art: 'ergebnis',
            messageText: messageText,
            button1Show: false,
            button1Text: '',
            button2Show: true,
            button2Text: 'Hinweis schließen',
          })
        })
        .catch((err) => console.log(err))
    } else {
      // ERROR
      showModal({
        art: 'fehler',
        messageText: `Beim dem Quiz ist leider ein technischer Fehler aufgetreten. Versuche es bitte nochmal, indem du die Seite neu lädst. Wenn es weiterhin nicht funktioniert, schicke bitte eine kurze Email an <a href="mailto:support@tradity.de?subject=Quiz Fehler 401 bei Tabelle ${keys[7].id} Tabelle Auswertung Benutzer">support@tradity.de</a>.`,
        button1Show: false,
        button1Text: '',
        button2Show: true,
        button2Text: 'Hinweis schließen',
      })
    }
  })
}
