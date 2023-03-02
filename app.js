
require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

const { inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');



const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) { // cargar tareas
        // Establecer las tareas
        // TODO: 
        tareas.cargarTareasFromArray(tareasDB)
    }

    do {
        // Imprime el menú
        opt = await inquirerMenu();
        //console.log({ opt })

        switch (opt) {
            case '1':
                // Crear opción
                const desc = await leerInput('Descripción:')
                tareas.crearTarea(desc);
                break;
            case '2':
                // Listar opciones
                tareas.listadoCompleto();
                break;
            case '3':
                // Listar completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                // Listar pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                // compeltado | pendientes
                const ids = await mostrarListadoChecklist(tareas.listadoArray);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArray);
                if (id !== '0') {

                    const ok = await confirmar('¿Está seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log(' >Tarea borrada< '.bgGreen)
                    }
                }
                break;
        }

        guardarDB(tareas.listadoArray)

        console.log("\n")
        await pausa();

    } while (opt !== '0');

}

main()