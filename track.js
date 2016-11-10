var responsebutton = document.getElementById('get-response-button');
var responseLabel  = document.getElementById('response');

/*Get your own key or ask very nicely*/
var ctaToken = "areallyvalidtoken"

responsebutton.onclick = responseListener

function responseListener() {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      console.log(req.responseText);
      responseLabel.textContent = req.responseText;
    }
  };
  var testRequest = "http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=" + ctaToken + "&mapid=40670" + "&outputType=JSON"
  req.withCredentials = true;
  req.open("GET", testRequest);
  req.send()
}
