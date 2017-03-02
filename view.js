var TETRIS = TETRIS || {};

TETRIS.View = (function(){

  var _transmitMove;

  var init = function(transmitMove) {
    _transmitMove = transmitMove;
    _setListeners();
  }

  var _setListeners = function() {
    $(document).keydown( function(e) {
      _transmitMove(e.which);
    } );
  }

  var _renderGrid = function(ctx) {
    for (var x = 30; x < 300; x += 30) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 600);
    }
    for (var y = 30; y < 600; y += 30) {
      ctx.moveTo(0, y);
      ctx.lineTo(300, y);
    }
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#eee';
    ctx.stroke();
  }

  var colors = ['#104547', '#5B2E48', '#AF929D', '#D2D6EF']

  var _renderBoard = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(0, 0, 300, 600);
    ctx.closePath();
  }

  var _renderBlocks = function(ctx, blocks) {
    blocks.forEach(function(block){
      ctx.beginPath();
      ctx.fillStyle = colors[block.colorID];
      ctx.fillRect(block.x*30, block.y*30, 30, 30);
      ctx.closePath();      
    });
  }

  var gameOver = function() {
    $('h1').addClass('over');
  }

  var render = function(blocks) {
    var canvas = $('#board').get(0);
    var ctx = canvas.getContext('2d');
    
    _renderBoard(ctx);
    _renderBlocks(ctx, blocks);
    _renderGrid(ctx);
  }

  return {
    init: init,
    render: render,
    gameOver: gameOver
  }
  
})()