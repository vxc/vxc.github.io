/* The structure of an LU. 
{'id': {'header': '<>',
        'text': '<>',
        'properties': {'key1': 'value1', 'key2': 'value2' .... },
        'tasks': [{'id': {'header': '<>',
                          'text': '<>',
                          'properties': {'key1': 'value1', 'key2': 'value2' .... },
                          'primary': {'id': {'header': '<>',
                                              'text': '<>',
                                              'divHTML': '<>',
                                              'properties': {'key1': 'value1', 'key2': 'value2' .... }
                                             }
                                      },
                           'secondary': {'id': {'header': '<>',
                                                'text': '<>',
                                                'divHTML': '<>',
                                                'properties': {'key1': 'value1', 'key2': 'value2' .... }
                                               }
                                        }
                          }
                  }, ...]
       }
}
*/

var makeArray = function(htmlCollection) {
  return Array.from(htmlCollection);
};


var stripSpans = function(el) {
  try {
    var spanEls = Array.from(el.getElementsByTagName('span'));
    spanEls.forEach(function(item) {
      item.remove();
    });
  } catch(err) {
    console.log("span did not exist, error is " + err);
  }
};


var getHeader = function(htag, lu) {
  console.log("htag = " + htag);
  try {
    var hEl = Array.from(lu.getElementsByTagName(htag))[0];
    stripSpans(hEl);
    return hEl.innerText;
  } catch(err) {
    console.log("No header " + htag + " tag exists, error is " + err);
    return "";
  }
};


var getContentText = function(className, el) {
  try {
    var matchedEl = Array.from(el.getElementsByClassName(className))[0];
    return Array.from(matchedEl.getElementsByTagName('p'))[0].innerText;
  } catch(err) {
    console.log("text content is not retrieved, error is " + err);
    return "";
  }
};


var createPropertyObj = function(className, el) {
  try {
    var propsObj = {};
    var matchedEl = Array.from(el.getElementsByClassName(className))[0];
    var propDrawer = Array.from(matchedEl.getElementsByClassName('example'))[0];
    var propDrawerText = propDrawer.innerText;
    propDrawer.remove();
    var contents = propDrawerText.split("\n");    
    contents.forEach(function(prop) {
      var kv = prop.split(':');
      if (kv.length == 2)
	propsObj[kv[0]] = kv[1].trim();
    });
    return propsObj;
  } catch(err) {
    console.log("no properties exist, error is " + err);
    return {};
  }
};


var getInnerDiv = function(className, el) {
  var matchedEl = Array.from(el.getElementsByClassName(className))[0];
  if (matchedEl == undefined) {
    return "";
  } else {
    return matchedEl.innerHTML;
  }
};


var createArtefact = function(id, domObj) {
  var artefactJSON = {};
  artefactJSON[id] = {};
  try {
    var artefactObj = artefactJSON[id];
    artefactObj['header'] = getHeader('h4', domObj);
    artefactObj['text'] = getContentText('outline-text-4', domObj);
    artefactObj['properties'] = createPropertyObj('outline-text-4', domObj);
    artefactObj['divHtml'] = getInnerDiv('outline-text-4', domObj);
    return artefactJSON;
  } catch(err) {
    console.log("artefact is not created, error is " + err);
    artefactJSON[id] = {};
    return artefactJSON;
  }
};


var createPrimaryArtefact = function(tsk) {
  try {
    var primaryDomObj = tsk.getElementsByClassName('outline-4')[0];
    return createArtefact('prim-1', primaryDomObj);
  } catch(err) {
    console.log("Primary artefact is not created, error is " + err);
    return {'prim-1': {}};
  }
};


var createSecondaryArtefact = function(tsk) {
  try {
    var secondaryDomObj = tsk.getElementsByClassName('outline-4')[1];
    return createArtefact('sec-1', secondaryDomObj);
  } catch(err) {
    console.log("Secondary artefact is not created, error is " + err);
    return {'sec-1': {}};
  }
};


var createTask = function(tskId, tsk) {
  var id = 'tsk-' + tskId;
  var taskJSON = {};
  taskJSON[id] = {};

  try {
    var tskObj = taskJSON[id];
    tskObj['header'] = getHeader('h3', tsk);
    tskObj['text'] = getContentText('outline-text-3', tsk);
    tskObj['properties'] = createPropertyObj('outline-text-3', tsk);
    tskObj['primary'] = createPrimaryArtefact(tsk);
    tskObj['secondary'] = createSecondaryArtefact(tsk);
    return taskJSON;
  } catch(err) {
    console.log("Task is not created, error is " + err);
    taskJSON[id] = {};
    return taskJSON;
  }
};


var createTasks = function(lu) {
  try {
    var tskObjList = [];
    var tskId = 0;
    var tskCol = makeArray(lu.getElementsByClassName('outline-3'));
    tskCol.forEach(function(tsk) {
      tskObjList.push(createTask(++tskId, tsk));
    });
    return tskObjList;
  } catch(err) {
    console.log("Task list is not created, error is " + err);
    return [];
  }
};


var createLu = function(luId, lu) {
  var id = 'lu-' + luId;
  var luJSON = {};
  luJSON[id] = {};
  try {
    var luObj = luJSON[id];
    luObj['header'] = getHeader('h2', lu);
    luObj['text'] = getContentText('outline-text-2', lu);
    luObj['properties'] = createPropertyObj('outline-text-2', lu);
    luObj['tasks'] = createTasks(lu);
    return luJSON;
  } catch(err) {
    console.log("LU is not created, error is " + err);
    luJSON[id] = {};
    return luJSON;
  }
};


var createLUs = function() {
  try {
    var luObjList = [];
    var luId = 0;
    var luCol = Array.from(document.getElementsByClassName('outline-2'));
    luCol.forEach(function(lu) {
      luObjList.push(createLu(++luId, lu));
    });
    return luObjList;
  } catch(err) {
    console.log("LU list is not created, error is " + err);
    return [];
  }
};

var clearBody = function() {
  try {
    var homeUp = document.getElementById('org-div-home-and-up');
    if (homeUp != undefined)
      homeUp.remove();
    var cnt = document.getElementById('content');
    if (cnt != undefined)
      cnt.remove();
    var postamble = document.getElementById('postamble');
    if (postamble != undefined) {
      postamble.remove();
    }

  } catch(err) {
    console.log("Unable to clear body, error is " + err);
  }
};
