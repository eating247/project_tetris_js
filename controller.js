// var TETRIS = TETRIS || {};

var Controller = (function(){

  var init = function() {
    Model.init();
    var blocks = Model.getBlocks();
    View.init(transmitMove)
    View.render(blocks);

    setInterval( function(){ 
      console.log('hello')
      View.render(blocks);
      Model.incrementBlocks() }, 50);
  }
  // model
  //create blocks with randomized positions (x positions along 30px intervals)

  // view
  // render 

  var transmitMove = function(key){
    Model.registerMove(key);
  }

  return {
    init: init
  }
  
})()

$( document ).ready( function(){ Controller.init() } );