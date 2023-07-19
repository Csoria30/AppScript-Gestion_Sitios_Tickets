                                            /***********************/
                                            /* Variables Globales */
                                            /*********************/
var libro = SpreadsheetApp.getActiveSpreadsheet();

var sheet_sitios = libro.getSheetByName("sitios");
var fila_sitios = sheet_sitios.getLastRow();
var datosFinalSitios = [];
var rangoSitios = sheet_sitios.getRange("A2:G"+fila_sitios);
var datosSitios = rangoSitios.getValues();

var sheet_reclamos = libro.getSheetByName("reclamos");
var fila_reclamos = sheet_reclamos.getLastRow();
var datosFinalReclamos = [];
var rangoReclamos = sheet_reclamos.getRange("A2:F"+fila_reclamos);
var datosReclamos = rangoReclamos.getValues();

var email =nameUsuarios_();

                                            /**************************/
                                            /** Funciones Globalres **/
                                            /************************/
/* Nombre de usuarios */
function nameUsuarios_(){
  var email = Session.getUser().getEmail();
  return email;
}

                                            /********************/
                                            /* Funciones Sitios */
                                            /*******************/


function listarSitios_() {
  
    for(var i = 0 ; i < datosSitios.length; i++){
      if(datosSitios[i][1] == "Ingresado"){
        datosFinalSitios.push({
          id:datosSitios[i][0],
          localidad:datosSitios[i][2],
          sitioName:datosSitios[i][3],
          nis:datosSitios[i][4],
          medidor:datosSitios[i][5],
          contacto:datosSitios[i][6],
          acciones:"<button class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#modalEditSitio' style='margin-right: 5px;' "
                  + "onclick='auxSitiosEditar("+datosSitios[i][0]+");' >"
                  + "<i class='bi bi-pencil-fill'></i></button>"

                  /* + "<button class='btn btn-danger'  style='margin-right: 5px;' "
                  + "onclick='auxSitiosEliminar("+datosSitios[i][0].id+")' >"
                  + "<i class='bi bi-trash'></i></button>" */

                  + "<button class='btn btn-success'  data-bs-toggle='modal' data-bs-target='#crearReclamo' "
                  + "onclick='auxReclamoEditar("+datosSitios[i][0]+");' >"
                  + "<i class='bi bi-plugin'></i></button>"
        });
      }
    }
    /* console.log(datosFinalSitios); */
    return datosFinalSitios;
}

function insertarSitios_(form){
  var filaLocal = sheet_sitios.getLastRow();
  var id = sheet_sitios.getRange("A"+filaLocal).getValue()+1;

  sheet_sitios.getRange("A"+(filaLocal+1)).setValue(id);
  sheet_sitios.getRange("B"+(filaLocal+1)).setValue("Ingresado");
  sheet_sitios.getRange("C"+(filaLocal+1)).setValue(form.inputLocalidadAdd);
  sheet_sitios.getRange("D"+(filaLocal+1)).setValue(form.inputSitioAdd);
  sheet_sitios.getRange("E"+(filaLocal+1)).setValue(form.inputNisAdd);
  sheet_sitios.getRange("F"+(filaLocal+1)).setValue(form.inputMedidorAdd);
  sheet_sitios.getRange("G"+(filaLocal+1)).setValue(form.inputDCAdd);

  return "insertarSitioOk";
}

function consultarDatos(id){
  var filaLocal = sheet_sitios.getLastRow();
  var datos = sheet_sitios.getRange("A2:G"+filaLocal).getValues();
  var datosFinal = [];

  for(var i = 0; i < datos.length ; i++){
    if(id == datos[i][0]){
      datosFinal.push({
        id:datos[i][0],
        localidad:datos[i][2],
        sitioName:datos[i][3],
        nis:datos[i][4],
        medidor:datos[i][5],
        contacto:datos[i][6]

      });
    }
  }
  return datosFinal;
}

function editarSitios_(form){
  var filaLocal = sheet_sitios.getLastRow();
  var datos = sheet_sitios.getRange("A2:G"+filaLocal).getValues();

  for(var i = 0; i < datos.length ; i++){
    if(datos[i][0] == form.idSitioEdit){
      sheet_sitios.getRange("C"+(i+2)).setValue(form.inputLocalidadEdit);
      sheet_sitios.getRange("D"+(i+2)).setValue(form.inputSitioEdit);
      sheet_sitios.getRange("E"+(i+2)).setValue(form.inputNisEdit);
      sheet_sitios.getRange("F"+(i+2)).setValue(form.inputMedidorEdit);
      sheet_sitios.getRange("G"+(i+2)).setValue(form.inputDCEdit);
    }
  }
  return "edicionSitioOk";
}

function eliminarSitios_(id){
  var filaLocal = sheet_sitios.getLastRow();
  var datos = sheet_sitios.getRange("A2:G"+filaLocal).getValues(); 

  for(var i = 0; i < datos.length ; i++){
    if(datos[i][0] == id){
      sheet_sitios.getRange("B"+(i+2)).setValue("Eliminado");
    }
  }
  return "eliminarSitioOk";
}

                                            /*************************/
                                            /** Funciones Reclamos **/
                                            /***********************/

  function listarReclamos_() {
  
    for(var i = 0 ; i < datosReclamos.length; i++){
      if(datosReclamos[i][1] == "Pendiente"){
        datosFinalReclamos.push({
          id:datosReclamos[i][0],
          localidad:datosReclamos[i][2],
          sitioName:datosReclamos[i][3],
          nis:datosReclamos[i][4],
          recalamoEdesal:datosReclamos[i][5],
          acciones:"<button class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#editarReclamo' style='margin-right: 5px;'"
                  + "onclick='auxReclamoGestionar("+datosReclamos[i][5]+");' >"
                  + "<i class='bi bi-pencil-fill'></i></button>"

                  
        });
      }
    }
    /* console.log(datosFinalSitios); */
    return datosFinalReclamos;
  }

  function editarReclamos_(form){
    var filaLocal = sheet_reclamos.getLastRow();
    var datos = sheet_reclamos.getRange("A2:F"+filaLocal).getValues();

    for(var i = 0; i < datos.length ; i++)
    {
      if(datos[i][5] == form.inputSitioNReclamoGes)      
      {    
        sheet_reclamos.getRange("B"+(i+2)).setValue(form.inputEstadoReclamo);
        sheet_reclamos.getRange("I"+(i+2)).setValue(new Date);
        sheet_reclamos.getRange("J"+(i+2)).setValue(email);
      }
    }
      return "edicionReclamoOk";
  }


  function insertarReclamos_(form){
    var filaLocal = sheet_reclamos.getLastRow();
    var id = sheet_reclamos.getRange("A"+filaLocal).getValue()+1;

    sheet_reclamos.getRange("A"+(filaLocal+1)).setValue(id);
    sheet_reclamos.getRange("B"+(filaLocal+1)).setValue("Pendiente");
    sheet_reclamos.getRange("C"+(filaLocal+1)).setValue(form.inputLocalidadRAdd);
    sheet_reclamos.getRange("D"+(filaLocal+1)).setValue(form.inputSitioR);
    sheet_reclamos.getRange("E"+(filaLocal+1)).setValue(form.inputSitioNis);
    sheet_reclamos.getRange("F"+(filaLocal+1)).setValue(form.inputSitioNReclamo);
    sheet_reclamos.getRange("G"+(filaLocal+1)).setValue(new Date);
    sheet_reclamos.getRange("H"+(filaLocal+1)).setValue(email);
    
  

    return "insertarReclamoOk";
  }

    function consultarDatosReclamo(nReclamo){
      var filaLocal = sheet_reclamos.getLastRow();
      var datos = sheet_reclamos.getRange("A2:F"+filaLocal).getValues();
      var datosFinal = [];

      for(var i = 0; i < datos.length ; i++){
        if(nReclamo == datos[i][5]){
          datosFinal.push({
            id:datos[i][0],
            estado:datos[i][1],
            localidad:datos[i][2],
            sitioName:datos[i][3],
            nis:datos[i][4],
            recalamoEdesal:datos[i][5]

          });
        }
      }
      return datosFinal;
  }