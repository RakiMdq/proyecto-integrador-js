const prompt = require("prompt-sync")({ sigint: true });

//array para almacenar las tareas
let tareas = [];
let categoriasNombres = [
    "Trabajo",
    "Personal",
];

//funcion que muestra todas las categorias
function mostrarTodasLasCategorias() {
    console.log("Categorias Existentes: ");
    categoriasNombres.forEach(function (categoria, indice) {
        console.log(indice + ": " + categoria);
    });
}
//agregar categorias
function agregarCategoriasPorUsuario(nombreCategoria) {
    categoriasNombres.push(nombreCategoria);
    console.log("Categoria " + nombreCategoria + " agregada correctamente");
}

//funcion para agregar una tarea al array

function agregarTarea(nombreRecibido, fechaLimiteRecibida = null) {

    mostrarTodasLasCategorias();
    let numeroCategoria = parseInt(prompt("Ingrese el numero de la categoria: "));
    if (numeroCategoria >= 0 && numeroCategoria < categoriasNombres.length) {
        tareas.push({
            nombre: nombreRecibido,
            completada: false,
            fechaLimite: fechaLimiteRecibida,
            categoria: numeroCategoria
        });
        console.log("La tarea fue cargada con exito");
    } else {
        console.log("Numero de categoria incorrecto");
    }

}

//eliminar una tarea
function eliminarTarea(indice) {
    if (indice >= 0 && indice < tareas.length) {
        tareas.splice(indice, 1);
        console.log("La tarea fue eliminada");
    } else {
        console.log("Indice de tarea inexistente");
    }
}
//marcar una tarea completada
function tareaCompletada(indice) {
    if (indice >= 0 && indice < tareas.length) {
        tareas[indice].completada = true;
        console.log("Tarea completada")
    } else {
        console.log("Indice de tarea inexistente");
    }
}

//modificar una tarea
function modificarTarea(indice, nuevoNombre, nuevaFecha = null, nuevoNumeroCategoria) {
    if (indice >= 0 && indice < tareas.length) {
        tareas[indice].nombre = nuevoNombre !== undefined ? nuevoNombre : tareas[indice].nombre;
        tareas[indice].fechaLimite = nuevaFecha !== undefined ? nuevaFecha : tareas[indice].fechaLimite;
        tareas[indice].categoria = nuevoNumeroCategoria !== undefined ? nuevoNumeroCategoria : tareas[indice].categoria;
        console.log("Modificacion correcta");

    } else {
        console.log("Indice de tarea inexistente");
    }
}
//funcion que filtra tareas por actegoria
function filtarTareasPorCategoria(numeroDeCategoria) {
    let tareasFiltradas = tareas.filter(function (tarea) {
        return tarea.categoria === numeroDeCategoria;
    });
    return tareasFiltradas;
}

//funcion que muestra tareas completadas
function contarTareasCompletasPorCategoria(numeroDeCategoria) {
    let tareasCategoria = filtarTareasPorCategoria(numeroDeCategoria);
    let tareasCompletas = tareasCategoria.reduce(function (contador, tarea) {
        return tarea.completada ? contador + 1 : contador;
    }, 0);
    let tareasEnTotal = tareasCategoria.length;
    console.log("Tareas completas de la categoria " + numeroDeCategoria + ": " + tareasCompletas + " de " + tareasEnTotal + " tareas");
}
//mostrar todas las tareas no completadas
function mostrarTareasNoCompletadas() {
    console.log("Tareas no completadas: ");
    tareas.forEach(function (tarea) {
        if (!tarea.completada) {
            console.log(" Nombre: " + tarea.nombre + "- Categoria: " + categoriasNombres[tarea.categoria]);
        }
    });
}
//funcion que ordena las tareas por la proiedad nombre con bubble sorts
function ordenarTareasPorNombre() {
    let total = tareas.length;
    for (let j = 0; j < total; j++) {
        for (let i = 0; i < total - 1; i++) {
            if (tareas[i].nombre > tareas[i + 1].nombre) {
                let temp = tareas[i];
                tareas[i] = tareas[i + 1];
                tareas[i + 1] = temp;
            }
        }
    }
}
//ordenar por fecha
function ordenarTareasPorFecha() {
    let total = tareas.length;
    for (let j = 0; j < total; j++) {
        for (let i = 0; i < total - 1; i++) {
            if (tareas[i].fechaLimite > tareas[i + 1].fechaLimite) {
                let temp = tareas[i];
                tareas[i] = tareas[i + 1];
                tareas[i + 1] = temp;
            }
        }
    }
}
//funcion para busqueda de tarea en especifico
function buscarTareaPorNombre(nombreTarea) {
    let inicio = 0;
    let fin = tareas.length - 1;
    while (inicio <= fin) {
        let posElementoMedio = Math.round((inicio + fin) / 2);
        let elementoMedio = tareas[posElementoMedio];
        if (tareas[posElementoMedio].nombre === nombreTarea) {
            return posElementoMedio;
        } else if (tareas[posElementoMedio].nombre < nombreTarea) {
            inicio = posElementoMedio + 1;
        } else {
            fin = posElementoMedio - 1;
        }
    }
    return -1;
}


//funcion para mostar menu
function mostarMenu() {
    console.log("--------MENU----------");
    console.log("1. Agregar tarea");
    console.log("2. Eliminar tarea");
    console.log("3. Marcar tarea completada");
    console.log("4. Modificar tarea");
    console.log("5. Mostrar todas las tareas");
    console.log("6. Ver todas las categorias");
    console.log("7. Agregar una nueva categoria");
    console.log("8. Filtrar tareas por categoria");
    console.log("9. Visualizar cantidad de tareas completadas por categoria");
    console.log("10. Visualizar tareas que faltan completar");
    console.log("11. Ordenar las tareas por Nombre");
    console.log("12. Ordenar las tareas por Fecha");
    console.log("13. Buscar tarea por Nombre");
    console.log("0. Salir");
}

//funcion para interactuar
function interactuarUsuario() {
    let opcion = -1;
    while (opcion != 0) {
        mostarMenu();
        opcion = parseInt(prompt("Ingrese la opcion deseada: "));
        switch (opcion) {
            case 1:
                let nombreTarea = prompt("Ingrese la tarea: ");
                //let fechaTarea= 
                agregarTarea(nombreTarea);
                break;
            case 2:
                let indiceEliminar = parseInt(prompt("Ingrese el indice de la tarea a eliminar: "));
                eliminarTarea(indiceEliminar);
                break;
            case 3:
                let marcaCompletada = parseInt(prompt("Ingrese el indice de la tarea para pasar a completada: "));
                tareaCompletada(marcaCompletada);
                break;
            case 4:
                let indice = parseInt(prompt("Ingrese el indice de la tarea a modificar: "));
                if (indice >= 0 && indice < tareas.length) {
                    let opcion = parseInt(prompt("Ingrese la opcion que desea modificar: 1. Nombre 2. Fecha Limite 3. Numero de categoria"));
                    switch (opcion) {
                        case 1:
                            let nombreNombre = prompt("Ingrese el nuevo nombre se su tarea ");
                            modificarTarea(indice, nombreNombre);
                            break;
                        case 2:
                            let fechaFecha = prompt("Ingrese la nueva fecha ");
                            modificarTarea(indice, undefined, fechaFecha);
                            break;
                        case 3:
                            let numeroNumero = parent(prompt("Ingrese nuevo numero de categoria "));
                            if (numeroNumero >= 0 && numeroNumero < categoriasNombres.length) {
                                modificarTarea(indice, undefined, numeroNumero);
                            } else {
                                console.log("Ingreso un numero inexistente");
                            }

                            break;
                        default:
                            console.log("Ingrese una opcion correcta");
                            break;
                    }
                } else {
                    console.log("Indice tarea incorrecto");
                }

                break;
            case 5:
                console.log("LISTA DE TAREAS");
                console.log(tareas);
                break;
            case 6:
                mostrarTodasLasCategorias();
                break;
            case 7:
                let nuevaCategoria = prompt("Ingrese el nombre de la nueva categoria: ");
                agregarCategoriasPorUsuario(nuevaCategoria);
                break;
            case 8:
                mostrarTodasLasCategorias();
                let numeroFiltro = parseInt(prompt("Elija el numero de la categoria a filtrar: "));
                let tareasCategoria = filtarTareasPorCategoria(numeroFiltro);

                console.log("Tareas de la categoria seleccionada: ");
                console.log(tareasCategoria);
                break;
            case 9:
                mostrarTodasLasCategorias();
                let nroCateg = parseInt(prompt("Ingrese el numero de categoria: "));
                contarTareasCompletasPorCategoria(nroCateg);
                break;
            case 10:
                mostrarTareasNoCompletadas();
                break;
            case 11:
                ordenarTareasPorNombre();
                console.log("Tareas por nombre: ");
                console.log(tareas);
                break;
            case 12:
                ordenarTareasPorFecha();
                console.log("Tareas por fecha: ");
                console.log(tareas);
                break;
            case 13:
                ordenarTareasPorNombre();
                let nombreABuscar = prompt("Ingrese el nombre de la tarea a buscar: ");
                let indiceTareaEncontrada = buscarTareaPorNombre(nombreABuscar);
                if (indiceTareaEncontrada !== -1) {
                    console.log("Tarea encontrada en el indice: " + indiceTareaEncontrada);
                } else {
                    console.log("Tarea no encontrada");
                }
                break;

            default:
                console.log("Opcion invalida");
                break;
        }
    }
}

interactuarUsuario();