// stuff to be added

var divHtmlCollection;
var divIdMap = {}; 

var createDivMap = function() {
  divHtmlCollection = document.getElementsByTagName('div');
  var divArray = Array.from(divHtmlCollection);

  divArray.forEach(function(el) {
    divIdMap[el.id] = el;
  });
};

var stripInnerDivs= function(key) {
  var element = divIdMap[key];
  var htmlCollection = element.getElementsByTagName('div');
  var htmlArray = Array.from(htmlCollection);
  if (htmlArray.length > 0) {
    htmlArray.forEach(function(el) {
      if (el.id.includes(key)) {
	el.parentNode.removeChild(el);
      }
    });

  }
};
  
var removeInnerDivsFromDict = function() {
  var keys = Object.keys(divIdMap);
  keys.forEach(function(el) {
    if (el.includes('outline-container'))
      stripInnerDivs(el);
  });
};

var removeAllDivsFromDocument = function() {
  var keyz = Object.keys(divIdMap);
  //keyz.forEach(function(el) { console.log("hhhh ===> %s", el);});
  keyz.forEach(function(el) {
    var elem = document.getElementById(el);
    if (elem != null)
      elem.remove();
  });
};

var restrucureTheDivs = function() {

  var content = document.getElementById('content');
  content.getElementsByTagName("h1")[0].remove();
  document.getElementById('content').remove();
  document.getElementById('org-div-home-and-up').remove();
  document.getElementById('postamble').remove();
  var topDiv = document.createElement('div');
  topDiv.id = "topDiv";
  topDiv.name = "topDiv";
  topDiv.className = "container-fluid";
  document.body.appendChild(topDiv);
  document.getElementById('topDiv').appendChild(content);
};

var changeDivInContent = function(el) {
  var elId = el.id;
  var elIdItems = elId.split('-');
  var newId = 't' + elIdItems[2] + elIdItems[3];
  el.id = newId;
  el.className = 'toc';
  var innerDiv = el.getElementsByTagName('div')[0];
  innerDiv.id = 'c' + elIdItems[2] + elIdItems[3];
  innerDiv.className = 'rightPane';
  document.getElementById('content').appendChild(innerDiv);
};

var createTocAndSections = function() {
  var content = document.getElementById('content');
  var divs = Array.from(content.getElementsByClassName('outline-2'));
  divs.forEach(changeDivInContent);
};

function get_window_hash_path() {
  return location.hash.substring(1);
};

var setHash = function(self) {
  window.location.hash=self.id;
};

var createDivElement = function(id, name, cls) {
  var divElem = document.createElement('div');
  divElem.id = id;
  divElem.name = name;
  divElem.className = cls;
  return divElem;
};

var createThreeColumns = function() {
  var topDiv = createDivElement('topDiv', 'topDiv', 'border row container-fluid');
  var leftDiv = createDivElement('leftDiv', 'leftDiv', 'border col-xs-4 col-sm-4 col-md-4 col-lg-4');
  var centerDiv = createDivElement('centerDiv', 'centerDiv', 'border col-xs-4 col-sm-4 col-md-4 col-lg-4');
  var rightDiv = createDivElement('rightDiv', 'rightDiv', 'border col-xs-4 col-sm-4 col-md-4 col-lg-4');
  topDiv.appendChild(leftDiv);
  topDiv.appendChild(centerDiv);
  topDiv.appendChild(rightDiv);
  document.body.appendChild(topDiv);
  
};

var attachToc = function() {
  var elem = document.getElementById('leftDiv');
  elem.appendChild(divIdMap['table-of-contents']);
};

var clearCurrentContent = function() {
  if (document.getElementById('topDiv') != null)
    document.getElementById('topDiv').remove();
};

var setContentForCenter = function(hashPath) {
  var elem = document.getElementById('centerDiv');
  var id = 'outline-container-' + hashPath;
  elem.appendChild(divIdMap[id]);
};

var setContentForRight = function(hashPath) {
  var elem = document.getElementById('rightDiv');
  var id = 'outline-container-' + hashPath;
  elem.appendChild(divIdMap[id]);
};

var changeState = function(hashPath) {
  var firstLevelSection = /([0-9])$/;
  var secondLevelSection = /-([0-9])-([0-9])$/;
  var thirdLevelSection = /-([0-9])-([0-9])-([0-9])$/;
  
  if (thirdLevelSection.exec(hashPath) == null) {
    if (secondLevelSection.exec(hashPath) != null ||
	firstLevelSection.exec(hashPath)) {
      clearCurrentContent();
      createThreeColumns();
      attachToc();

      let match = secondLevelSection.exec(hashPath);
  
      if (match == null)
	setContentForCenter(hashPath);
      else {
	setContentForCenter('sec' + match[0] + '-1');
	setContentForRight('sec' + match[0] + '-2');
      }
    }
  } else {
    let match = thirdLevelSection.exec(hashPath);
    navigate('sec-' + match[1] + '-' + match[2]);
    $(window).trigger("hashchange");
  }
};

var registerOnHashChangeHandler = function() {
  $(window).on("hashchange", function(e) {
    //strip hash out
    hash_path = get_window_hash_path();
    console.log("new hash: ", hash_path);
    changeState(hash_path);
  });
};

function navigate(path) {
  var cu = window.location.href;
  console.log("navigate - path = %s", path);
  console.log("replace - %s", cu.replace(/#(.*)$/, '') + '#' + path);
  var current = window.location.href;
  window.location.href = current.replace(/#(.*)$/, '') + '#' + path;
};

$(document).ready(function() {
  //  restrucureTheDivs();
  //  createTocAndSections();
  createDivMap();
  removeInnerDivsFromDict();
  removeAllDivsFromDocument();
  registerOnHashChangeHandler();
  let current_hash = get_window_hash_path();
  if (current_hash === "") {
    console.log("defaulting #url to get_all_users");
    current_hash = "sec-1";
    console.log("navigating to: #" + current_hash);
    navigate(current_hash);
  }
  
  $(window).trigger("hashchange");

  
});
