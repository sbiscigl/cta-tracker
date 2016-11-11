var responsebutton = document.getElementById('get-response-button');
var responseLabel  = document.getElementById('response');

/*Get your own key or ask very nicely*/
var ctaToken = "815ee6119dbf4adead0b9fb54cf24d5e"

responsebutton.onclick = responseListener

function returnClosest(list, direction) {
  closestTrain = list[0]
  list.forEach(function(train) {
    if (train.prdt < closestTrain.prdt && train.stpDe === direction) {
      closestTrain = train
    }
  })
  return closestTrain
}

function responseListener() {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      console.log(req.responseText);
      var etaList =  JSON.parse(req.responseText).ctatt.eta;
      var oHareTrain = closestTrain(etaList, "Service toward O'Hare")
      var loopTrain = closestTrain(etaList, "Service toward Forest Park")
      responseLabel.textContent = etaList;
    }
  };
  var testRequest = "http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=" + ctaToken + "&mapid=40670" + "&outputType=JSON"
  req.withCredentials = true;
  req.open("GET", testRequest);
  req.send()
}
