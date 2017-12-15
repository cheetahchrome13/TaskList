//  Justin Mangan
// 12 December 2017 
var fileapp = require('electron').remote;
var dialog = fileapp.dialog;
var fs = require('fs');

document.getElementById('add').addEventListener('click', saveFile);
document.getElementById('open').addEventListener('click', openFile);

function saveFile(){
    dialog.showSaveDialog((filename)=>{
        if (filename === undefined){
            alert("You cancelled that action");
            return;
        }

        var content = document.getElementById('tasks');
        var items = content.getElementsByTagName('li');
        var taskAry = [];
        for (var i = 0; i < items.length; i++){
            taskAry.push(items[i].innerText);
        }
       
        fs.writeFile(filename, JSON.stringify(taskAry), (err)=>{
            if(err) console.log(err);
            alert("The file has been successfully saved");
        })
    })

}

function openFile(){
    dialog.showOpenDialog((filenames) =>{
        if (filenames === undefined){
            alert("You cancelled that action");
            return;
        }

        readFile(filenames[0]);
    })
}

var fileAry = []
function readFile(filepath){
    fs.readFile(filepath, 'utf-8', (err, data) =>{ 
        if(err){
            alert("there was an error retrieving that file");
            return;
        }
        fileAry = JSON.parse(data);
        // alert(fileAry);
        alert ("Closing this alert box will overwrite the current list items!");
        content = document.getElementById('tasks');
        content.innerHTML = '';
        for (var i = 0; i < fileAry.length; i++){
            var items = document.createElement('li');
            var itemText = document.createTextNode(fileAry[i]);
            items.appendChild(itemText);
            content.appendChild(items);
        };
    // These work for input box/button combo
        // var content = document.getElementById('tasks')
        // var items = content.getElementsByTagName('li')
        // var textArea = document.getElementById('output')
        // textArea.value = data
    })
};