$(document).ready(function() {
  var url = window.location.toString();
  function breadCrumbs(url){
    var ls = url.split("//")[1].split("/");
    var gitSource = "https://github.com/vlead/vlabs-dev-pages/tree/master/src";
    ls[0] = "Home";
    var result = "<ul class='breadcrumb'>";
    if(ls.length == 2){
      result = result.concat("<li><a href='/'>Home</a></li>");
      result = result.concat("<li class='gitLink'><a href='"+gitSource+"/index.org'>Edit on Github</a></li>")
      return result.concat("</ul>");
    }
    if(ls[ls.length-1] == ""){
      ls = ls.slice(0,ls.length-1);
    }
    ls.forEach(function(i){
      if(i == "Home"){
        result = result.concat("<li><a href='/'>"+ i +"</a></li>");
      }else if(i.indexOf(".html") > -1){
        result = result.concat("<li class='active'>"+ capitalize(i.split(".")[0].replace(new RegExp("-",'g')," ")) +"</li>");
      }else{
        result = result.concat("<li><a href='/"+i+"/'>"+ capitalize(i.replace(new RegExp("-",'g')," ")) +"</a></li>");
      }
    });

    var gitUrl;

    if(url.indexOf(".html") == -1){
      gitUrl =  url.replace("http://".concat(window.location.host),gitSource).concat("index.org")
    }else{
      gitUrl = url.replace("http://".concat(window.location.host),gitSource).replace(".html",".org");
    }
    
    result = result.concat("<li class='gitLink'><a href='"+gitUrl+"'>Edit on Github</a></li>")
    result = result.concat("</ul>");
    return result;
  }
  function capitalize(s){
    var ls = s.split(" ");
    ls = ls.map(function(i){
      return i[0].toUpperCase().concat(i.slice(1));
    });
    return ls.join(" ");
  }
  $('#content').prepend(breadCrumbs(url));

  $('.dropdown').hover(function(){$('this .dropdown-toggle').dropdown('toggle') });
  var readContentFromSiteMap = function() {
    var request = new XMLHttpRequest();
    var sitemapurl = url.split("//")[0] + "//" + url.split("//")[1].split("/")[0] + "/sitemap.html";
    request.open("GET", sitemapurl, false);
    request.send(null);

    var doc = document.implementation.createHTMLDocument("sitemap");
    doc.documentElement.innerHTML = request.responseText;

    return doc.documentElement.getElementsByTagName("div")[0];
  };

  var parseContent = function(cnt) {
    var lis = cnt.getElementsByTagName("li");
    var flis = Array.from(lis).filter(function(el) { return el.getElementsByTagName("ul").length > 0; });
    var fflis = flis.filter(function(el) { return el.textContent.indexOf("org") == -1;});
    var ulList = document.createElement("ul");
    ulList.className = "org-ul";
    fflis.forEach(function(el) { ulList.append(el); });
    return ulList;
  };

  var cnt = readContentFromSiteMap();
  var ulList = parseContent(cnt);
  document.body.prepend(ulList);
  main = $('ul.org-ul')[0];
  $(main).find('a').each(function() {
    this.attributes['href'].value = '/' + this.attributes['href'].value;
  });
  contents = $(main.outerHTML)[0];
  $('ul.org-ul').first().addClass('nav navbar-nav');
  childs = main.children;
  for(idx=0; idx<childs.length;idx++) {
    cld = childs[idx].children[0];
    if(cld.tagName == 'A');
    else if(cld.tagName == 'UL') {
      cld.attributes.class.value = "dropdown-menu multi-level";
      $(cld).find('li').has('ul').addClass('dropdown-submenu');
      $(cld).find('ul').addClass('dropdown-menu');
      text = childs[idx].innerText.split('\n')[0];
      link = `<a href="#" class="dropdown-toggle" data-toggle="dropdown">`+capitalize(text)+`<b class="caret"></b></a>`
      childs[idx].innerHTML = link + cld.outerHTML;
    };
  };
  lists = $(main).find('li').has('ul');
  for(var i=lists.length-1;i>=0;i--) {
    if(lists[i].firstChild.tagName != 'A') {
      lists[i].innerHTML = "<a>"+capitalize(lists[i].innerHTML.split('\n')[0]) + "</a>" + lists[i].innerHTML.split('\n').slice(1).join('')
    }
  }
  iHtml = main.outerHTML;
  $('ul.org-ul').removeClass('org-ul');
  str = `<nav class="navbar navbar-default navbar-fixed-top header-nav">
          <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="/"><img src="/style/img/logo-new.png" /></a>
            </div>
          </div>
        </nav>
        <div class="navbar navbar-default navbar-fixed-top bottom-nav" role="navigation">
          <div class="container-fluid">
            <div class="collapse navbar-collapse">`;
  str = str + iHtml;
  str = str + '</div></div></nav>';
  $('body').prepend(str);
  main.innerHTML = '';
  $('#postamble').before(`
    <div id="content">
      <div id="disqus_thread"></div>
    </div>
    <script>
      (function() { // DON'T EDIT BELOW THIS LINE
      var d = document, s = d.createElement('script');
      s.src = 'https://virtual-labs.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
      })();
    </script>
    <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
  `);
  $(contents).find('.org-ul').removeClass('org-ul');
  $(contents).removeClass('org-ul');
  $(contents).children('li').find('ul').addClass("footer-links");
  
  str = `<footer class="navbar navbar-default">
            <div class="container-fluid">`;
  cld = $(contents).children();
  for(var i=0;i<cld.length;i++) {
    if(i%4 == 0) {
      str = str + '<div class="row">';
    }
    if( $(cld[i]).find('ul').length) {
      iHTML = '';
      headText = cld[i].firstChild.textContent.split('\n')[0];
      subChilds = cld[i].firstChild.nextSibling.children
      innerContent = '';
      for(var j=0;j<subChilds.length;j++) {
        iHTML = '';
        if(subChilds[j].firstElementChild.tagName == "UL") {
          iText = subChilds[j].firstChild.textContent.split('\n')[0];
          iHTML = `<li><a href="/`+headText+`/`+iText+`">`+capitalize(iText)+`</a></li>`;
        }
        else {
          iHTML = iHTML + subChilds[j].outerHTML;
        }
        innerContent = innerContent + iHTML;
      }
      col =`<div class="col-md-3">
              <div class="footer-heading">
                <a href="/`+headText+`">`+capitalize(headText)+`</a>
              </div>
              <ul class="footer-links">
                `+innerContent+`
              </ul>
            </div>`;
      
      str = str + col;
    }
    else {
      col =`<div class="col-md-3">
              <div class="footer-heading">
                `+cld[i].innerHTML+`
              </div>
            </div>`;
    }
    if(i%4 == 3) {
      str = str + '</div>';
    }
  }
  $('#postamble').before(str);
  $('.c-dropdown').hover(function(){
    if($(this).find('ul.c-dropdown-menu')[0]) {
      $(this).find('ul.c-dropdown-menu')[0].style.display = 'block';
    }
  },function(){
    if($(this).find('ul.c-dropdown-menu')[0]) {
      $(this).find('ul.c-dropdown-menu')[0].style.display = 'none';
    }
  });
})
