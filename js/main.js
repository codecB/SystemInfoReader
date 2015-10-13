var os = require("os");
setInterval(refresh, 1000);


function refresh() {
    var totalMemory = os.totalmem();
    var freeMemory = os.freemem();
    var used = (totalMemory-freeMemory)/1024/1024/1024;
    var percent = freeMemory/totalMemory;
    document.getElementById("free").style.height = percent*200 +"px";
    document.getElementById("number").innerHTML = used.toFixed(2) +" GB";
}


function minimize(){
    var gui = require('nw.gui');
    var win = gui.Window.get();
    win.minimize();
}

function close2(){
    var gui = require('nw.gui');
    var win = gui.Window.get();
    win.close();
}




