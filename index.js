var fs = require('fs');
var cp = require('child_process');
var path = require('path');
var platform = process.platform;

function zipFiles(listfile){
    var exeName = platform == 'win32' ? 'win/zip.exe' : 'mac/zip.out';
    try{
        cp.execFileSync(
            path.join(__dirname, exeName),
            [listfile], 
            {cwd: process.cwd()}
        );
        return '';
    }
    catch(e){
        return String(e.stdout);
    }
}

function createDbkFile2(fileList, targetZipPath){
    var delimiter = platform == 'win32' ? "|" : ":";
    var all = targetZipPath + '\n';
    var len = fileList.length;
    for(var i=0; i<len; i++){
        var rawPath = String(fileList[i].rawPath);
        var targetPath = String(fileList[i].targetPath);
        all += rawPath + delimiter + targetPath + '\n';
    }
    var listFile;
    if (platform == 'win32') {
        listFile = path.join(__dirname, 'win/list.txt');
    }
    else {
        listFile = path.join(__dirname, 'mac/list.txt');
    }
    try {
        fs.writeFileSync(listFile, all, 'utf8');
    }
    catch(e) {
        return e.message;
    }
    return zipFiles(listFile);
}

exports.createDbkFile2 = createDbkFile2;

