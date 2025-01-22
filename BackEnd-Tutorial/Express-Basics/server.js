import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//   res.send('<h2> Hello ViMEET </h2>').status(200);
// });

app.post('/login', (req, res) => {
  const incomingData = req.body;
  console.log(incomingData);
  res.send('<h1>You have logged in successfully</h1>');
});

app.get('/', (req, res) => {
  console.log(_dirname);
  res.sendFile(_dirname + '/public/loginForm.html');
});

app.listen(PORT, () => {
  console.log(
    `The server is up and running and listening for requests on Port No: ${PORT}`
  );
});
