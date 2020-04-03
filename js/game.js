const numDivs = 36;
const maxHits = 10;

let hits = 0;
let fails = 0;
let firstHitTime = 0;

function restart() {
  hits = 1;
  console.log('рестарт');
  $('.col').removeClass("miss");
  $('.col').removeClass("target");
  $('.col').text("");
  $('.game-field').show();
  $("#win-message").addClass("d-none");
  round();
}


function getTimestamp() {
  let d = new Date();
  return d.getTime();
}

function randomDivId() {
  let d = Math.floor(Math.random() * 6) + 1;
  let n = Math.floor(Math.random() * 6) + 1;
  return `#slot-${d}${n}`;
}

function round() {
  $('.target').removeClass('target'); 
  $('.miss').removeClass('miss'); 

  let divSelector = randomDivId();
  $(divSelector).addClass('target')
  $(divSelector).text(hits + 1)

  if (hits === 1) { firstHitTime = getTimestamp(); } 
  if (hits === maxHits) { endGame(); } 
}



function endGame() {
  $('.game-field').hide();

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $('#total-time-played').text(totalPlayedSeconds);
  $('#totalScores').text(hits - fails);

  $('#win-message').removeClass("d-none");
  document.getElementById('button-reload').style.visibility = '';
  document.getElementById('button-start').style.visibility = 'hidden';
}

function handleClick(event) {
  let target = $(event.target)
  if (target.hasClass('target')) {
    hits = hits + 1;
    target.text('');
    round();
  } else { 
    $(event.target).addClass('miss');
     fails = fails + 1;
     } 
}

function init() {
    $("#button-start").click(function() {
    if (firstHitTime > 0) {
      restart();
    } else {
      $(".game-field").click(handleClick);
      round();
    }
  });
    
    $('#button-reload').click(function() {
      location.reload();
  });
}

$(document).ready(init);