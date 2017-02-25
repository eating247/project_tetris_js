// var TETRIS = TETRIS || {};

var Model = (function(){

  var init = function() {
    _createBlocks();
  }

  var blocks = [];

  var _createBlocks = function() {
    for (var i = 5; i > 0; i--) {
      blocks.push(new Block());
    }
  }

  var getBlocks = function() {
    return blocks;
  }

  var checkPositions = function() {
    // stop moving when touched ground or touch something below them
    blocks.forEach(function(block){
      if ( blockBelow(block) || block.y === 19) {
        block.proceed = false;
      }
    });
  }

  var blockBelow = function(block) {
    var x = block.x;
    var y = block.y++;

    for (var i = 0; i < blocks.length; i++) {
      if ( blocks[i].x === x && blocks[i].y === y) {
        return true;
      }
    }
    return false;
  }

  var incrementBlocks = function() {
    blocks.forEach(function(block) {
      if ( block.y < 19 ) {
        block.y++;
      }
    });
  }

  var blockDown = function(block) {
    block.y++;
  }

  var blockLeft = function(block) {
    block.x--;
  }

  var blockRight = function(block) {
    block.x++;
  }

  var registerMove = function() {
  }

  return {
    init: init,
    getBlocks: getBlocks,
    registerMove: registerMove,
    incrementBlocks: incrementBlocks
  }

})()

function Block(x) {
  this.colorID = Math.floor(Math.random() * 4);
  this.sideLength = 30;
  this.x = x || Math.floor(Math.random() * 10);
  this.y = 0;
  this.proceed = true;
};