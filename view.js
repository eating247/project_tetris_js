// var TETRIS = TETRIS || {};

var View = (function(){

  var _transmitMove;

  var init = function(transmitMove) {
    _transmitMove = transmitMove;
    setListeners();
  }

  var setListeners = function() {
    console.log('listeners');
    $(document).keydown( function(e) {
      _transmitMove(e.which);
    } );
  }

  var renderGrid = function(ctx) {
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

  var renderBoard = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(0, 0, 300, 600);
    ctx.closePath();
  }

  var renderBlocks = function(ctx, blocks) {
    blocks.forEach(function(block){
      ctx.beginPath();
      ctx.fillStyle = colors[block.colorID];
      ctx.fillRect(block.x*30, block.y*30, 30, 30);
      ctx.closePath();      
    });
  }

  var render = function(blocks) {
    var canvas = $('#board').get(0);
    var ctx = canvas.getContext('2d');
    
    renderBoard(ctx);
    renderBlocks(ctx, blocks);
    renderGrid(ctx);
  }

  // public methods
  return {
    init: init,
    render: render,
  }
  
})()