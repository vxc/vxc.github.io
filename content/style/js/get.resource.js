var getHtmlContentFromUrl = function(url) {
  var request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send(null);
  return request.responseText;
};



rightDiv.appendChild(fDiv);
fDiv.innerHTML = getHtmlContentFromUrl('http://localhost:5000/splitter');
var fDiv = createHtmlElementWithClass('div', 'cls_iframe');
var rightDiv = rightD[0];
var rightD = document.getElementsByClassName('rightDiv');
