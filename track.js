var ohareResponseLabel = document.getElementById('ohare-response');
var loopResponseLabel = document.getElementById('loop-response');

/*Get your own key or ask very nicely*/
var ctaToken = "815ee6119dbf4adead0b9fb54cf24d5e"

function getTimeTillArrivalInMinutes(dateString) {
    now = new Date();
    arr = new Date(dateString);
    dateTimeOffsetInMilliseconds = now.getTimezoneOffset() * 60000;
    diffInMinutes = (arr - (now.getTime() - dateTimeOffsetInMilliseconds)) / 60000;
    if (Math.floor(diffInMinutes) <= 0) {
        return "due";
    } else {
        return Math.floor(diffInMinutes);
    }
}

function returnClosest(list, direction) {
    closestTrain = null;
    list.forEach(function(train) {
        if (closestTrain === null && train.stpDe === direction) {
            closestTrain = train;
        } else if (closestTrain !== null && train.arrT < closestTrain.arrT && train.stpDe === direction) {
            closestTrain = train;
        }
    })
    return closestTrain;
}

function getTimes() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            var etaList = JSON.parse(req.responseText)
                .ctatt.eta;
            var oHareTrain = returnClosest(etaList, "Service toward O'Hare");
            var loopTrain = returnClosest(etaList, "Service toward Forest Park");
            ohareResponseLabel.textContent = getTimeTillArrivalInMinutes(oHareTrain.arrT) - 60;
            loopResponseLabel.textContent = getTimeTillArrivalInMinutes(loopTrain.arrT) - 60;
        }
    };
    var testRequest = "http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=" + ctaToken + "&mapid=40670" + "&outputType=JSON";
    req.open("GET", testRequest);
    req.send();
}

/*call it once before interval*/
getTimes();
window.setInterval(getTimes, 1000);
