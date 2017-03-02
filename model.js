var TETRIS = TETRIS || {};

TETRIS.Model = (function(){

  var refresh = function() {
    var current = _getCurrentPiece();
    _incrementPiece(current);
    _checkPosition(current);
    _clearRows();
  }

  var blocks = [];

  var getBlocks = function() {
    return blocks;
  }

  var _getCurrentPiece = function() {
    return blocks.slice(0, 4);
  }

  var _pieceTypes = ['square', 
                    'bar', 
                    'leftL', 
                    'rightL', 
                    'leftS', 
                    'rightS']

  var newPiece = function() {
    // randomly select type of piece
    var i = Math.floor(Math.random() * 6);
    switch (_pieceTypes[i]) {
      case 'square':
        _squarePiece();
        break;
      case 'bar':
        _barPiece();
        break;
      case 'leftL':
        _leftLPiece();
        break;
      case 'rightL':
        _rightLPiece();
        break;
      case 'leftS':
        _leftSPiece();
        break;
      case 'rightS':
        _rightSPiece();
        break;
    }
  }

  var _squarePiece = function() {
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

  var _barPiece = function() {
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

  var _leftLPiece = function() {
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

  var _rightLPiece = function() {
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

  var _leftSPiece = function() {
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

  var _rightSPiece = function() {
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

  var _incrementPiece = function(current) {
    if ( _pieceProceeding(current) ) { 
      current.forEach(function(block) {
        block.y++
      });
    } else { 
      newPiece();
    }
  }

  var _pieceProceeding = function(piece) {
    var proceeding = true
    piece.forEach(function(block) {
      if (!block.proceed) {
        proceeding = false;
      }
    });
    return proceeding;
  }

  var _blockAt = function(x, y) {
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

  var _checkPosition = function(current) {
    if ( _pieceProceeding(current) && _reachedObstacle(current) ) {
      _stopPiece(current);
      newPiece();
    }
  }

  var _reachedObstacle = function(current) {
    var stop = false;
    current.forEach(function(block) {
      if ( block.y === 19 || _blockAt(block.x, block.y+1) ) {
        stop = true;
      }
    });
    return stop;
  }

  var _stopPiece = function(current) {
    current.forEach(function(block) {
      block.proceed = false;
    });
  }

  var _pieceDown = function(current) {
    if ( _pieceProceeding(current) ) { 
      while ( _checkPieceBelow(current) ) {
        _pieceIncrementDown(current);
      }
    }
    _stopPiece(current);
  }

  var _checkPieceBelow = function(current) {
    var clear = true;
    current.forEach(function(bl) {
      if ( bl.y === 19 || _blockAt(bl.x, bl.y+1) ) {
        clear = false;
      }
    });
    return clear;
  }

  var _pieceIncrementDown = function(current) {
    current.forEach(function(block) {
      block.y++
    });
  }

  var _pieceLeft = function(current) {
    if ( _checkPieceLeft(current) ) {
      current.forEach( function(block) {block.x--} );
    }
  }

  var _checkPieceLeft = function(current) {
    var status = true;
    current.forEach(function(block) {
    if ( block.x === 0 || _blockAt(block.x-1, block.y)) {
      status = false;
    }
    });
    return status;
  }

  var _pieceRight = function(current) {
    if ( _checkPieceRight(current) ) {
      current.forEach( function(block) {block.x++} );
    }
  }

  var _checkPieceRight = function(current) {
    var status = true;
    current.forEach(function(block) {
      if ( block.x === 9 || _blockAt(block.x+1, block.y) ) {
        status = false;
      }
    });
    return status;
  }

  var registerMove = function(key) {
    var current = _getCurrentPiece();
    switch(key) {
      case 37: // left
        _pieceLeft(current);
        break;
      case 39: // right
        _pieceRight(current);
        break;
      case 40: // down arrow
        _pieceDown(current);
        break;
      case 32: // space bar
        _pieceDown(current);
        break;
      case 38: // rotate
        break;
    }
  }

  var _blocksOf = function(row) {
    var relevant = [];
    blocks.forEach(function(block){
      if (block.y === row && !block.proceed) {
        relevant.push(block);
      }
    });
    return relevant;
  }

  var _deleteRow = function(row) {
    for (var i = 0; i < row.length; i++) {
      var index = blocks.indexOf(row[i]);
      blocks.splice(index, 1);
    }
  }

  var _incrementRow = function(row) {
    row.forEach(function(block) {
      block.y++;
    })
  }

  var _adjustRows = function(deletedRows) {
    var rowAbove;
    deletedRows.forEach(function(row) {
      for(var i = row; i >= 0; i--) {
        rowAbove = _blocksOf(i);
        _incrementRow(rowAbove);
      }
    });
  }

  var _clearRows = function() {
    var row;
    var deletedRows = [];
    for (var i = 19; i >= 0; i--) {
      row = _blocksOf(i);
      if ( row.length === 10 ) {
        _deleteRow(row);
        deletedRows.push(i);
      }
    }
    if ( deletedRows.length ) { _adjustRows(deletedRows) };
  }

  var gameOver = function() {
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