//URL de la hoja de calculo base jj2MiSheetsBd en GoogleDrive
var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1aFZ4KZMhPHeNip3U-D8Z6nF5Kp_WJWwOoMyesNlzL2E/edit#gid=0");
            
//Adicionar movimiento de la App Android hacia la hoja de calculo............................            
            
//Nombre de la hoja del movimiento            
var sheet = ss.getSheetByName("movimiento");
//enviar
function doPost(e){

  var action = e.parameter.action;
  if (action == 'addItem'){
  return addItem(e);
  }
}

//funcion que adiciona el movimiento
function addItem(e) {

//variables
 var date =  new Date();
 var id  =  "Item"+sheet.getLastRow(); // Item1
 var cuenta = e.parameter.cuenta;
 var descripcion = e.parameter.descripcion;
 var valor = e.parameter.valor;
 
 //Adjuntar las lineas al movimiento
  sheet.appendRow([date,id,cuenta,descripcion,valor]);
  
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);  
}

//Obtener para consulta el movimiento en la tabla dinamica en la App Android............................

//recibir

/*function doGet(e){
var action = e.parameter.action;
  if (action == 'getItems'){
  return getItems(e);
  }
}*/


var sheet2 = ss.getSheetByName('tdCtaVr'); // be very careful ... it is the sheet name .. so it should match 

//ejecutar la funion obtener los datos en la respectiva hoja

function doGet(e){
var action = e.parameter.action;
  if(action == 'getItems'){
    return getItems(e);
  }
  }

//obtener cada uno de los registros

function getItems(e){
  
  var records={}; 
  
 //rango
 
 var rows = sheet2.getRange(2, 1, sheet2.getLastRow()- 1,sheet2.getLastColumn()).getValues();
      data = [];

  for (var r = 0, l = rows.length; r < l; r++) {
    var row     = rows[r],
        record  = {};
    record['cuenta'] = row[2];
    record['descripcion']=row[3];
    record['valor']=row[4];
    
    data.push(record);
    
   }
  records.items = data;
  var result=JSON.stringify(records);
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
}

