let start = true;
let updateIcon = true;
let date;
let color;
let text;
let customDate = null;

let timeEl = document.getElementById("time");

let settingsEl = document.getElementById("settings");
let toggleSettingsEl = document.getElementById("toggleSettings");
let menuicon = document.getElementById("menuicon");
let scEl = document.getElementById("settingsContent");
let calcModeSelect = document.getElementById("calcMode");
let timeModeSelect = document.getElementById("timeMode");
let millisecondsDiv = document.getElementById("millisecondsDiv");
let msBox = document.getElementById("milliseconds");
let favicon = document.getElementById("favicon");

function updatetime() {
    if (customDate == null){date = new Date();}else{date = new Date(customDate)}
    let time = [date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()];
    
    switch (calcModeSelect.value) {
        case "0": color = ('00'+time[0]).slice(-2) + ('00'+time[1]).slice(-2) + ('00'+time[2]).slice(-2); break;
        case "1": color = (('00'+time[0].toString(16)).slice(-2) + ('00'+time[1].toString(16)).slice(-2) + ('00'+time[2].toString(16)).slice(-2)).toUpperCase(); break;
        case "2": color = (('00'+(10*time[0]).toString(16)).slice(-2) + ('00'+(4*time[1]).toString(16)).slice(-2) + ('00'+(4*time[2]).toString(16)).slice(-2)).toUpperCase(); break;
        case "3": color = ('000000' + Math.round((16777216/86400)*(time[0]*3600 + time[1]*60 + time[2])).toString(16).toUpperCase()).slice(-6); break;
        case "4": color = ('000000' + Math.round((16777216/86400000)*(time[0]*3600000 + time[1]*60000 + time[2]*1000 + time[3])).toString(16).toUpperCase()).slice(-6); break;
    }
    // console.log(color);
    
    let lightnessVar = (CalcLightness(color) < 128? "#ffffff":"#000000");
    document.body.style.color = lightnessVar;
    menuicon.style.fill = lightnessVar;
    document.body.style.backgroundColor = "#" + color;

    let oldtext = text;
    switch (timeModeSelect.value) {
        case "0": text = "#" + color; break;
        case "1": text=('00'+time[0]).slice(-2)+":"+('00'+time[1]).slice(-2)+":"+('00'+time[2]).slice(-2)+(msBox.checked? ("."+('000'+time[3]).slice(-3)):""); break;
        case "2": if (msBox.checked){text = date.valueOf();} else{text = Math.floor(date / 1000)} break;
    }
    if(oldtext != text){
        timeEl.innerHTML = text;
        timeEl.style.fontSize = 80/text.length + "vw";
    }
    
    if (start) {window.requestAnimationFrame(updatetime);}
}
function togglesettings(){
    if (scEl.style.display == "none"){
        scEl.style.display = "";
        settingsEl.style.backgroundColor = "#00000044";}
    else{
        scEl.style.display = "none";
        settingsEl.style.backgroundColor = "";}
}
function CalcLightness(hex) {
    var rgb = parseInt(hex, 16);    // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;     // extract red
    var g = (rgb >>  8) & 0xff;     // extract green
    var b = (rgb >>  0) & 0xff;     // extract blue
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;    // per ITU-R BT.709
}

window.addEventListener("click", (e)=>{if((scEl.style.display == "" && !settingsEl.contains(e.target)) || toggleSettingsEl.contains(e.target)) togglesettings();});
updatetime();