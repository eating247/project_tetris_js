// var TETRIS = TETRIS || {};

var Controller = (function(){

  var init = function() {
    Model.newBlock();
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
    if (Model.gameOver() ) {
      clearInterval(loop);
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