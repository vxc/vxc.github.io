var experimentLUs;

var getObjId = function(obj) {
  return Object.keys(obj)[0];
};


var getLu = function(id) {
  var matchedObjList = experimentLUs.filter(function(obj)
					    { return id == getObjId(obj); });
  var matchedObj = matchedObjList[0];
  return matchedObj[id];
};


var getTsk = function(tsks, id) {
  var matchedObjList = tsks.filter(function(obj)
				    { return id == getObjId(obj); });
  var matchedObj = matchedObjList[0];
  return matchedObj[id];
};


var createHtmlElement = function(el) {
  var elem = document.createElement(el);
  return elem;
};


var createHtmlElementWithClass = function(el, cls) {
  var elem = document.createElement(el);
  elem.classList.add(cls);
  return elem;
};


var createHref = function(id, text) {
  var aTag = createHtmlElement('a');
  aTag.href = '#' + id;
  aTag.innerText = text;
  return aTag;
};

var createTasksUl = function(luId, tasks) {
  var ul = createHtmlElementWithClass('ul', 'toc-tsk-ul');
  tasks.forEach(function(el) {
    var id = getObjId(el);
    var tskLi = createHtmlElementWithClass('li', 'toc-tsk-li');
    tskLi.appendChild(createHref(luId + '-' + id, el[id]['header']));
    ul.appendChild(tskLi);
  });
  return ul;
};


var createLusUl = function() {
  var ul = createHtmlElementWithClass('ul', 'toc-lu-ul');
  experimentLUs.forEach(function(el) {
    var id = getObjId(el);
    var luLi = createHtmlElementWithClass('li', 'toc-lu-li');
    luLi.appendChild(createHref(id, el[id]['header']));
    luLi.appendChild(createTasksUl(id, el[id]['tasks']));
    ul.appendChild(luLi);
  });
  return ul;
};


var buildToc = function() {
  var toc = createHtmlElementWithClass('div', 'toc');
  var head = createHtmlElementWithClass('h2', 'toc-head');
  head.innerText = 'Table of Contents';
  toc.appendChild(head);
  toc.appendChild(createLusUl());
  return toc;
};

var createTopDiv  = function() {
  var topDiv = createHtmlElementWithClass('div', 'topDiv');
  topDiv.classList.add('border');
  topDiv.classList.add('row');
  topDiv.classList.add('container-fluid');
  return topDiv;

};

var createLeftDiv  = function() {
  var leftDiv = createHtmlElementWithClass('div', 'leftDiv');
  leftDiv.classList.add('border');
  leftDiv.classList.add('col-xs-4');
  leftDiv.classList.add('col-sm-4');
  leftDiv.classList.add('col-md-4');
  leftDiv.classList.add('col-lg-4');
  return leftDiv;
};

var createCenterDiv  = function() {
  var centerDiv = createHtmlElementWithClass('div', 'centerDiv');
  centerDiv.classList.add('border');
  centerDiv.classList.add('col-xs-4');
  centerDiv.classList.add('col-sm-4');
  centerDiv.classList.add('col-md-4');
  centerDiv.classList.add('col-lg-4');
  return centerDiv;
};

var createRightDiv  = function() {
  var rightDiv = createHtmlElementWithClass('div', 'rightDiv');
  rightDiv.classList.add('border');
  rightDiv.classList.add('col-xs-4');
  rightDiv.classList.add('col-sm-4');
  rightDiv.classList.add('col-md-4');
  rightDiv.classList.add('col-lg-4');
  return rightDiv;
};



var createThreeColumns = function() {
  
  var topDiv = createTopDiv();
  var leftDiv = createLeftDiv();
  var centerDiv = createCenterDiv();
  var rightDiv = createRightDiv();

  topDiv.appendChild(leftDiv);
  topDiv.appendChild(centerDiv);
  topDiv.appendChild(rightDiv);
  document.body.appendChild(topDiv);
};


var attachToc = function() {
  var elem = document.getElementsByClassName('leftDiv')[0];
  elem.appendChild(buildToc());
};


var clearCurrentContent = function() {
  if (document.getElementsByClassName('topDiv')[0] != null) {
    var topDiv = document.getElementsByClassName('topDiv')[0];
    topDiv.getElementsByClassName('centerDiv')[0].remove();
    topDiv.getElementsByClassName('rightDiv')[0].remove();
  }
};


var setContentForCenter = function(div) {
  var elem = document.getElementsByClassName('centerDiv')[0];
  elem.appendChild(div);
};

var setContentForRight = function(div) {
  var elem = document.getElementsByClassName('rightDiv')[0];
  elem.appendChild(div);
};


var showToc = function(hashPath) {
  console.log('showToc');
};


var createPrimaryCnt = function(obj) {
  var primArtF = obj[getObjId(obj)];
  var div = createHtmlElementWithClass('div', 'cDivCnt');
  var head = createHtmlElementWithClass('h4', 'cDivCntHead');
  head.innerText = primArtF['header'];
  var innerDiv = createHtmlElementWithClass('div', 'cInnerDiv');
  innerDiv.innerHTML = primArtF['divHtml'];
  div.appendChild(head);
  div.appendChild(innerDiv);
  return div;
};


var createResourceDiv = function(props) {
  var resource = props['RESOURCE_ID'];
  if (resource == undefined)
    return undefined;
  else {
    var uri = catalog[resource]['resource_uri'];
    if (uri == undefined)
      return undefined;
    var fDiv = createHtmlElementWithClass('div', 'rs');
    fDiv.innerHTML = getHtmlContentFromUrl(uri);
    return fDiv;
  }
};

var createSecondaryCnt = function(obj) {
  var secArtF = obj[getObjId(obj)];
  var div = createHtmlElementWithClass('div', 'rDivCnt');
  var head = createHtmlElementWithClass('h4', 'rDivCntHead');
  head.innerText = secArtF['header'];
  var innerDiv = createHtmlElementWithClass('div', 'rInnerDiv');
  innerDiv.innerHTML = secArtF['divHtml'];
  div.appendChild(head);
  div.appendChild(innerDiv);
  var resourceDiv = createResourceDiv(secArtF['properties']);
  if (resourceDiv != undefined)
    div.appendChild(resourceDiv);
  return div;
};


var buildContent = function(luId, tskId) {
  var obj = {};
  var lu = getLu(luId);
  console.log('build content => lu => ' + lu);
  var tsk = getTsk(lu['tasks'], tskId);
  console.log('build content => tsk => ' + tsk);
  obj['primCnt'] = createPrimaryCnt(tsk['primary']);
  obj['secCnt'] = createSecondaryCnt(tsk['secondary']);
  return obj;
};


var showContent = function(obj) {
  clearCurrentContent();
  var centerDiv = createCenterDiv();
  var rightDiv = createRightDiv();
  var topDiv = document.getElementsByClassName('topDiv')[0];
  topDiv.appendChild(centerDiv);
  topDiv.appendChild(rightDiv);
  setContentForCenter(obj['primCnt']);
  setContentForRight(obj['secCnt']);
};

var changeState = function(hashPath) {
  var hashRegEx = /(lu-[\d]+)-(tsk-[\d]+)/;
  var match = hashRegEx.exec(hashPath);
  console.log("change state to " + hashPath);
  console.log("match = " + match);
  if (match == null) {
    showToc(hashPath);
  } else {
    showContent(buildContent(match[1], match[2]));
  }
};


function getWindowHashPath() {
  return location.hash.substring(1);
};


var setHash = function(self) {
  window.location.hash = self.id;
};


var registerOnHashChangeHandler = function() {
  $(window).on("hashchange", function(e) {
    //strip hash out
    var hashPath = getWindowHashPath();
    console.log("new hash: ", hashPath);
    changeState(hashPath);
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
  experimentLUs = createLUs();
  clearBody();
  createThreeColumns();
  attachToc();
  registerOnHashChangeHandler();
  let currentHash = getWindowHashPath();
  if (currentHash === "") {
    console.log("defaulting #url to lu-1-tsk-1");
    currentHash = "lu-1-tsk-1";
    console.log("navigating to: #" + currentHash);
    navigate(currentHash);
  }
  
  $(window).trigger("hashchange");

});
