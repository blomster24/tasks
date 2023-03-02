const { v4: uudiv4 } = require('uuid')

class Tarea {

    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc) {
        this.id = uudiv4();
        this.desc = desc;
        this.completadoEn = null;
    }

}

// Exportar por defecto, si se usa llaves toca hacer desestructuración
module.exports = Tarea;