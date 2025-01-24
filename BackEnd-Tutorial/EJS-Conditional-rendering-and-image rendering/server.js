import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 5000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

const data = {
  favDish: 'Chhola Bhatoora',
};

// app.get('/', (req, res) => {
//   res.render('Home', { currentPage: 'home', favDish: data.favDish });
// });

app.get('/', (req, res) => {
  res.render('Home', { currentPage: 'home', userName: 'Apurva' });
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
