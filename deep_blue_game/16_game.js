var simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

var Level = class Level {
  constructor(plan) {
    let rows = plan.trim().split("\n").map(l => [...l]);
    this.height = rows.length;
    this.width = rows[0].length;
    this.startActors = [];

    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        let type = levelChars[ch];
        if (typeof type == "string") return type;
        this.startActors.push(
          type.create(new Vec(x, y), ch));
        return "empty";
      });
    });
  }
}

var State = class State {
  constructor(level, actors, status) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  static start(level) {
    return new State(level, level.startActors, "playing");
  }

  get player() {
    return this.actors.find(a => a.type == "player");
  }
}

var Vec = class Vec {
  constructor(x, y) {
    this.x = x; this.y = y;
  }
  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }
  times(factor) {
    return new Vec(this.x * factor, this.y * factor);
  }
}

var Player = class Player {
  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
  }

  get type() { return "player"; }

  static create(pos) {
    return new Player(pos.plus(new Vec(0, -0.5)),
                      new Vec(0, 0));
  }
}

Player.prototype.size = new Vec(0.8, 1.5);

var Lava = class Lava {
  constructor(pos, speed, reset) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  get type() { return "lava"; }

  static create(pos, ch) {
    if (ch == "=") {
      return new Lava(pos, new Vec(2, 0));
    } else if (ch == "|") {
      return new Lava(pos, new Vec(0, 2));
    } else if (ch == "v") {
      return new Lava(pos, new Vec(0, 3), pos);
    }
  }
}

Lava.prototype.size = new Vec(1, 1);

// new "Monster" object that can collide with the
// Player and cause the player to lose
var Monster = class Monster {
  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
  }

  get type() { return "monster"; }

  static create(pos) {
    return new Monster(pos.plus(new Vec(-0.5, -0.5)), new Vec(3, 0));
  }
}

Monster.prototype.size = new Vec(1, 1);

var Coin = class Coin {
  constructor(pos, basePos, wobble) {
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }

  get type() { return "coin"; }

  static create(pos) {
    let basePos = pos.plus(new Vec(0.2, 0.1));
    return new Coin(basePos, basePos,
                    Math.random() * Math.PI * 2);
  }
}

Coin.prototype.size = new Vec(0.6, 0.6);

var levelChars = {
  ".": "empty", "#": "wall", "+": "lava",
  "@": Player, "o": Coin,
  "=": Lava, "|": Lava, "v": Lava, "*":Monster
};

var simpleLevel = new Level(simpleLevelPlan);

function elt(name, attrs, ...children) {
  let dom = document.createElement(name);
  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }
  for (let child of children) {
    dom.appendChild(child);
  }
  return dom;
}

var DOMDisplay = class DOMDisplay {
  constructor(parent, level) {
    this.dom = elt("div", {class: "game"}, drawGrid(level));
    this.actorLayer = null;
    parent.appendChild(this.dom);
  }

  clear() { this.dom.remove(); }
}

var scale = 20;

function drawGrid(level) {
  return elt("table", {
    class: "background",
    style: `width: ${level.width * scale}px`
  }, ...level.rows.map(row =>
    elt("tr", {style: `height: ${scale}px`},
        ...row.map(type => elt("td", {class: type})))
  ));
}

function drawActors(actors) {
  return elt("div", {}, ...actors.map(actor => {
    let rect = elt("div", {class: `actor ${actor.type}`});
    rect.style.width = `${actor.size.x * scale}px`;
    rect.style.height = `${actor.size.y * scale}px`;
    rect.style.left = `${actor.pos.x * scale}px`;
    rect.style.top = `${actor.pos.y * scale}px`;
    return rect;
  }));
}

DOMDisplay.prototype.syncState = function(state) {
  if (this.actorLayer) this.actorLayer.remove();
  this.actorLayer = drawActors(state.actors);
  this.dom.appendChild(this.actorLayer);
  this.dom.className = `game ${state.status}`;
  this.scrollPlayerIntoView(state);
};

DOMDisplay.prototype.scrollPlayerIntoView = function(state) {
  let width = this.dom.clientWidth;
  let height = this.dom.clientHeight;
  let margin = width / 3;

  // The viewport
  let left = this.dom.scrollLeft, right = left + width;
  let top = this.dom.scrollTop, bottom = top + height;

  let player = state.player;
  let center = player.pos.plus(player.size.times(0.5))
                         .times(scale);

  if (center.x < left + margin) {
    this.dom.scrollLeft = center.x - margin;
  } else if (center.x > right - margin) {
    this.dom.scrollLeft = center.x + margin - width;
  }
  if (center.y < top + margin) {
    this.dom.scrollTop = center.y - margin;
  } else if (center.y > bottom - margin) {
    this.dom.scrollTop = center.y + margin - height;
  }
};

Level.prototype.touches = function(pos, size, type) {
  var xStart = Math.floor(pos.x);
  var xEnd = Math.ceil(pos.x + size.x);
  var yStart = Math.floor(pos.y);
  var yEnd = Math.ceil(pos.y + size.y);

  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      let isOutside = x < 0 || x >= this.width ||
                      y < 0 || y >= this.height;
      let here = isOutside ? "wall" : this.rows[y][x];
      if (here == type) return true;
    }
  }
  return false;
};

State.prototype.update = function(time, keys) {
  let actors = this.actors
    .map(actor => actor.update(time, this, keys));
  let newState = new State(this.level, actors, this.status);

  if (newState.status != "playing") return newState;

  let player = newState.player;
  if (this.level.touches(player.pos, player.size, "lava")) {
    return new State(this.level, actors, "lost");
  }

  for (let actor of actors) {
    if (actor != player && overlap(actor, player)) {
      newState = actor.collide(newState);
    }
    else if(actor.type=="monster" && onTop(player, actor)) {
        newState = actor.collide(newState)
    }
  }
  return newState;
};

function overlap(actor1, actor2) {
  return actor1.pos.x + actor1.size.x > actor2.pos.x &&
         actor1.pos.x < actor2.pos.x + actor2.size.x &&
         actor1.pos.y + actor1.size.y > actor2.pos.y &&
         actor1.pos.y < actor2.pos.y + actor2.size.y;
}

function onTop(player, actor2) {
    return player.pos.x + player.size.x > actor2.pos.x &&
           player.pos.x < actor2.pos.x + actor2.size.x &&
           player.pos.y + player.size.y < actor2.pos.y &&
           Math.abs(player.pos.y + player.size.y - actor2.pos.y) < 0.1 &&
           player.speed.y===0;
}

Lava.prototype.collide = function(state) {
  return new State(state.level, state.actors, "lost");
};

let coinCollect = new Howl({
      src: ['./sounds/coin-04.wav']
    })

Coin.prototype.collide = function(state) {
  let filtered = state.actors.filter(a => a != this);
  let status = state.status;
  coinCollect.play();
  if (!filtered.some(a => a.type == "coin")) status = "won";
  return new State(state.level, filtered, status);
};

Lava.prototype.update = function(time, state) {
  let newPos = this.pos.plus(this.speed.times(time));
  if (!state.level.touches(newPos, this.size, "wall")) {
    return new Lava(newPos, this.speed, this.reset);
  } else if (this.reset) {
    return new Lava(this.reset, this.speed, this.reset);
  } else {
    return new Lava(this.pos, this.speed.times(-1));
  }
};

Monster.prototype.collide = function(state) {
    let player = state.player
    //remove monster from list of actors in case the player squised the monster
    let filtered = state.actors.filter(a => a != this);
    if(onTop(player, this)) {
        console.log(player.pos.y + player.size.y - this.pos.y)
        console.log(player.pos.y - (this.pos.y + this.size.y))
        return new State(state.level, filtered, state.status);
    }
    else {
        return new State(state.level, state.actors, "lost");
    }
}

Monster.prototype.update = function(time, state) {
    let newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "wall")) {
        return new Monster(newPos, this.speed);
    }
    else {
        return new Monster(this.pos, this.speed.times(-1));
    }
}

var wobbleSpeed = 8, wobbleDist = 0.07;

Coin.prototype.update = function(time) {
  let wobble = this.wobble + time * wobbleSpeed;
  let wobblePos = Math.sin(wobble) * wobbleDist;
  return new Coin(this.basePos.plus(new Vec(0, wobblePos)),
                  this.basePos, wobble);
};

var playerXSpeed = 7;
var gravity = 30;
var jumpSpeed = 17;
let jumpSound = new Howl({
      src: ['./sounds/jump_07.wav']
    })

Player.prototype.update = function(time, state, keys) {
  let xSpeed = 0;
  if (keys.ArrowLeft) xSpeed -= playerXSpeed;
  if (keys.ArrowRight) xSpeed += playerXSpeed;
  let pos = this.pos;
  let movedX = pos.plus(new Vec(xSpeed * time, 0));
  if (!state.level.touches(movedX, this.size, "wall")) {
    pos = movedX;
  }

  let ySpeed = this.speed.y + time * gravity;
  let movedY = pos.plus(new Vec(0, ySpeed * time));
  let testPlayer = new Player(movedY, this.speed)
  let monsters_list = state.actors.find(a=>a.type==="monster");
  if (!state.level.touches(movedY, this.size, "wall")) {
      if(monsters_list && overlap(testPlayer, monsters_list)) {
          ySpeed = 0
      }
      else {
          pos = movedY;
      }
    }
  else if (keys.ArrowUp && ySpeed > 0) {
    ySpeed = -jumpSpeed;
    jumpSound.play()
  } else {
    ySpeed = 0;
  }
  return new Player(pos, new Vec(xSpeed, ySpeed));
};

function trackKeys(keys, ) {
  let down = Object.create(null);
  function track(event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type == "keydown";
      // console.log(event.key)
      event.preventDefault();
    }
  }

  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);
  return [down, track];


}

// var arrowKeys =
//   trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);
let first_time = true;

function runAnimation(frameFunc) {
  let lastTime = null;
  function frame(time) {
    if (lastTime != null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      if (frameFunc(timeStep) === false) return;
    }

    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

let CSS_COLOR_NAMES = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];

function getRandomColor() {
    ind = Math.floor(Math.random()*CSS_COLOR_NAMES.length)
    return CSS_COLOR_NAMES[ind]
}

function background_shift() {
    let this_color = getRandomColor()
    let table = document.getElementsByTagName("table")[0]
    table.classList.add("active")
    table.style.background = this_color
    console.log(this_color)

    // setTimeout(background_shift, 1000);
}

function changeBackground(timeUntilEnd, everySec=[]) {
    everySec.push(setInterval(background_shift, 1000))
    all_timeouts = all_timeouts.concat(everySec);
    setTimeout(function() {
        everySec.map(a=>clearInterval(a))
        let table = document.getElementsByTagName("table")[0]
        table.classList.remove("active")
        table.style.background = '#34a5fb';
    },
        timeUntilEnd)
}

function fullSongShifts() {
    console.log("shifting started")
    all_timeouts.push(setTimeout(()=>changeBackground(55000), 62000))
    all_timeouts.push(setTimeout(()=>changeBackground(55000), 141000))

    //test values
    // setTimeout(()=>changeBackground(5000), 10000)
    // setTimeout(()=>changeBackground(5000), 25000)
}

let all_timeouts = []
//
let background_music = new Howl({
  src: ['./sounds/dubstep_soundtrack.mp3'],
  // autoplay: true,
  loop: true,
  onplay: function() {fullSongShifts()},
  onload: console.log("loaded"),
  onend: function() {fullSongShifts()}
  // html5: true,
  // volume: 0.5
});


function runLevel(level, Display) {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  let paused = false;
  let last_status = state.status;
  let [arrowKeys, tracker_func] = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);
  function pauseGame(event) {
      if(event.key == "Escape") {
          if(!paused) {
              // pause the game
              state.status = "paused";
              paused = true;
              window.removeEventListener("keydown", tracker_func);
              window.removeEventListener("keyup", tracker_func);
          }
          else {
              state.status = "playing";
              paused = false;
              [arrowKeys, tracker_func] = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);
          }
      }
  }
  //add listener to enable pausing the game
  window.addEventListener("keydown", pauseGame);
  //create function to start music on click
  function startMusic() {
      if(first_time) {
          background_music.play()
          first_time=false
      }
      window.removeEventListener("click", startMusic)
      window.removeEventListener("keydown", startMusic)
  }
  // add listener to start background_music
  // window.addEventListener("click", startMusic)
  // window.addEventListener("keydown", startMusic)

  return new Promise(resolve => {
    runAnimation(time => {
      if(state.status == "paused") {
          return true;
      }
      state = state.update(time, arrowKeys);
      display.syncState(state);
      if (state.status == "playing") {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        window.removeEventListener("keydown", tracker_func);
        window.removeEventListener("keyup", tracker_func);
        window.removeEventListener("keydown", pauseGame);
        display.clear();
        resolve(state.status);
        return false;
      }
    });
  });
}

let winSound = new Howl({
    src: ['sounds/cheer.mp3']
})
async function runGame(plans, Display) {
  let lives = 3;
  // background_music.on('end', fullSongShifts)
  background_music.play();
  // setTimeout(function () {
  //     console.log(everySec)
  //     clearInterval(everySec)}, 15000)//62000+54000
  //then 22 seconds of regular screen
  // then ~55 seconds of shifting again
  for (let level = 0; level < plans.length;) {
    console.log(lives)
    let status = await runLevel(new Level(plans[level]),
                                Display);
    if (status == "won") {
        level++
    }
    else if(status == "lost") {
        lives--
    }
    // if(lives===0) {
    //     break
    //     console.log("You've lost! Game Over!")
    // }
  }
  console.log("You've won!");
  //clear out the current timed functions for the music - refactor into
  //a single function, see if there is a way to do it without global variables
  all_timeouts.map(a=>clearTimeout(a))
  all_timeouts.map(a=>clearInterval(a))
  all_timeouts=[]
  //stop the music, so the first level has the intro music
  background_music.stop();
  winSound.play();
  Swal.fire(
      "Congratulations, <br>You Won!",
      "Play Again?",
      'success'
  ).then((result)=>runGame(plans, Display))
}
