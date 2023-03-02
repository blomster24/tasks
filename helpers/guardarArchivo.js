const fs = require('fs');

const archivo = './db/data.json';

const guardarDB = (data) => {

    // JSON.stringify convierte un objeto a su version en string
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = () => {

    if (!fs.existsSync(archivo)) return null;

    const info = fs.readFileSync(archivo, { encoding: 'utf8' });
    const data = JSON.parse(info);
    //console.log(data);

    return data;
}

module.exports = {
    guardarDB,
    leerDB
};