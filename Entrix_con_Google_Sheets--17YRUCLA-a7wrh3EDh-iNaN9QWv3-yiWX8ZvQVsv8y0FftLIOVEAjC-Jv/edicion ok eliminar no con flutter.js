// 🔹 Obtener hoja por nombre
function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ztorePrompt");
}

// 🔹 Manejo de solicitudes GET (lectura)
function doGet(e) {
  Logger.log("--- doGet received ---"); // Added log
  Logger.log("e recibido: " + JSON.stringify(e));

  if (!e || !e.parameter) {
     Logger.log("Error: No GET parameters received.");
     return ContentService.createTextOutput("Error: No se recibieron parámetros GET").setMimeType(ContentService.MimeType.TEXT);
  }

  var action = e.parameter.action;
  Logger.log("Received GET action: " + action);

  if (action === 'getOptions') {
    return getUniqueOptions(); // ✅ Ajustado con mapa por contexto
  } else if (action === 'addPrompt') {
    // Nota: addPrompt típicamente se maneja por POST. Esta podría ser una opción de fallback por GET.
    // Asegúrate de que addPrompt pueda manejar parámetros desde GET si la usas así.
    Logger.log("GET Action: addPrompt (Fallback)");
    return addPrompt(e.parameter);
  } else if (action === 'queryPrompts') {
    return queryPrompts(e.parameter); // ✅ Nueva función para consultar
  } else {
    // Acción GET no reconocida
    Logger.log("Action GET not recognized: " + action);
    return ContentService.createTextOutput("Acción GET no reconocida").setMimeType(ContentService.MimeType.TEXT);
  }

  // Esta línea es inalcanzable si todos los paths anteriores retornan algo.
  // return ContentService.createTextOutput("Bienvenido a ZtorePrompt API"); // Eliminada o comentada
}

// 🔹 Manejo de solicitudes POST (escritura) - DEFINICIÓN ÚNICA Y CORRECTA
function doPost(e) {
  Logger.log("--- doPost received ---"); // Added start log
  Logger.log("e recibido: " + JSON.stringify(e));

  if (!e || !e.parameter) {
    Logger.log("Error: No POST parameters received.");
    return ContentService.createTextOutput("Error: No se recibieron parámetros POST")
                         .setMimeType(ContentService.MimeType.TEXT);
  }

  var action = e.parameter.action;
  Logger.log("Received POST action: " + action);

  if (action === 'addPrompt') {
    Logger.log("Action: addPrompt");
    return addPrompt(e.parameter);
  } else if (action === 'updatePrompt') {
    Logger.log("Action: updatePrompt");
    return updatePromptInSheet(e.parameter);
  } else if (action === 'deletePrompt') {
    Logger.log("Action: deletePrompt");
    if (typeof deletePrompt === 'function') {
      return deletePrompt(e.parameter);
    } else {
      Logger.log("Error: La función deletePrompt no está definida.");
      return ContentService.createTextOutput("Error: La función deletePrompt no está definida")
                           .setMimeType(ContentService.MimeType.TEXT);
    }
  }

  Logger.log("Action POST not recognized: " + action);
  return ContentService.createTextOutput("Acción POST no reconocida")
                       .setMimeType(ContentService.MimeType.TEXT);
}

// 🔹 Función para agregar un nuevo prompt
function addPrompt(params) {
  Logger.log("--- In addPrompt ---");
  Logger.log("Params: " + JSON.stringify(params));
  var sheet = getSheet();

  // Obtiene el número de la siguiente fila vacía.
  // Si la hoja tiene encabezados en la fila 1 y datos hasta la fila 5, getLastRow() será 5.
  // nextRow será 6. Este es el índice de la fila donde se añadirá el nuevo dato.
  var nextRow = sheet.getLastRow() + 1;

  // Usar el número de fila como ID es simple, pero si se eliminan filas, los IDs no serán únicos
  // y la función de actualización/eliminación por ID podría fallar si busca por un ID que ya no existe.
  // Una alternativa más robusta es generar un ID único (UUID) o usar una columna de ID gestionada.
  // Por ahora, mantenemos la lógica de usar el número de fila para el ID.
  var idPrompt = nextRow;

  var fechaCreacion = new Date();
  var contextoUso = params.contextoUso || '';
  var propositoUso = params.propositoUso || '';
  var promptTexto = params.promptTexto || '';

  // Columnas: ID(A=1), Fecha(B=2), Contexto(C=3), Propósito(D=4), Prompt(E=5)
  // sheet.appendRow añade datos a la primera fila vacía.
  sheet.appendRow([idPrompt, fechaCreacion, contextoUso, propositoUso, promptTexto]);
  Logger.log("Appended row with ID: " + idPrompt);

  // Retorna una respuesta JSON para consistencia con otras funciones
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, message: "Prompt agregado con ID: " + idPrompt }))
    .setMimeType(ContentService.MimeType.JSON);
}


// ✅ Función para obtener valores únicos y agrupados (getUniqueOptions)
function getUniqueOptions() {
  Logger.log("--- In getUniqueOptions ---");
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues(); // Incluye encabezados (fila 0 del array)

  var contextos = new Set();
  var propositos = new Set();
  var propositosPorContexto = {};

  // Itera desde la segunda fila (índice 1 en el array) para saltar encabezados
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var contexto = row[2]; // Columna C (índice 2 en el array 0-basado)
    var proposito = row[3]; // Columna D (índice 3 en el array 0-basado)

    if (contexto) {
      contexto = String(contexto).trim(); // Asegura que sea string antes de trim
      contextos.add(contexto);

      if (!propositosPorContexto[contexto]) {
        propositosPorContexto[contexto] = new Set();
      }

      if (proposito) {
        proposito = String(proposito).trim(); // Asegura que sea string antes de trim
        propositos.add(proposito);
        propositosPorContexto[contexto].add(proposito);
      }
    }
  }

  var resultado = {
    contexto: Array.from(contextos).sort(), // Ordena contextos
    proposito: Array.from(propositos).sort(), // Ordena todos los propósitos
    propositoPorContexto: {}
  };

  // Convierte los Sets de propositosPorContexto a Arrays y los ordena
  for (var ctx in propositosPorContexto) {
    resultado.propositoPorContexto[ctx] = Array.from(propositosPorContexto[ctx]).sort();
  }

  Logger.log("Returning options: " + JSON.stringify(resultado));
  return ContentService
    .createTextOutput(JSON.stringify(resultado))
    .setMimeType(ContentService.MimeType.JSON);
}

// ✅ Función para consultar prompts por contexto y propósito (queryPrompts)
function queryPrompts(params) {
  Logger.log("--- In queryPrompts ---");
  Logger.log("Params: " + JSON.stringify(params));

  var contextoFiltro = (params.contextoUso || '').toString().trim(); // Asegura string
  var propositoFiltro = (params.propositoUso || '').toString().trim(); // Asegura string

  var sheet = getSheet();
  var data = sheet.getDataRange().getValues(); // Incluye encabezados (fila 0 del array)

  var resultados = [];

  // Itera desde la segunda fila (índice 1 en el array) para saltar encabezados
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var contexto = (row[2] || '').toString().trim(); // Columna C (índice 2)
    var proposito = (row[3] || '').toString().trim(); // Columna D (índice 3)

    // Nota: Tu código original usa row[4] || row[5] para el prompt y la descripción.
    // Asegúrate de que la Columna E (índice 4) es la que contiene el texto principal del prompt
    // que se debe editar. Si la Columna F (índice 5) es la descripción o un texto secundario,
    // ajusta esto y la función updatePromptInSheet para usar el índice correcto (normalmente 4 para Columna E).
    var promptTextFromRow = (row[4] || '').toString(); // Usamos Columna E (indice 4) para el prompt principal
    var descriptionTextFromRow = (row[5] || '').toString(); // Usamos Columna F (indice 5) para descripción si existe?

    var rowId = (row[0] || '').toString(); // ID en Columna A (índice 0), asegúrate string

    if (contexto === contextoFiltro && proposito === propositoFiltro) {
      resultados.push({
        id: rowId, // Usando el ID de la fila (como string)
        fecha: row[1], // Columna B (índice 1)
        // Asegúrate de usar el índice correcto para descripción y prompt si no son E y F
        descripcion: descriptionTextFromRow, // Asumiendo Columna F (índice 5) es descripción
        prompt: promptTextFromRow // Asumiendo Columna E (índice 4) es el prompt principal
      });
    }
  }

  Logger.log("Found " + resultados.length + " results.");
  // Retorna una respuesta JSON con la lista de resultados
  return ContentService
    .createTextOutput(JSON.stringify(resultados))
    .setMimeType(ContentService.MimeType.JSON);
}

// ✅ Función para actualizar un prompt por ID en la hoja (RETORNANDO REGISTROS PARA DEPURACIÓN)
function updatePromptInSheet(params) {
  var logs = []; // Array para acumular mensajes de log

  logs.push("--- In updatePromptInSheet ---");
  logs.push("Received params: " + JSON.stringify(params)); // Registra los parámetros recibidos

  var sheet = getSheet();
  // Obtiene todos los datos. getValues() devuelve un array donde cada elemento es un array fila.
  // Las columnas son índices 0-basados dentro del array fila.
  var data = sheet.getDataRange().getValues();
  var promptIdToUpdate = (params.idPrompt || '').toString(); // El ID que viene de Flutter, asegurar string
  var newPromptText = (params.nuevoTexto || '').toString(); // El nuevo texto que viene de Flutter, asegurar string

  logs.push("Looking for ID: " + promptIdToUpdate);
  logs.push("Sheet has " + data.length + " rows (including header).");

  // Itera sobre las filas para encontrar el prompt por su ID
  // Comienza en i = 1 para saltar la fila de encabezados (el array data tiene la fila de encabezados en el índice 0)
  for (var i = 1; i < data.length; i++) {
    var row = data[i]; // La fila actual como un array (0-basado)
    // Asume que el ID está en la primera columna (índice 0 en el array)
    // Es CRUCIAL comparar el ID de la hoja (convertido a string) con el ID recibido (que ya aseguramos es string)
    var currentPromptId = (row[0] || '').toString();

    logs.push("Checking row index " + i + ", Sheet ID: " + currentPromptId);

    // Si encontramos el ID
    if (currentPromptId === promptIdToUpdate) {
      logs.push("!!! Match found at array index " + i + " (Sheet row " + (i+1) + ")"); // Registra cuando se encuentra el ID

      // Calculamos el índice real de la fila en la hoja (basado en 1)
      // Si la fila está en el índice 'i' del array 'data', su número de fila en la hoja es 'i + 1'
      var sheetRowIndex = i + 1;

      // El índice de la columna para el texto del prompt.
      // Basado en addPrompt([idPrompt, fechaCreacion, contextoUso, propositoUso, promptTexto]),
      // el promptTexto está en la 5ª posición, que es el índice 4 en un array 0-basado.
      // getRange usa índices 1-basados para columnas. Columna E es la 5ª columna.
      var promptTextColumnIndex = 5; // Columna 5 en la hoja (corresponde al índice 4 en el array 'row')

      logs.push("Targeting cell: Row " + sheetRowIndex + ", Column " + promptTextColumnIndex); // Registra la celda a actualizar
      logs.push("New text to set: " + newPromptText); // Registra el texto a poner

      try {
        // OBTENEMOS EL RANGO (celda específica) usando los índices 1-basados de la hoja
        // y ACTUALIZAMOS SU VALOR.
        sheet.getRange(sheetRowIndex, promptTextColumnIndex).setValue(newPromptText);
        Logger.log("Successfully set new value."); // Registra si setValue fue exitoso

        // Devolvemos una respuesta JSON incluyendo el estado y los logs
        return ContentService
          .createTextOutput(JSON.stringify({ success: true, message: "Prompt actualizado con ID: " + promptIdToUpdate, logs: logs }))
          .setMimeType(ContentService.MimeType.JSON);
      } catch (e) {
        logs.push("Error setting value: " + e);
        // Devolvemos respuesta JSON incluyendo el estado y los logs en caso de error en setValue
        return ContentService
          .createTextOutput(JSON.stringify({ success: false, message: "Error interno al actualizar celda: " + e, logs: logs }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
  }

  // Si el bucle termina y no encontramos el ID después de revisar todas las filas de datos
  logs.push("ID " + promptIdToUpdate + " not found in sheet."); // Registra si el ID no se encontró
  // Devolvemos respuesta JSON incluyendo el estado y los logs
  return ContentService
    .createTextOutput(JSON.stringify({ success: false, message: "Error: Prompt con ID " + promptIdToUpdate + " no encontrado.", logs: logs }))
    .setMimeType(ContentService.MimeType.JSON);
}


// ✅ Función para eliminar un prompt por ID (Ejemplo - DEBE EXISTIR SI doPost LO LLAMA)
// Si usas la acción 'deletePrompt' en Flutter, necesitas una función como esta.

function deletePrompt(params) {
  var logs = [];
  logs.push("--- In deletePrompt ---");
  logs.push("Params: " + JSON.stringify(params));

  var sheet = getSheet();
  //var promptIdToDelete = (params.id || '').toString(); // <-- CORREGIDO AQUÍ
  var promptIdToDelete = String(params.id || '').trim();


  logs.push("Looking for ID for deletion: " + promptIdToDelete);

  var data = sheet.getDataRange().getValues();

  for (var i = data.length - 1; i >= 1; i--) {
    var row = data[i];
    var currentPromptId = (row[0] || '').toString();

    logs.push("Checking row index " + i + " (Sheet row " + (i+1) + "), Sheet ID: " + currentPromptId);

    if (currentPromptId === promptIdToDelete) {
      logs.push("!!! Match found for deletion at array index " + i + " (Sheet row " + (i+1) + ")");
      var sheetRowIndex = i + 1;

      try {
        sheet.deleteRow(sheetRowIndex);
        logs.push("Successfully deleted row at sheet index " + sheetRowIndex);
        return ContentService
          .createTextOutput(JSON.stringify({ success: true, message: "Prompt eliminado con ID: " + promptIdToDelete, logs: logs }))
          .setMimeType(ContentService.MimeType.JSON);
      } catch (e) {
        logs.push("Error deleting row: " + e);
        return ContentService
          .createTextOutput(JSON.stringify({ success: false, message: "Error interno al eliminar fila: " + e, logs: logs }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
  }

  logs.push("ID " + promptIdToDelete + " not found for deletion.");
  return ContentService
    .createTextOutput(JSON.stringify({ success: false, message: "Error: Prompt con ID " + promptIdToDelete + " no encontrado para eliminar.", logs: logs }))
    .setMimeType(ContentService.MimeType.JSON);
}

function testDeletePromptById() {
  var sheet = getSheet();
  //var idToDelete = "54"; // 👈 ACTIVA y CAMBIA este ID según lo que quieras borrar (Desactivacion transitoria)
  var logs = [];
  
  logs.push("Buscando ID: " + idToDelete);

  var data = sheet.getDataRange().getValues();
  for (var i = data.length - 1; i >= 1; i--) {
    var rowId = String(data[i][0] || '').trim();
    logs.push("Fila " + (i+1) + " tiene ID: " + rowId);
    
    if (rowId === idToDelete) {
      sheet.deleteRow(i + 1);
      logs.push("✅ Fila con ID " + idToDelete + " eliminada (fila hoja " + (i+1) + ")");
      Logger.log(logs.join("\n"));
      return;
    }
  }

  logs.push("❌ ID " + idToDelete + " no encontrado.");
  Logger.log(logs.join("\n"));
}



// 🔹 Funciones de prueba manual (desde editor Apps Script)
function testDoPost() {
  // Ejemplo de llamada a doPost con acción addPrompt
  var addEvent = {
    parameter: {
      action: 'addPrompt',
      contextoUso: 'Test Context',
      propositoUso: 'Test Purpose',
      promptTexto: 'This is a test prompt.'
    }
  };
  Logger.log("--- Testing addPrompt via doPost ---");
  var addResult = doPost(addEvent);
  Logger.log("addPrompt result: " + addResult.getContent());

  // --- Para probar updatePrompt o deletePrompt, necesitas un ID existente ---
  // Asegúrate de reemplazar 'EXISTING_ID' con un ID real de tu hoja
  var existingId = 'REPLACE_WITH_EXISTING_ID'; // <<<<<<<<<< IMPORTANTE

  // Ejemplo de llamada a doPost con acción updatePrompt
  var updateEvent = {
    parameter: {
      action: 'updatePrompt',
      idPrompt: existingId,
      nuevoTexto: 'This is the updated text for ID ' + existingId
    }
  };
   // Descomenta las siguientes 3 líneas para probar updatePrompt
  // Logger.log("--- Testing updatePrompt via doPost ---");
  // var updateResult = doPost(updateEvent);
  // Logger.log("updatePrompt result: " + updateResult.getContent());

  // Ejemplo de llamada a doPost con acción deletePrompt
  var deleteEvent = {
    parameter: {
      action: 'deletePrompt',
      idPrompt: existingId
    }
  };
   // Descomenta las siguientes 3 líneas para probar deletePrompt
  // Logger.log("--- Testing deletePrompt via doPost ---");
  // var deleteResult = doPost(deleteEvent);
  // Logger.log("deletePrompt result: " + deleteResult.getContent());
}


function testGetOptions() {
  Logger.log("--- Testing getUniqueOptions ---");
  var response = getUniqueOptions();
  Logger.log(response.getContent());
}

function testQueryPrompts() {
  // Reemplaza 'Some Context' y 'Some Purpose' con valores que existan en tu hoja
  var queryEvent = {
    parameter: {
      action: 'queryPrompts',
      contextoUso: 'REPLACE WITH EXISTING CONTEXT', // <<<<<<<<<< IMPORTANTE
      propositoUso: 'REPLACE WITH EXISTING PURPOSE' // <<<<<<<<<< IMPORTANTE
    }
  };
  Logger.log("--- Testing queryPrompts ---");
  var resultado = queryPrompts(queryEvent.parameter);
  Logger.log(resultado.getContent());
}