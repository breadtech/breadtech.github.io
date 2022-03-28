const canvas = document.getElementById('chess');
const ctx = canvas.getContext('2d');

// Board.
for (var i = 0; i < 8; i++) {
  for (var j = 0; j < 8; j++) {
		ctx.fillStyle = (i + j) % 2 === 0 ? "#888" : "#fff";
		ctx.fillRect(i*80, j*80, 80, 80);
  }
}
ctx.lineWidth = "5px";
ctx.strokeRect(0, 0, 640, 640);

// Pieces.
ctx.font = 'bold 64px serif';
ctx.fillStyle = "#000";
const pieces = {
	WhiteKing:   0x2654,
	WhiteQueen:  0x2655,
	WhiteRook:   0x2656,
	WhiteBishop: 0x2657,
	WhiteKnight: 0x2658,
	WhitePawn:   0x2659,
	BlackKing:   0x265A,
	BlackQueen:  0x265B,
	BlackRook:   0x265C,
	BlackBishop: 0x265D,
	BlackKnight: 0x265E,
	BlackPawn:   0x265F,
}
const dx = 14;
const dy = 52;

var blackPieces = [
	pieces.BlackRook, pieces.BlackKnight, 
	pieces.BlackBishop, pieces.BlackKing,
	pieces.BlackQueen, pieces.BlackBishop, 
	pieces.BlackKnight, pieces.BlackRook,
]
for (var i = 0; i < 8; i++) {
	ctx.fillText(String.fromCharCode(blackPieces[i]), dx+(i*80), dy);
}
for (var i = 0; i < 8; i++) {
	ctx.fillText(String.fromCharCode(pieces.BlackPawn), dx+(i*80), dy+80);
}

var whitePieces = [
	pieces.WhiteRook, pieces.WhiteKnight, 
	pieces.WhiteBishop, pieces.WhiteKing,
	pieces.WhiteQueen, pieces.WhiteBishop, 
	pieces.WhiteKnight, pieces.WhiteRook,
]
for (var i = 0; i < 8; i++) {
	ctx.fillText(String.fromCharCode(whitePieces[i]), dx+(i*80), dy+480);
}
for (var i = 0; i < 8; i++) {
	ctx.fillText(String.fromCharCode(pieces.WhitePawn), dx+(i*80), dy+560);
}
