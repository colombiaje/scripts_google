//26/05 18y33
function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName("movimiento");
}

// Maneja las peticiones POST
function doPost(e) {
  Logger.log("e recibido: " + JSON.stringify(e));

  if (!e || !e.parameter) {
    return ContentService.createTextOutput("Error: No se recibieron parámetros");
  }

  var action = e.parameter.action;
  if (action === 'addItem') {
    return addItem(e.parameter);
  }

  return ContentService.createTextOutput("Acción no reconocida");
}

// Agrega el movimiento a la hoja
function addItem(params) {
  var sheet = getSheet();

  var fecha = new Date(); // Fecha actual
  var id = new Date().getTime(); // ID único basado en timestamp
  var cuenta = params.cuenta || '';
  var descripcion = params.descripcion || '';
  var valor = params.valor || '';

  sheet.appendRow([fecha, id, cuenta, descripcion, valor]);

  return ContentService.createTextOutput("Movimiento agregado");
}

// Simula el envío desde el editor
function testDoPost() {
  var e = {
    parameter: {
      action: 'addItem',
      cuenta: '123',
      descripcion: 'Test desde editor',
      valor: '999'
    }
  };
  var resultado = doPost(e);
  Logger.log(resultado.getContent());
}
//prueba para el navegador
function doGet(e) {
  var action = e.parameter.action;

  if (action === 'addItem') {
    return addItem(e); // ahora sí se ejecuta desde navegador
  } else if (action === 'getItems') {
    return getItems(e);
  } else {
    return ContentService.createTextOutput("Hola desde Apps Script");
  }
}



