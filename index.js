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
        .then((data) => {
          const yourData = data;
          console.log(yourData);
        })
        .catch((err) => console.log(err));
    } else {
      // ERROR
    }
  });
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
