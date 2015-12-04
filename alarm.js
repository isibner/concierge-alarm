var Player = require('player');

var SONGS = [];

for (var i = 0; i < 20; i++) {
  SONGS.push('./alarm.mp3');
}

var player = new Player(SONGS);

function handleError(p) {
  p.on('error', function (e) {
    if (e === 'No next song was found') {
      console.log(e);
      p.stop();
      player = new Player(SONGS);
      handleError(player);
      player.play();
    }
  });
}

handleError(player);

module.exports = {
  play: function () {
    player.play();
  },

  pause: function () {
    player.pause();
  }
};
