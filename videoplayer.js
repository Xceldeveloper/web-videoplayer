var container = $("*.container"),
  panelDesk = $("#control-panel-desk"),
  panelMob = $("#control-panel-mob"),
  seekbar = $("*#fill"),
  seek_thumb = $("*#seek-thumb"),
  seek_cover = $("#seekbar"),
  seek_coverx = $("#seekbar-2"),
  toggleMute = $("*#toggle-volume");
var volumeSlider = document.getElementById('volume-controller');
var player = document.querySelector('#player');
var vid = $("*#player");
var notification = $("#notification-status");

$(document).ready(function () {
  initVideo();


  $('#player').on('click',function(){
    togglePanel();
  })


  $(document).keydown(function (event) {
    // alert(String.fromCharCode(event.which));
   // console.log(event.keyCode);
        if (event.key == "f") {
      toggleFull();
    } else if (event.keyCode == 32 ) {
      playPause();
    } else if (event.key == "s") {
      screenShot();
    } else if (event.key == "ArrowUp") {
     player.volume += 0.1;
     notification.show();
     var cc = Math.round((player.volume / 1) * 100) + "%";
     notification.html("Volume " + cc);
    } else if (event.key == "ArrowDown") {
         player.volume -= 0.1;
    notification.show();
    var cc = Math.round((player.volume / 1) * 100) + "%";
    notification.html("Volume " + cc);
    } else if (event.key == "n") {
      next();
    } else if (event.key == "p") {
      previous();
    } else if (event.key == "m") {
      toggleMutex();
    } else if (event.key == "ArrowRight") {
      skipForward()
    } else if (event.key == "ArrowLeft") {
      skipPrevious();
    }

    //}
  });
});

$(document).keyup(function(){
   setTimeout(function(){
    notification.hide();
   },400);
});


var videos = ["irap.mp4", "evansvideo.mp4", "thankyou.mp4"];
var playIndex = 0;
var videosLength = videos.length;
var wasPlaying = false;



var cc = $("#control-panel-desk").offset().top;
var minipp = $("#mini-thumb");
var miniplayer = document.querySelector("#mini-thumb");
var mini_durr = $("#mini-durr");



function initVideo() {
  if (videosLength > 0)
    vid.attr({ "src": videos[playIndex] });
  minipp.attr({ "src": videos[playIndex] });
  convertTime(Math.round(player.currentTime));
  setNav();
  seekbar.css({ "width": 0 * 100 + '%' });
  seek_thumb.css({ "left": "calc(" + 0 * 100 + "% - 10px)" });
  sec_thumb.css({ "left": "calc(" + 0 * 100 + "% - 10px)" });

}

function setNav() {
  videosLength = videos.length;
  if (videosLength == 1) {
    $("*#next, *#previous").css({ "color": "lightgrey" });
  } else {
    if (playIndex < videos.length - 1) {
      $("*#next").css({ "color": "white" });
      $("*#previous").css({ "color": "white" });
    }
    if (playIndex == videos.length - 1) {
      $("*#next").css({ "color": "lightgrey" });
      $("*#previous").css({ "color": "white" });
    }

    if (playIndex == 0) {
      $("*#next").css({ "color": "white" });
      $("*#previous").css({ "color": "lightgrey" });
    }
  }

}

function next() {
  if (playIndex < videos.length-1) {
    playIndex++;
    initVideo();
    playPause();
  }
}

function previous() {
  if (playIndex > 0) {
    playIndex--;
    initVideo();
    playPause();
  }
}


function skipForward() {
  var time = player.currentTime;
  player.currentTime = time + 10;

}

function skipPrevious() {
  var time = player.currentTime;
  player.currentTime = time - 10;
}



function playPause() {
  if (player.paused) {
    player.play();
    wasPlaying = true;
    $("*#play-pause").html('<span class="mdi mdi-pause"></span>')
  } else {
    player.pause();
    wasPlaying = false;
    $("*#play-pause").html('<span class="mdi mdi-play"></span>')

  }
}

var sec_thumb = $("#seek-thumb-2");
var sec_seekbar = $("#seekbar-2");
player.addEventListener('timeupdate', function () {
  var pos = player.currentTime / player.duration;
  seekbar.css({ "width": pos * 100 + '%' });
  seek_thumb.css({ "left": "calc(" + pos * 100 + "% - 10px)" });
  sec_thumb.css({ "left": "calc(" + pos * 100 + "% - 10px)" });
   setNav();
  convertTime(Math.round(player.currentTime));
});

player.addEventListener('ended',function(){
  next();
});

function changeVolume() {
  player.volume = volumeSlider.value;

}

function scrub(e, el) {
  const scrubTime = (e.offsetX / el.width()) * player.duration;
  player.currentTime = scrubTime;
}

$("#seekbar, #seekbar-2").click(function (e) {
  var el = $(this);
  scrub(e, el);
});







function convertTim(t) {
  var days = Math.floor(t / (1000 * 60 * 60 * 24)) > 0 ? Math.floor(t / (1000 * 60 * 60 * 24)) : "";
  var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  var secs = Math.floor((t % (1000 * 60)) / 1000);
  return days + ":" + hours + ":" + mins + ":" + secs;
}

function convertTime(seconds) {
  var min = Math.floor(seconds / 60);
  var sec = seconds % 60;

  min = (min < 10) ? "0" + min : min;
  sec = (sec < 10) ? "0" + sec : sec;
  // $(".duration").textContent(min + ":" + sec);
  var curr = min + ":" + sec;

  totalTime(curr, Math.round(player.duration));


}

function totalTime(curr, seconds) {
  var min = Math.floor(seconds / 60);
  var sec = seconds % 60;
  $("*#curr-duration").html(curr);
  if( sec > 0){
  $("*#total-duration").html(min + ":" + sec);
  }else{
    $("*#total-duration").html('--:--');
  }
}

// function fullScreen() {
//   player.requestFullscreen();
// }


$("*.volume-cover").hover(function () {
  $("*.range-cover").fadeToggle();
});

function views() {
  if (matchMedia("screen and (min-width: 320px) and (max-width: 767px)").matches) {

  } else {
    vid.hover(function () {
      panelDesk.fadeIn();
    }, function () {
      panelDesk.fadeOut();
    });
  }
}

$(window).resize(function () {
  // views();
});



var canvas = document.getElementById('canvas');
var video = document.getElementById('player');
function screenShot() {
  $("*#screenshot-background").css({ "display": "flex" });
  player.pause();
  $("*#play-pause").html('<span class="mdi mdi-play"></span>')
  panelDesk.fadeOut();
  panelMob.fadeOut();
  console.log(video.videoWidth)
  canvas.setAttribute('height',video.videoHeight)
  canvas.setAttribute('width',video.videoWidth)
  // canvas.style.width = video.videoWidth + 'px';
  // canvas.style.height = video.videoHeight + 'px';
  // canvas.attr({ "height": video.videoHeight + 'px', "width": video.videoWidth + 'px' });
  canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

  $("*#download-link").attr({ "download": "screentshot" + Date.now() })
  var dataUrl = canvas.toDataURL();
  $("*#screen-shot").attr({ "src": dataUrl });
}


download_img = function (el) {
  var imageURI = canvas.toDataURL("image/jpg");
  el.href = imageURI;
  $("*#screenshot-background").css({ "display": "none" });
  if (wasPlaying)
    player.play();
  $("*#play-pause").html('<span class="mdi mdi-pause"></span>')
};

function cancel() {
  $("*#screenshot-background").css({ "display": "none" });
  if (wasPlaying)
    player.play();
  $("*#play-pause").html('<span class="mdi mdi-pause"></span>')
}

var isMuted = false;
var prevVol = player.volume;
function toggleMutex() {
  if (!isMuted) {
    prevVol = player.volume;
    player.volume = 0
    isMuted = true
    $("*#toggle-volume").html('<span class="mdi mdi-volume-off"></span>');
  } else {
    player.volume = prevVol;
    isMuted = false
    $("*#toggle-volume").html('<span class="mdi mdi-volume-high"></span>');
  }

}


function touchseek(event) {

  event.stopPropagation()
  let tm = event.touches[0].clientX
  let tmp = event.target.offsetLeft
  tmp = tm - tmp
  //stores the pivot point in a tag
  event.target.setAttribute("pivot", tmp)
  //get video play flag
  //seekPlay = isPlay
  //console.log(tmp);
}


function touchseekmove(event) {
  //pause video
  //player.pause()
  //isPlay = false

  event.stopPropagation
  let tm = event.touches[0].clientX
  let tmp = event.target.offsetLeft
  tmp = tm - tmp

  //get pivot point
  let pvt = event.target.getAttribute("pivot") + ""
  pvt = pvt * 1

  tmp = tmp - pvt

  var convertPercent = tmp / $("#seekbar-2").width() * 100;

  console.log(tmp + " " + convertPercent);

  seekbar.css({ "width": convertPercent + '%' });
  seek_thumb.css({ "left": "calc(" + convertPercent + "% - 10px)" });
  sec_thumb.css({ "left": "calc(" + convertPercent + "% - 10px)" });

  //  const scrubTime = (tmp/ $("#seekbar-2").width())*player.duration;
  //player.currentTime = scrubTime;

}

function touchseekend() {
  //play video if it was playing before
  // if(seekPlay){
  //   player.play()
  // isPlay = true
  // }
}





var isOver = false;
seek_cover.mouseenter(function () {
  isOver = true;
  $("#floatplayer").show();
});

seek_cover.mouseleave(function () {
  isOver = false;
  $("#floatplayer").hide();
});
seek_cover.mousemove(function (e) {
  var ppH = $("#floatplayer").height();
  var ppW = $("#floatplayer").width();
  if (isOver)
    $("#floatplayer").css({ "left": e.clientX - ppW / 2, "top": cc - ppH });

  var scrubTimem = e.offsetX / seek_cover.width() * miniplayer.duration;
  //console.log(scrubTimem);
  miniplayer.currentTime = scrubTimem;
  var ss = Math.round(miniplayer.currentTime);
  var min = Math.floor(ss / 60);
  var sec = ss % 60;
  min = (min < 10) ? "0" + min : min;
  sec = (sec < 10) ? "0" + sec : sec;

  var curr = min + ":" + sec;
  mini_durr.html(curr);
});




var containerx = document.querySelector(".container");
containerx.addEventListener("touchstart", getTouchDirection, false)
containerx.addEventListener("touchmove", getTouchDirection, false);
containerx.addEventListener("touchend", hidePopups, false);

var touchXDirection = "";
var touchYDirection = "";

var oldTouchX = 0;
var oldTouchY = 0;
var screeenWIdth;
var currentVolume = 1, currentBrightness = 100;
var volumeIncreaseLimiter = 0, volumeDecreaseLimiter = 0;
var brightnessIncreaseLimiter = 0, brightnessDecreaseLimiter = 0;




function getTouchDirection(e) {
  screeenWIdth = window.innerWidth;
  var cc = screeenWIdth / 2;
  //for right and left movement
  if (e.type == "touchstart" || e.type == "touchmove") {
    if (oldTouchX < e.touches[0].clientX) {
      touchXDirection = "right";
    } else { touchXDirection = "left"; }
    //for up and down movement
    if (oldTouchY < e.touches[0].clientY) {
      if (oldTouchX < cc) {
        //  decreaseBrighness();
      } else {
        decreaseVolume();
        notification.show();
      }
      touchYDirection = "down";
    } else {
      if (oldTouchX < cc) {
        //  increaseBrighness();
      } else {
        increaseVolume();
      }
      touchYDirection = "up";
    }
    oldTouchX = e.touches[0].clientX;
    oldTouchY = e.touches[0].clientY;
  }
}
function hidePopups() {
  //to hide the brightness/volume count after drag
  notification.hide();
}


function increaseVolume() {
  if (volumeIncreaseLimiter < 7) {
    volumeIncreaseLimiter++;
  } else {
    if (player.volume < 1)
      player.volume += 0.1;
    volumeIncreaseLimiter = 0;
    var cc = Math.round((player.volume / 1) * 100) + "%";
    notification.html("Volume " + cc);
  }
}

function decreaseVolume() {
  if (volumeDecreaseLimiter < 7) {
    volumeDecreaseLimiter++;
  } else {
    if (player.volume > 0)
      player.volume -= 0.1;
    volumeDecreaseLimiter = 0;
    var cc = Math.round((player.volume / 1) * 100) + "%";
    notification.html("Volume " + cc);
  }
}


var isPanelShowing2 = true;
function togglePanel() {

  //for mobile and tablet
  if (matchMedia("screen and (min-width: 320px) and (max-width: 767px)").matches) {
    if (isPanelShowing2) {
      panelMob.fadeOut();
      isPanelShowing2 = false;
    } else {
      panelMob.fadeIn();
      isPanelShowing2 = true;
    }
   
  } else {//for desktop and tablets
    if (isPanelShowing2) {
      panelDesk.fadeOut();
      isPanelShowing2 = false;
    } else {
      panelDesk.fadeIn();
      isPanelShowing2 = true;
    }
  }

}



function cancelFullScreen(el) {
  var requestMethod = el.cancelFullScreen||el.webkitCancelFullScreen||el.mozCancelFullScreen||el.exitFullscreen;
  if (requestMethod) { // cancel full screen.
      requestMethod.call(el);
  } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
      var wscript = new ActiveXObject("WScript.Shell");
      if (wscript !== null) {
          wscript.SendKeys("{F11}");
      }
  }
  $("*#togglefullscreen").html("<span class='mdi mdi-fullscreen'></span>");
}

function requestFullScreen(el) {
  // Supports most browsers and their versions.
  var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;

  if (requestMethod) { // Native full screen.
      requestMethod.call(el);
  } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
      var wscript = new ActiveXObject("WScript.Shell");
      if (wscript !== null) {
          wscript.SendKeys("{F11}");
      }
  }
  $("*#togglefullscreen").html("<span class='mdi mdi-fullscreen-exit'></span>");
  return false
}

function toggleFull() {
  var elem = document.body; // Make the body go full screen.
  var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) ||  (document.mozFullScreen || document.webkitIsFullScreen);

  if (isInFullScreen) {
      cancelFullScreen(document);
     
  } else {
      requestFullScreen(elem);
     

  }
  return false;
}
var wheelTimeout;

$(document).on('mousewheel',function(e){
  if(e.originalEvent.wheelDelta/ 120 > 0){//up
    wheelTimeout =
  console.log('up')
  player.volume += 0.1;
    notification.show();
    var cc = Math.round((player.volume / 1) * 100) + "%";
    notification.html("Volume " + cc);
    clearTimeout(wheelTimeout)
  }else{//down
    console.log('down')
    player.volume -= 0.1;
    notification.show();
    var cc = Math.round((player.volume / 1) * 100) + "%";
    notification.html("Volume " + cc);
    clearTimeout(wheelTimeout)
  }

  wheelTimeout = setTimeout(function () {
    
   notification.hide()
  }, 500);
})


var containerMovetimeout;
$(document).on('mousemove',function(){
  panelDesk.fadeIn()
  isPanelShowing = true
  document.documentElement.style.cursor = 'auto'
 clearTimeout(containerMovetimeout)

 //try to hide panel when mouse is idle
 containerMovetimeout = setTimeout(function(){
   if(isOver2){return}//if mouse is over control pannel do not hide it
  panelDesk.hide()
   document.documentElement.style.cursor = 'none'
  isPanelShowing = false
},1000)
})

var isOver2 = false;
panelDesk.mouseenter(function () {
  isOver2 = true;
 
});

panelDesk.mouseleave(function () {
  isOver2 = false;
  
});

$(document).ready(function(){
  alert(
    `Videoplayer Designed By Xceldeveloper \n
     Controls: \n Buttons N = next , Space = pause/play , S = screenshot, F = fullscreen
     \n
     Arrow Buttons = Up: increase volume, Down : decrease volume \n
     ArrowLeft: fastrewind , ArrowRight: fastfoward \n
     ------------------------------------------------\n
     xceldeveloper.com || xceldeveloper@gmail.com

    `
  )
})



