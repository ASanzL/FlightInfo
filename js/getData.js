var xhrMetar = new XMLHttpRequest();
var xhrTaf = new XMLHttpRequest();
var xhrNotam = new XMLHttpRequest();

var searchButton = document.getElementById('search');



getInfo = function (xhr, name, valueName, icaok, isNotam, isReload=false) {
    document.getElementById(name + 'Text').innerHTML = "Söker...";
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

search = function (event) {
    var icaok = document.getElementById('icao-k').value;
    var metarUrl = 'https://avwx.rest/api/metar/' + icaok;
    var tafUrl = 'https://avwx.rest/api/taf/' + icaok;
    var notamURL = "https://v4p4sz5ijk.execute-api.us-east-1.amazonaws.com/anbdata/states/notams/notams-list?api_key=" +
        config.key + "&format=json&type=&Qcode=&locations=ESOW&qstring=&states=&ICAOonly=";

    if (icaok != "") {
    getInfo(xhrMetar, 'metar', 'Raw-Report', icaok, false);
    getInfo(xhrTaf, 'taf', 'Raw-Report', icaok, false);
    getInfo(xhrNotam, 'notam', 'message', icaok, true);

    xhrMetar.open('GET', metarUrl, true);
    xhrMetar.send(null);

    xhrTaf.open('GET', tafUrl, true);
    xhrTaf.send(null);

    xhrNotam.open('GET', notamURL, true);
    xhrNotam.send(null);
    }
    event.preventDefault();
}


searchButton.addEventListener('click', search);