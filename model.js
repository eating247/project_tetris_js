// var TETRIS = TETRIS || {};

var Model = (function(){

  var refresh = function() {
    var current = getCurrentBlock();
    incrementBlock(current);
    checkPosition(current);
    clearRows();
  }

  var blocks = [];

  var getBlocks = function() {
    return blocks;
  }

  var newBlock = function() {
    blocks.unshift( new Block() );
  }

  var incrementBlock = function(current) {
    if ( current.proceed ) { 
      blocks[0].y++
    } else { 
      newBlock();
    }
  }

  var blockAt = function(x, y) {
    var result;
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i].x === x && blocks[i].y === y) {
        result = true;
        break;
      } else {
        result = false;
      }
    }
    return result;
  }

    var checkPosition = function(current) {
    // stop proceeding after reaching bottom row or block directly below
    if ( current.proceed && ( current.y === 19 || blockAt(current.x, current.y+1) ) ) {
      current.proceed = false;
      newBlock();
    }

  }

  var blockDown = function(current) {
    if (current.proceed) {
      if (blockAt(current.x, 19)) {
        while (!blockAt(current.x, current.y+1)) {
          current.y++;
        }
      } else {
        current.y = 19;        
      }
    }
    current.proceed = false;
  }

  var blockLeft = function(current) {
    if ( current.x > 0 && !blockAt(current.x-1, current.y)) {
      current.x--;
    }
    
  }

  var blockRight = function(current) {
    if (current.x < 9 && !blockAt(current.x+1, current.y)) {
      current.x++;
    }
  }

  var registerMove = function(key) {
    var current = getCurrentBlock();
    switch(key) {
      case 37:
        //left
        blockLeft(current);
        break;
      case 39:
        //right
        blockRight(current);
        break;
      case 40:
        //down arrow
        blockDown(current);
        break;
      case 32:
        // space bar
        blockDown(current);
        break;
      case 38:
        //up
        break;
    }
  }

  var getCurrentBlock = function() {
    return blocks[0];
  }

  var blocksOf = function(row) {
    var relevant = [];
    blocks.forEach(function(block){
      if (block.y === row && !block.proceed) {
        relevant.push(block);
      }
    });
    return relevant;
  }

  var deleteRow = function(row) {
    for (var i = 0; i < row.length; i++) {
      var index = blocks.indexOf(row[i]);
      blocks.splice(index, 1);
    }
  }

  var incrementRow = function(row) {
    row.forEach(function(block) {
      block.y++;
    })
  }

  var adjustRows = function(deletedRows) {
    var rowAbove;
    deletedRows.forEach(function(row) {
      for(var i = row; i >= 0; i--) {
        rowAbove = blocksOf(i);
        incrementRow(rowAbove);
      }
    });
  }

  var clearRows = function() {
    var row;
    var deletedRows = [];
    for (var i = 19; i >= 0; i--) {
      row = blocksOf(i);
      if ( row.length === 10 ) {
        deleteRow(row);
        deletedRows.push(i);
      }
    }
    if ( deletedRows.length ) { adjustRows(deletedRows) };
  }

  var gameOver = function() {
    var current = getCurrentBlock();
    if ( current.y === 0 && blockAt(current.x, 1) ) {
      return true;
    } else {
      return false;
    }
  }

  return {
    refresh: refresh,
    newBlock: newBlock,
    getBlocks: getBlocks,
    registerMove: registerMove,
    gameOver: gameOver
  }

})()

function Block(x) {
  this.colorID = Math.floor(Math.random() * 4);
  this.sideLength = 30;
  this.x = x || Math.floor(Math.random() * 10);
  this.y = 0;
  this.proceed = true;
};