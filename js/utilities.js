   
//creamos el header de la tabla:
let crearHeader=(arregloclave)=>{
    let listaDatos= document.createElement("tr");
    for (let i=0; i<arregloclave.length; i++) {
                let listheader=document.createElement("th");
                listheader.innerHTML=arregloclave[i];
                listaDatos.appendChild(listheader);
            };
            tableEl.appendChild(listaDatos);
            // Creamos la celda editar
            let columnaEditar=document.createElement("th");
            columnaEditar.innerHTML="Editar";
                listaDatos.appendChild(columnaEditar);
                tableEl.appendChild(listaDatos);
             // Creamos la celda eliminar
             let columnaEliminar=document.createElement("th");
             columnaEliminar.innerHTML="Borrar";
                 listaDatos.appendChild(columnaEliminar);
                 tableEl.appendChild(listaDatos);
}
// inicializamos la tabla en blanco
function limpiarTabla(){
    body.innerHTML="";
}

//creamos el contenido de la  tabla:
let crearTabla=(baterias)=>{
    let listaDatos= document.createElement("tr");
    for (const lista in baterias) {
        let listItem=document.createElement("td");
        listItem.innerHTML= baterias[lista];
        listaDatos.appendChild(listItem);
     body.appendChild(listaDatos)
    }
    tableEl.appendChild(body);

    // celda con boton de editar
    let botonEditar=document.createElement("td");
    let imagenEditar=document.createElement("img");
    imagenEditar.src="../Assets/Img/Icono editar-eliminar/pencil-square.svg";
    imagenEditar.alt="Editar esta línea";
    imagenEditar.classList.add("botonesTabla");
    botonEditar.appendChild(imagenEditar);
    listaDatos.appendChild(botonEditar);
    imagenEditar.addEventListener("click",(event)=>{event.preventDefault();showModalEditar(event.path[2])});

    //celda con boton de eliminar
    let botonEliminar=document.createElement("td");
    let imagenEliminar=document.createElement("img");
    imagenEliminar.src="../Assets/Img/Icono editar-eliminar/trash-fill.svg";
    imagenEliminar.alt="Eliminar esta línea";
    imagenEliminar.classList.add("botonesTabla");
    botonEliminar.appendChild(imagenEliminar);
    listaDatos.appendChild(botonEliminar);
    imagenEliminar.addEventListener("click",(event)=>{event.preventDefault();showModalEliminar(event.path[2])});

}

//se crea dinamicamente el boton de "agregar"
function agregarBoton (){
    let div=document.getElementById("divBoton");
    let boton= document.createElement("button");
    div.appendChild(boton);
    boton.addEventListener("click",(event)=>{event.preventDefault();showModalAgregar()});
    boton.classList.add("btn-dark");
    boton.classList.add("btn");
    boton.innerHTML="Agregar";
}

// Se muestra el modal cuando se quiere eliminar fila */
function showModalEliminar(fila) {
    titulo.innerHTML= "Eliminar";
    mensaje.innerHTML= "Desea eliminar la fila?";
    aceptar.innerHTML= "Aceptar";
    cancelar.innerHTML= "Cancelar";
    aceptar.onclick=function(){eliminarDato(fila)};
    cancelar.addEventListener("click",cancelarModal, { once: true });
    overlayEl.classList.remove('display-none');
}

// funcion que elimina con demora de dos segundos
function eliminarDato (fila) {
    cancelar.removeEventListener("click",cancelarModal, { once: true });
    progressBar.classList.add('final');
    setTimeout(()=>{
        overlayEl.classList.add('display-none');
        progressBar.classList.remove('final');
        body.removeChild(fila);
        //Tambien eliminamos los datos del arreglo original 
        //(para encontrar el elemento busco por el modelo de la bateria, entendiendo que cada modelo es único.
        //En caso de una base de datos distinta tendria que agregar un id de cada producto para poder identificarlos).
        let eliminarBateriaModelo=fila.cells[1].innerHTML;
        //console.log(eliminarBateriaModelo);
        let resultado= processedData.findIndex(bateria=>bateria.Modelo==eliminarBateriaModelo);
        //console.log(resultado);
        processedData.splice(resultado,1);
        //console.log(processedData);
    },2000);
}

// funcion cancelar
function cancelarModal() {
    overlayEl.classList.add('display-none')
    aceptar.removeEventListener("click",()=>{eliminarDato(fila)},{ once: true });
}

// Se muestra el modal cuando se quiere EDITAR fila 
function showModalEditar(fila) {
    titulo.innerHTML= "Editar";
    mensaje.innerHTML= "Modifique los datos:";
    let formulario=document.createElement("form");
    formulario.classList.add('padding', 'margen', 'col-form-label');
    mensaje.appendChild(formulario);
    // se crean los input dinamicamente
         let marca=document.createElement("INPUT");
         marca.setAttribute("type", "text");
         marca.setAttribute('required','true');
         marca.value=fila.cells[0].innerHTML;
         marca.classList.add('margen');
         formulario.appendChild(marca);
         let modelo=document.createElement("INPUT");
         modelo.setAttribute("type", "text");
         modelo.setAttribute('required','true');
         modelo.value=fila.cells[1].innerHTML;
         modelo.classList.add('margen');
         formulario.appendChild(modelo);
         let voltaje=document.createElement("INPUT");
         voltaje.setAttribute("type", "number");
         voltaje.setAttribute('required','true');
         voltaje.value=fila.cells[2].innerHTML;
         voltaje.classList.add('margen');
         formulario.appendChild(voltaje);
         let amperaje=document.createElement("INPUT");
         amperaje.setAttribute("type", "text");
         amperaje.setAttribute('required','true');
         amperaje.value=fila.cells[3].innerHTML;
         amperaje.classList.add('margen');
         formulario.appendChild(amperaje);
    aceptar.innerHTML= "Aceptar";
    cancelar.innerHTML= "Cancelar";
    overlayEl.classList.remove('display-none');
    aceptar.onclick=function(){validarFormulario(fila,marca,modelo,voltaje,amperaje)};
    cancelar.addEventListener("click",()=>overlayEl.classList.add('display-none'), { once: true });
}
//funcion que valida el formulario de Editar
function validarFormulario(fila,marca,modelo,voltaje,amperaje) { 
    if ((marca.value.trim()=="") || (modelo.value.trim()=="")|| (voltaje.value.trim()=="")|| (amperaje.value.trim()==""))
    {
        mensajeAlerta.classList.remove('hidden');
    }
    else {
    modificarDato (fila,marca,modelo,voltaje,amperaje)
    mensajeAlerta.classList.add('hidden');
    }
};

// funcion que modifica el dato en la tabla
function modificarDato (fila,marca,modelo,voltaje,amperaje) {
    progressBar.classList.add('final');

  setTimeout(()=>{
    //Tambien editamos los datos del arreglo original 
    //(para encontrar el elemento busco por el modelo de la bateria, entendiendo que cada modelo es único.
    //En caso de una base de datos distinta tendria que agregar un id de cada producto para poder identificarlos).
    let editarBateriaModelo=fila.cells[1].innerHTML;
    // console.log(editarBateriaModelo);
    let resultadoEditado= processedData.findIndex(bateria=>bateria.Modelo==editarBateriaModelo);
    // console.log(resultadoEditado);
    processedData[resultadoEditado].Marca=marca.value;
    processedData[resultadoEditado].Modelo=modelo.value;
    processedData[resultadoEditado].Voltaje=voltaje.value;
    processedData[resultadoEditado].Amperaje=amperaje.value;
    // console.log(processedData);
    // editamos la tabla
    overlayEl.classList.add('display-none');
    progressBar.classList.remove('final');
    fila.cells[0].innerHTML=marca.value;
    fila.cells[1].innerHTML=modelo.value;
    fila.cells[2].innerHTML=voltaje.value;
    fila.cells[3].innerHTML=amperaje.value;
    },2000);   
};


// Se muestra el modal cuando se quiere AGREGAR fila */
function showModalAgregar() {
    titulo.innerHTML= "Agregar";
    mensaje.innerHTML= "Inserte datos:";
    let formulario=document.createElement("form");
    formulario.classList.add('padding', 'margen');
    mensaje.appendChild(formulario);
    // se crean los input dinamicamente
         let marca=document.createElement("INPUT");
         marca.setAttribute("type", "text");
         marca.placeholder='Marca';
         marca.classList.add('margen');
         marca.setAttribute('required','true');
         formulario.appendChild(marca);
         let modelo=document.createElement("INPUT");
         modelo.setAttribute("type", "text");
         modelo.setAttribute('required','true');
         modelo.placeholder='Modelo';
         modelo.classList.add('margen');
         formulario.appendChild(modelo);
         let voltaje=document.createElement("INPUT");
         voltaje.setAttribute("type", "number");
         voltaje.setAttribute('required','true');
         voltaje.placeholder='Voltaje';
         voltaje.classList.add('margen');
         formulario.appendChild(voltaje);
         let amperaje=document.createElement("INPUT");
         amperaje.setAttribute("type", "text");
         amperaje.setAttribute('required','true');
         amperaje.placeholder='Amperaje';
         amperaje.classList.add('margen');
         formulario.appendChild(amperaje);
    aceptar.innerHTML= "Aceptar";
    cancelar.innerHTML= "Cancelar";
    overlayEl.classList.remove('display-none');
    aceptar.onclick=function(){validarFormularioAgregar (marca,modelo,voltaje,amperaje)};
    cancelar.addEventListener("click",()=>overlayEl.classList.add('display-none'), { once: true }); 
}

//funcion que valida el formulario de Agregar
function validarFormularioAgregar(marca,modelo,voltaje,amperaje) { 
    if ((marca.value.trim()=="") || (modelo.value.trim()=="")|| (voltaje.value.trim()=="")|| (amperaje.value.trim()==""))
    {
        mensajeAlerta.classList.remove('hidden');
    }
    else {
        insertarDato (marca,modelo,voltaje,amperaje)
    mensajeAlerta.classList.add('hidden');
    }
};


// funcion que inserta el dato nuevo en la tabla
function insertarDato (marca,modelo,voltaje,amperaje) {
    progressBar.classList.add('final');
    setTimeout(()=>{
      overlayEl.classList.add('display-none');
      progressBar.classList.remove('final');
      nuevaBateria.Marca=marca.value;
      nuevaBateria.Modelo=modelo.value;
      nuevaBateria.Voltaje=voltaje.value;
      nuevaBateria.Amperaje=amperaje.value;
      crearTabla(nuevaBateria);
      // tambien insertamos el dato nuevo en el arreglo de objetos orginal
          processedData.push(nuevaBateria);
          nuevaBateria=[];
          //console.log(nuevaBateria);
    },2000);   
}

// funcion que carga los dropdowns del filtro
function cargarOpcionesFiltro(){
    let opciones= new Set(processedData.map(elem=>{return elem.Marca}));
    //console.log(processedData);
    filtroEl.innerHTML='';
    let opcionEl=document.createElement('option');
    opcionEl.value='';
    opcionEl.innerHTML='Filtrar por marca';
    opcionEl.setAttribute('disabled','true');
    opcionEl.setAttribute('selected','true');
    filtroEl.appendChild(opcionEl);
    opciones.forEach(elem=>{
        let opcionEl=document.createElement('option');
        opcionEl.value=elem;
        opcionEl.innerText=elem;
        filtroEl.appendChild(opcionEl);
    })
    //console.log(opciones);
}

//funcion de filtrado por Marcas
filtroEl.addEventListener('change', ()=>{
    limpiarTabla();
    let datosFiltrados=processedData.filter(elem=>{return elem.Marca==filtroEl.value});
    for (let i=0; i< datosFiltrados.length; i++)
    {crearTabla(datosFiltrados[i])}
}
)
