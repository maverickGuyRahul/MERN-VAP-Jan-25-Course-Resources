import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import britishWomenNames from './BritishFemaleNamesList.js';

const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 5000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//   res.send('<h2> Hello ViMEET </h2>').status(200);
// });

app.post('/acceptname', (req, res) => {
  const incomingData = req.body;
  console.log(incomingData);
  // console.log(incomingData.name);
  // console.log(incomingData.cName);
  const name = incomingData.name;
  const cName = incomingData.cName;
  const randomPercentage = Math.floor(Math.random() * 100);
  // console.log(randomPercentage);
  const randomFemaleName =
    britishWomenNames[Math.floor(Math.random() * britishWomenNames.length)];
  res.render('CalculationResult', { passedName: name, randomPercent });
});

app.post('/login', (req, res) => {
  const incomingData = req.body;
  console.log(incomingData);
  res.send('<h1>You have logged in successfully</h1>');
});

app.get('/', (req, res) => {
  console.log(_dirname);
  res.sendFile(_dirname + '/public/ChemistryLevelCalculator.html');
});

app.listen(PORT, () => {
  console.log(
    `The server is up and running and listening for requests on Port No: ${PORT}`
  );
});
