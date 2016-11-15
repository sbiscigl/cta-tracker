var ohareResponseLabel  = document.getElementById('ohare-response');
var loopResponseLabel  = document.getElementById('loop-response');

/*Get your own key or ask very nicely*/
var ctaToken = "dontspeakfortwoyears"

function getTimeTillArrivalInMinutes(dateString) {
  now = new Date();
  arr = new Date(dateString);
  dateTimeOffsetInMilliseconds = now.getTimezoneOffset() * 60000
  diffInMinutes = (arr - (now.getTime() - dateTimeOffsetInMilliseconds))/60000;
  if (Math.floor(diffInMinutes) <= 0) {
    return "due"
  } else {
    return Math.floor(diffInMinutes)
  }
}

function returnClosest(list, direction) {
  closestTrain = null;
  list.forEach(function(train) {
    if (closestTrain === null && train.stpDe === direction) {
      closestTrain = train
    } else if (closestTrain !== null && train.arrT < closestTrain.arrT && train.stpDe === direction) {
      closestTrain = train;
    }
  })
  return closestTrain;
}

function getTimes() {
  console.log("interval");
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      var etaList =  JSON.parse(req.responseText).ctatt.eta;
      var oHareTrain = returnClosest(etaList, "Service toward O'Hare");
      var loopTrain = returnClosest(etaList, "Service toward Forest Park")
      ohareResponseLabel.textContent = "train for ohare arriving at: " + getTimeTillArrivalInMinutes(oHareTrain.arrT) + " minutes";
      loopResponseLabel.textContent = "train for the loop arriving at: " + getTimeTillArrivalInMinutes(loopTrain.arrT) + " minutes";
    }
  };
  var testRequest = "http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=" + ctaToken + "&mapid=40670" + "&outputType=JSON"
  req.open("GET", testRequest);
  req.send()
}

window.setInterval(getTimes,1000)
