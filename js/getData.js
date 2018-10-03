var xhrMetar = new XMLHttpRequest();
var xhrTaf = new XMLHttpRequest();
var xhrNotam = new XMLHttpRequest();

var searchButton = document.getElementById('search');

var icaok = document.getElementById('icao-k').value;
var metarUrl = 'https://avwx.rest/api/metar/' + icaok;
var tafUrl = 'https://avwx.rest/api/taf/' + icaok;
var notamURL = "https://v4p4sz5ijk.execute-api.us-east-1.amazonaws.com/anbdata/states/notams/notams-list?api_key=" +
    config.key + "&format=json&type=&Qcode=&locations=ESOW&qstring=&states=&ICAOonly=";

getInfo = function (xhr, name, valueName, icaok, isNotam, isReload=false) {
    document.getElementById(name + "H").innerHTML = name.toUpperCase() + " - " +icaok ;
    if(xhr.status === 200){
        responeObject = JSON.parse(xhr.responseText);

        var content = "";
        if(!isNotam){
        content = responeObject[valueName];
        }
        else{
        content = responeObject[0][valueName];
        }

        document.getElementById(name + 'Text').innerHTML = content;
    }
    else {
        if (isReload == false) {
            document.getElementById(name + 'Text').innerHTML = '<a href="#" class="reload" id="reload' + name + '">Ett fel inträffa. Klicka här för att försök igen.</a>';
            document.getElementById('reload' + name).addEventListener('click', function (event) {
                getInfo(xhr, name, valueName, icaok, isNotam, true);
                event.preventDefault();
            });
        }
    }
};

xhrMetar.onload = function () {
    getInfo(xhrMetar, 'metar', 'Raw-Report', icaok, false);
}
xhrTaf.onload = function () {
    getInfo(xhrTaf, 'taf', 'Raw-Report', icaok, false);
}
xhrNotam.onload = function () {
    getInfo(xhrNotam, 'notam', 'message', icaok, true);
}

search = function (event) {
    icaok = document.getElementById('icao-k').value;
    metarUrl = 'https://avwx.rest/api/metar/' + icaok;
    tafUrl = 'https://avwx.rest/api/taf/' + icaok;
    notamURL = "https://v4p4sz5ijk.execute-api.us-east-1.amazonaws.com/anbdata/states/notams/notams-list?api_key=" +
        config.key + "&format=json&type=&Qcode=&locations=" + icaok + "&qstring=&states=&ICAOonly=";

    if (icaok != "") {
    xhrMetar.open('GET', metarUrl, true);
    xhrMetar.send(null);
    document.getElementById('metarText').innerHTML = "Söker...";

    xhrTaf.open('GET', tafUrl, true);
    xhrTaf.send(null);
    document.getElementById('tafText').innerHTML = "Söker...";

    xhrNotam.open('GET', notamURL, true);
    xhrNotam.send(null);
    document.getElementById('notamText').innerHTML = "Söker...";

    document.getElementById('swcH').innerHTML = "SWC - Norden";
    document.getElementById('swcText').innerHTML = '<img src="https://www.aro.lfv.se/tor/nswc2aro.gif?930066" alt="SWC Karta">';
    }
    event.preventDefault();
}


searchButton.addEventListener('click', search);