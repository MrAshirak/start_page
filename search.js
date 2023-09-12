$(document).ready(function(){

  function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function weather( town ) {
    fetch("https://wttr.in/" + town + "?format=%c+%t")
        .then(response => response.text())
        .then(text => {
            document.getElementById("weather").innerHTML = text;
        })
}

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  // add a zero in front of numbers<10
  m = checkTime(m);
  s = checkTime(s);
  $('#hour').html(h + ":" + m + ":" + s)
  t = setTimeout(function() {
    startTime()
  }, 500);
}

startTime();
weather("Sao Paulo");
})

$('form').submit(function(e){
  e.preventDefault()
  submitSearch();
})

$('#submit').click(function(e){
  e.preventDefault()
  submitSearch();
})

function submitSearch(){
  var searchString = $('#searchInput').val()
  var arraySearch = searchString.split(" ")

  //Open site
  if(typeof sites[arraySearch[0]] !== 'undefined'){
    window.location.href = sites[arraySearch[0]]
    return;
  }

  let stringSearch = '' ;
  let seeker_method ;
  //Verify seeker entry

  if(typeof seekers[arraySearch[0]] !== 'undefined'){   
      seeker_method = seekers[arraySearch[0]]
      arraySearch.shift();
  }

  //Serialize searchString
  for(var i=0; i < arraySearch.length; i++){
    stringSearch = stringSearch.concat('+',arraySearch[i].toLowerCase())
  }

  //Open seeker request
  if(typeof seeker_method !== 'undefined'){
    window.location.href = seeker_method+stringSearch
    return;
  }
  window.location.href = seekers['duck']+stringSearch;
  
}

let seekers = {
  'google':"https://www.google.com/search?q=",
  'duck':"https://duckduckgo.com/?q=",
  'librex':"https://search.femboy.hu/search.php?q="
}

let sites = {
  "github":"https://github.com",
  "youtube":"https://youtube.com",
  "gmail":"https://gmail.com",
  "outlook":"https://outlook.com",
  "goog":"https://google.com",
  "tradutor":"https://dictionary.cambridge.org/pt/translate/"
}
