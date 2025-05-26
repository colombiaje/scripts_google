var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1NE43aIK6pAJlYtgJpZPcIeHfAuwslwUozDb73Ar6uqE/edit#gid=0");
//var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/19S-Jmew7lTj25KFhWJ6puiBw_SlsROXYibA3JnmRoNA/edit#gid=0");

var sheet = ss.getSheetByName('Items'); // be very careful ... it is the sheet name .. so it should match 


function doPost(e){
var action = e.parameter.action;

  if(action == 'addItem'){
    return addItem(e);

  }
}

function doGet(e){

var action = e.parameter.action;

  if(action == 'getItems'){
    return getItems(e);

  }
  
  }


function addItem(e){

var date =  new Date();

var id  =  "Item"+sheet.getLastRow(); // Item1

var itemName = e.parameter.itemName;

var brand = e.parameter.brand;

var price = e.parameter.price;

sheet.appendRow([date,id,itemName,brand,price]);

   return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);

}


function getItems(e){
  
  var records={};
 
  var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1,sheet.getLastColumn()).getValues();
      data = [];

  for (var r = 0, l = rows.length; r < l; r++) {
    var row     = rows[r],
        record  = {};
    record['itemName'] = row[2];
    record['brand']=row[3];
    record['price']=row[4];
    
    data.push(record);
    
   }
  records.items = data;
  var result=JSON.stringify(records);
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
}