var TETRIS = TETRIS || {};

TETRIS.Controller = (function(){

  var init = function() {
    TETRIS.Model.newPiece();
    TETRIS.View.init(transmitMove);
  }

  var _loop = setInterval( function(){
      var blocks = TETRIS.Model.getBlocks();
      TETRIS.View.render(blocks);
      _checkGameOver();
      TETRIS.Model.refresh(); 
       }, 100);

  var transmitMove = function(key){
    TETRIS.Model.registerMove(key);
  }

  var _checkGameOver = function() {
    if ( TETRIS.Model.gameOver() ) {
      clearInterval(_loop);
      TETRIS.View.gameOver();
    }
  }

  return {
    init: init
  }
  
})()

// clearInterval(Controller.loop);

$( document ).ready( function(){ TETRIS.Controller.init() } );