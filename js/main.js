var os = require("os");
var gui = require('nw.gui');
var win = gui.Window.get();
var onTop = false;

var oldCPUInfo = null;
var newCPUInfo = null;

function refresh() {

    //memory
    var totalMemory = os.totalmem();
    var freeMemory = os.freemem();
    var used = (totalMemory-freeMemory)/1024/1024/1024;
    var percent = freeMemory/totalMemory;
    document.getElementById("free").style.height = percent*200 +"px";
    document.getElementById("number").innerHTML = used.toFixed(2) +" GB";


    //cpu, calculate the average CPU usage in the past iteration
    newCPUInfo = os.cpus();

    if(oldCPUInfo != null){
        var oldTotalCPU = 0;
        var oldIdleCPU = 0;
        var newTotalCPU = 0;
        var newIdleCPU = 0;

        for(var i in oldCPUInfo){
            for(var type in oldCPUInfo[i].times) {
                oldTotalCPU += oldCPUInfo[i].times[type];
            }
            oldIdleCPU += oldCPUInfo[i].times.idle;
        }

        for(var i in newCPUInfo){
            for(var type in newCPUInfo[i].times) {
                newTotalCPU += newCPUInfo[i].times[type];
            }
            newIdleCPU += newCPUInfo[i].times.idle;
        }


        var idlePercent = (newIdleCPU-oldIdleCPU)/(newTotalCPU-oldTotalCPU);

        var cpuPercent = 100*(1-idlePercent);

        document.getElementById("cpu_usage").style.height = idlePercent*200 +"px";
        document.getElementById("cpu_number").innerHTML = Math.round(cpuPercent) +" %";
    }

    oldCPUInfo = newCPUInfo;





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

function toggleOnTop(){
    onTop = !onTop;
    win.setAlwaysOnTop(onTop);
    if(onTop){
        document.getElementById("ontop").src = "../img/ontop.svg";
    }else{
        document.getElementById("ontop").src = "../img/not-ontop.png";
    }
}

window.onload = function (){
    refresh();
    setInterval(refresh, 1000);
}


