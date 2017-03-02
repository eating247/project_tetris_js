// var TETRIS = TETRIS || {};

var Model = (function(){

  var refresh = function() {
    var current = getCurrentPiece();
    // console.log(current);
    incrementPiece(current);
    checkPosition(current);
    clearRows();
  }

  var blocks = [];

  var getBlocks = function() {
    return blocks;
  }

  var getCurrentPiece = function() {
    return blocks.slice(0, 4);
  }

//// new pieces

  var pieceTypes = ['square', 
                    'bar', 
                    'leftL', 
                    'rightL', 
                    'leftS', 
                    'rightS']

  var newPiece = function() {
    // randomly select type of piece
    var i = Math.floor(Math.random() * 6);
    switch (pieceTypes[i]) {
      case 'square':
        squarePiece();
        break;
      case 'bar':
        barPiece();
        break;
      case 'leftL':
        leftLPiece();
        break;
      case 'rightL':
        rightLPiece();
        break;
      case 'leftS':
        leftSPiece();
        break;
      case 'rightS':
        rightSPiece();
        break;
    }
  }

  var squarePiece = function() {
    var colorID = Math.floor(Math.random() * 4);
    var xVal = Math.floor(Math.random() * 9);
    var newBlock = [];
    newBlock.push( 
      new Block(colorID, xVal,   -2),
      new Block(colorID, xVal+1, -2),
      new Block(colorID, xVal,   -1),
      new Block(colorID, xVal+1, -1)
    );
    blocks = newBlock.concat(blocks);
  }

  var barPiece = function() {
    var colorID = Math.floor(Math.random() * 4);
    var x = Math.floor(Math.random() * 10);
    var newBlock = [];
    newBlock.push( 
      new Block(colorID, x, -4),
      new Block(colorID, x, -3),
      new Block(colorID, x, -2),
      new Block(colorID, x, -1)
    );
    blocks = newBlock.concat(blocks);
  }

  var leftLPiece = function() {
    var colorID = Math.floor(Math.random() * 4);
    var x = Math.floor(Math.random() * 9);
    var newBlock = [];
    newBlock.push( 
      new Block(colorID, x,   -3),
      new Block(colorID, x,   -2),
      new Block(colorID, x,   -1),
      new Block(colorID, x+1, -1)
    );
    blocks = newBlock.concat(blocks);
  }

  var rightLPiece = function() {
    var colorID = Math.floor(Math.random() * 4);
    var x = Math.floor(Math.random() * 9);
    var newBlock = [];
    newBlock.push( 
      new Block(colorID, x+1, -3),
      new Block(colorID, x+1, -2),
      new Block(colorID, x+1, -1),
      new Block(colorID, x,   -1)
    );
    blocks = newBlock.concat(blocks);
  }

  var leftSPiece = function() {
    var colorID = Math.floor(Math.random() * 4);
    var x = Math.floor(Math.random() * 9);
    var newBlock = [];
    newBlock.push( 
      new Block(colorID, x,   -3),
      new Block(colorID, x,   -2),
      new Block(colorID, x+1, -2),
      new Block(colorID, x+1, -1)
    );
    blocks = newBlock.concat(blocks);
  }

  var rightSPiece = function() {
    var colorID = Math.floor(Math.random() * 4);
    var x = Math.floor(Math.random() * 9);
    var newBlock = [];
    newBlock.push( 
      new Block(colorID, x+1, -3),
      new Block(colorID, x+1, -2),
      new Block(colorID, x,   -2),
      new Block(colorID, x,   -1)
    );
    blocks = newBlock.concat(blocks);
  }


///// new pieces


  var incrementPiece = function(current) {
    if ( pieceProceeding(current) ) { 
      current.forEach(function(block) {
        block.y++
      });
    } else { 
      newPiece();
    }
  }

  var pieceProceeding = function(piece) {
    var proceeding = true
    piece.forEach(function(block) {
      if (!block.proceed) {
        proceeding = false;
      }
    });
    return proceeding;
  }

  var blockAt = function(x, y) {
    var result;
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i].proceed === false && blocks[i].x === x && blocks[i].y === y) {
        result = true;
        break;
      } else {
        result = false;
      }
    }
    return result;
  }

  var checkPosition = function(current) {
    if ( pieceProceeding(current) && reachedObstacle(current) ) {
      stopPiece(current);
      newPiece();
    }
  }

  var reachedObstacle = function(current) {
    // var bottomBlocks = getBottomBlocks(current);
    var stop = false;
    current.forEach(function(block) {
      if ( block.y === 19 || blockAt(block.x, block.y+1) ) {
        stop = true;
      }
    });
    return stop;
  }

  var getBottomBlocks = function(current) {
    var bottomBlocks = [];
    current.forEach(function(block) {
      if (block.bottom) { bottomBlocks.push(block) };
    });
    return bottomBlocks;
  }

  var stopPiece = function(current) {
    current.forEach(function(block) {
      block.proceed = false;
    });
  }

  var pieceDown = function(current) {
    if ( pieceProceeding(current) ) { 
      while ( checkPieceBelow(current) ) {
        pieceIncrementDown(current);
      }
    }
    stopPiece(current);
  }

  var checkPieceBelow = function(current) {
    var clear = true;
    current.forEach(function(bl) {
      if ( bl.y === 19 || blockAt(bl.x, bl.y+1) ) {
        clear = false;
      }
    });
    return clear;
  }

  var pieceIncrementDown = function(current) {
    current.forEach(function(block) {
      block.y++
    });
  }

  var pieceLeft = function(current) {
    console.log('left')
    if ( checkPieceLeft(current) ) {
      current.forEach( function(block) {block.x--} );
    }
  }

  var checkPieceLeft = function(current) {
    var status = true;
    current.forEach(function(block) {
    if ( block.x === 0 || blockAt(block.x-1, block.y)) {
      status = false;
    }
    });
    return status;
  }

  var pieceRight = function(current) {
    console.log('right')
    if ( checkPieceRight(current) ) {
      current.forEach( function(block) {block.x++} );
    }
  }

  var checkPieceRight = function(current) {
    var status = true;
    current.forEach(function(block) {
      if ( block.x === 9 || blockAt(block.x+1, block.y) ) {
        status = false;
      }
    });
    return status;
  }

  var registerMove = function(key) {
    var current = getCurrentPiece();
    switch(key) {
      case 37:
        //left
        pieceLeft(current);
        break;
      case 39:
        //right
        pieceRight(current);
        break;
      case 40:
        //down arrow
        pieceDown(current);
        break;
      case 32:
        // space bar
        pieceDown(current);
        break;
      case 38:
        //up
        break;
    }
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
    // if piece at top and not moving? vs. if piece at top and there's a block below it
    var result = false;
    blocks.forEach(function(block){
      if (!block.proceed && block.y === 0) { result = true }
    })
    return result;
  }

  return {
    refresh: refresh,
    newPiece: newPiece,
    getBlocks: getBlocks,
    registerMove: registerMove,
    gameOver: gameOver
  }

})()