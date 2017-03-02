// var TETRIS = TETRIS || {};

var Controller = (function(){

  var init = function() {
    Model.newPiece();
    // console.log(Model.getBlocks())
    View.init(transmitMove);
  }

  var loop = setInterval( function(){
      var blocks = Model.getBlocks();
      View.render(blocks);
      Model.refresh(); 
      checkGameOver();
       }, 100);

  var transmitMove = function(key){
    Model.registerMove(key);
  }

  var checkGameOver = function() {
    // refactor gameover
    if ( Model.gameOver() ) {
      clearInterval(loop);
      View.gameOver();
      console.log('GAME OVER!!!!!')
    }
  }

  return {
    init: init,
    loop: loop
  }
  
})()

// clearInterval(Controller.loop);

$( document ).ready( function(){ Controller.init() } );