/**********************************************/
/* -------- Algemeen server gedeelte -------- */
/**********************************************/
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// hier zijn de statische bestanden (html, css, ...) te vinden:
app.use(express.static('../public'))


// bepaal wat er moet gebeuren bij verzoeken op verschillende paden / routes van je URL:
// ⬇︎ HIER JE EIGEN AANPASSINGEN MAKEN ⬇︎
app.get('/', (_request, response) => {response.redirect('index.html'); })
app.get('/api/addButtonPress', addButtonPress);
app.get('/api/getTotalPresses', getTotalPresses);
app.get('/api/setKnikkerbaanStatus', setKnikkerbaanStatus);


// start de server en geef een berichtje in de console dat het gelukt is!
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})




/**********************************************/
/* ----------- Database gedeelte ------------ */
/**********************************************/
const Pool = require('pg').Pool

// gegevens en functies om in te loggen in de database
let connectionString = {
  user: 'api',
  database: 'knikkerbaan',
  password: 'apipass',
  host: 'localhost',
  port: 5432,
  ssl: false
};

if(process.env.GITPOD_WORKSPACE_ID === undefined) {
  connectionString = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
  };
} 

const pool = new Pool(connectionString);
pool.on('connect', () => console.log('connected to db'));



// Functies die bewerkingen op de database uitvoeren:
// ⬇︎ HIER JE EIGEN AANPASSINGEN MAKEN ⬇︎


/**
 * addButtonPress
 * 
 * voegt een nieuwe row toe aan tabel "buttonPresses"
 * en geeft de id van de nieuwe regel terug in de reponse
 * @param _request het webrequest dat deze bewerking startte
 * @param response het antwoord dat teruggegeven gaat worden.
 */
function addButtonPress(_request, response) {
  pool.query("INSERT INTO buttonPresses (tijd) VALUES (CURRENT_TIMESTAMP) RETURNING ID", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`ButtonPress added with ID: ${results.rows[0].id}`);
  });
}


/**
 * getTotalPresses
 * 
 * geeft de waarde van "ButtonPresses" uit de tabel algemeen terug in de respons
 * @param _request het webrequest dat deze bewerking startte
 * @param response het antwoord dat teruggegeven gaat worden.
 */
function getTotalPresses(_request, response){
  pool.query("SELECT waarde FROM algemeen WHERE naam = 'ButtonPresses';", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}


/**
 * setKnikkerbaanStatus
 * 
 * verandert de status in de waarde zoals meegegeven in het request
 * @param _request het webrequest dat deze bewerking startte
 * @param response het antwoord dat teruggegeven gaat worden.
 */
function setKnikkerbaanStatus(_request, response) {
  const newStatus = parseInt(request.params.id);
  pool.query("UPDATE algemeen SET waarde = $1 WHERE naam = 'BaanStatus'", [newStatus], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send('Status modified');
  });
}