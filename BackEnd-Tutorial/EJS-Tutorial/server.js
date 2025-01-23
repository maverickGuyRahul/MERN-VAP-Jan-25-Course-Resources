import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import britishWomenNames from './BritishFemaleNamesList.js';

const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 5000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

// app.post('/submit', (req, res) => {
//   const frontEndData = req.body;
//   console.log(frontEndData.name);
//   res.render('MessageFile', frontEndData);
// });

app.post('/submit', (req, res) => {
  const frontEndData = req.body;
  console.log(frontEndData.name);
  const randomFemaleName =
    britishWomenNames[Math.floor(Math.random() * britishWomenNames.length)];
  res.render('MessageFile', {
    userName: frontEndData.name,
    crushName: randomFemaleName,
  });
});

// app.get('/', (req, res) => {
//   console.log(_dirname);
//   res.sendFile(_dirname + '/public/FormPage.html');
// });

app.get('/', (req, res) => {
  res.render('Home', { currentPage: 'home' });
});

app.get('/aboutus', (req, res) => {
  res.render('AboutUs', { currentPage: 'aboutus' });
});

app.get('/contactus', (req, res) => {
  res.render('ContactUs', { currentPage: 'contactus' });
});

app.listen(PORT, () => {
  console.log(
    `The server is up and running and listening for requests on Port No: ${PORT}`
  );
});
