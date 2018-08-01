
var lampBase = {
  name: "Upstairs Lamp Base",
  imgSrc: "images/Sketches/lamp_base.jpg", //set this right!
  components: ["pencil", "sketchbook"]
}

var gengar = {
  name: "Stylized Gengar",
  imgSrc: "images/Sketches/gengar.jpg", //set this right!
  components: ["pencil", "sketchbook"]
}

var snorlax = {
  name: "Snorlax",
  imgSrc: "images/Sketches/snorlax.jpg", //set this right!
  components: ["pencil", "sketchbook"]
}

var voltorb = {
  name: "Voltorb",
  imgSrc: "images/Sketches/voltorb.jpg", //set this right!
  components: ["pencil", "sketchbook"]
}


pieceList = [lampBase, gengar, snorlax, voltorb];




var Piece = function(data) {
  this.name = ko.observable(data.name);
  this.imgSrc = ko.observable(data.imgSrc);
  this.components = ko.observableArray(data.components);
}


var ViewModel = function() {
  var self = this;

  var newPieces = [];

  pieceList.forEach(function(item){
    var this_piece = new Piece(item);
    newPieces.push(this_piece);
  });

  self.allPieces = ko.observableArray(newPieces),

  self.currentPiece = ko.observable(self.allPieces()[0]), //set to the first dish in the dishList

  this.setCurrentPiece = function() {
    self.currentPiece(this);
  };
}

ko.applyBindings(new ViewModel())
