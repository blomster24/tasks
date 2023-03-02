
const Tarea = require('./tarea')
/*
 _listado:
    { 'uuid-3146543216546: {id 12, desc: asdf. completadoEn: 12/12/12}}

*/

class Tareas {
    _listado = {};

    // Convierte el objeto _listado en un arreglo
    get listadoArray() {
        const listado = []
        // Al metodo .keys() se le pasa un objeto y le extrae las llaves
        // y retorna un arreglo, son strings
        Object.keys(this._listado)
            .forEach(key => {
                // Obtiene el objeto por medio de la llave que se le pasa en el foreach
                const tarea = this._listado[key];
                // Lo agrega al nuevo listado
                listado.push(tarea)
            })

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        // Mi solución a la tarea del video 56.
        /* for (let i = 0; i < tareas.length; i++) {
            this._listado[tareas.id] = tareas[i];
        } */

        // La solución del profe
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {

        // `${'1.'.green} :: Completada | Pendiente`

        console.log();
        this.listadoArray.forEach((tarea, i) => {
            const indice = `${(i + 1) + '.'}`.yellow;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red
            console.log(`${indice} ${desc} :: ${estado}`)
        })

        //    MI SOLUCIÓN
        /* let data = '\n';
        this.listadoArray.forEach(tarea => {
            data +=`${'1.'.green} ${tarea.desc} ${'::'.green} `;
            if(tarea.completadoEn=== null){
                data+= `${'Pendiente\n'.red}`;
            }else{
                data+= `${'Completada\n'.green}`;
            }

        })
        return data; */
    }

    listarPendientesCompletadas(completadas = true) {
        console.log();

        let contador = 0;
        this.listadoArray.forEach(tarea => {
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red

            if (completadas) {
                // Muestra completadas
                if (completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').yellow} ${desc} :: ${completadoEn.green}`)
                }
            } else {
                // Muestra pendientes
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').yellow} ${desc} :: ${estado}`)

                }
            }

        })

    }

    toggleCompletadas(ids = []) {

        ids.forEach(id => {
            const tarea = this._listado[id];

            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArray.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })

    }
}
module.exports = Tareas;