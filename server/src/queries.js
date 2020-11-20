const Pool = require('pg').Pool

// development credential
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




function addButtonPress(_request, response) {
  pool.query("insert into buttonPresses (tijd) VALUES (CURRENT_TIMESTAMP) RETURNING ID", (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results);
    response.status(201).send(`ButtonPress added with ID: ${results.rows[0].id}`);
  });
}

function getTotalPresses(_request, response){
  pool.query("SELECT waarde FROM algemeen WHERE naam = 'ButtonPresses';", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

function setKnikkerbaanStatus(_request, response) {
  const newStatus = parseInt(request.params.id);
  pool.query("UPDATE algemeen SET waarde = $1 WHERE naam = 'BaanStatus'", [newStatus], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send('Status modified');
  });
}





module.exports = {
  addButtonPress,
  getTotalPresses,
  setKnikkerbaanStatus
}
