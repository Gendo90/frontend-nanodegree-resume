
var pannaCotta = {
  name: "Panna Cotta (Cooked Cream)",
  imgSrc: "images/Dishes/panna_cotta.jpg", //set this right!
  ingredients: ["milk", "cream", "vanilla", "gelatin"]
}

var pestoShrimp = {
  name: "Shrimp with Green Sauce",
  imgSrc: "images/Dishes/pesto_shrimp.jpg", //set this right!
  ingredients: ["shrimp", "butter", "olive oil", "pesto", "lime"]
}



dishList = [pannaCotta, pestoShrimp];




var Dish = function(data) {
  this.name = ko.observable(data.name);
  this.imgSrc = ko.observable(data.imgSrc);
  this.ingredients = ko.observableArray(data.ingredients);
}


var ViewModel = function() {
  var self = this;

  var newDishes = [];

  dishList.forEach(function(item){
    var this_dish = new Dish(item);
    newDishes.push(this_dish);
  });

  self.allDishes = ko.observableArray(newDishes),

  self.currentDish = ko.observable(self.allDishes()[0]), //set to the first dish in the dishList

  this.setCurrentDish = function() {
    self.currentDish(this);
  };
}

ko.applyBindings(new ViewModel())
