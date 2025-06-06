function listarMisScripts() {
  const archivos = DriveApp.getFilesByType(MimeType.GOOGLE_APPS_SCRIPT);
  
  while (archivos.hasNext()) {
    const archivo = archivos.next();
    Logger.log("Nombre: " + archivo.getName());
    Logger.log("ID: " + archivo.getId());
    Logger.log("------");
  }
}

