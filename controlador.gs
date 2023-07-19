function doGet() {
  const permitirAcceso = buscarUsuario();
  
  if(permitirAcceso){
    var index = HtmlService.createHtmlOutputFromFile("index")
    .getContent();

    var estilo = HtmlService.createHtmlOutputFromFile("estilo")
    .getContent();

    var modelo = HtmlService.createHtmlOutputFromFile("modelo")
    .getContent();

    var js = HtmlService.createHtmlOutputFromFile("js")
    .getContent();

    var alertas = HtmlService.createHtmlOutputFromFile("alertas")
    .getContent();

    const output = HtmlService.createHtmlOutput(estilo + index + modelo + js + alertas).setTitle("Control de Gatos");
    
    return output;
  }else{
    const output = HtmlService.createHtmlOutputFromFile("accesoDenegado");
    return output;
  } 
}

function controladorSitios(form, accion,id){

  if(form != ""){
    accion = form.txtAccion;
  }

  try{
    switch(accion){
      case "listar":
        return listarSitios_();
        break;

      case "insertar":
        return insertarSitios_(form);
        break;

      case "editar":
        return editarSitios_(form);
        break;

      case "eliminar":
        return eliminarSitios_(id);
        break;
    }

  }catch(e){
    return "Error en el controlador" + e;
  }
}

function controladorReclamos(form, accion,id){

  if(form != ""){
    accion = form.txtAccion;
  }

  try{
    switch(accion){
      case "listar":
        return listarReclamos_();
        break;

      case "insertar":
        return insertarReclamos_(form);
        break;

      case "editar":
        return editarReclamos_(form);
        break;

      case "eliminar":
        return eliminarReclamos_(id);
        break;
    }

  }catch(e){
    return "Error en el controlador" + e;
  }
}



function buscarUsuario(){
  const usuarioActivo = Session.getActiveUser().getEmail();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetUsers = ss.getSheetByName('usuarios');
  const listaUsuariosActivos = sheetUsers.getRange(2,3, sheetUsers.getLastRow()-1,1).getValues().map(user => user[0]);
  
  if(listaUsuariosActivos.indexOf(usuarioActivo) !== -1){
    return true;
  }else{
    return false;
  }
}

function include (archivo){
  return HtmlService.createHtmlOutputFromFile(archivo)
  .getContent();
}