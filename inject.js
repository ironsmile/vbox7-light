
function loadVideo(playerUrl, autoplay) {
  swfobject.embedSWF(
      playerUrl + '&rel=1&border=0&fs=1&autoplay=' + 
      (autoplay?1:0), 'player', '512', '439', '9.0.0', false,
      false, {allowfullscreen: 'true'});
}
