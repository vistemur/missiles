class rocket {
  constructor() {
    this.x = 0
    this.y = 0
    this.size = 1;
    this.speed = random(50, 300) / 50;
    this.damge = 1;
  }
}

var a = 0
var b = 0
var hp = 3
var rocketsAmount = 10
var rockets = []
var firstEntry = true
var xar = []
var yar = []
var level = 1
var victory = false

function setup() {
  for(a = 0; a < displayWidth / 2; a++) {
    xar.push(a)
  }
  for(a = displayWidth / 2 + 140; a < displayWidth; a++) {
    xar.push(a)
  }
  for(a = 0; a < displayHeight / 2 + 50; a++) {
    yar.push(a)
  }
  for(a = displayHeight / 2 + 125; a < displayHeight; a++) {
    yar.push(a)
  }
  
  createCanvas(displayWidth, displayHeight)
  for(a = 0; a < rocketsAmount; a += 1) {
    rockets.push(new rocket());
    rockets[a].x = random(xar)
    rockets[a].y = random(yar)
  }
}

function draw() {
  background(255)
  if(firstEntry) {
    textSize(50)
    fill('red')
    rect(displayWidth / 2, displayHeight / 2 + 50, 140, 75)
    fill('black')
    text('  play ', displayWidth / 2, displayHeight / 2 + 100)
  } else {
    textSize(20)
    fill('black')
    text('level ' + level, displayWidth / 2, 30)
    if(hp == 0) {
    textSize(50)
    text('you lost', displayWidth / 2 - 20, displayHeight / 2)
    rockets = []
    replayButton()
  } else {
    if(rockets.length == 0) {
      textSize(50)
      text('VICTORY', displayWidth / 2 - 40, displayHeight / 2)
      victory = true
      continueButton()
    } else {
      textSize(20)
      fill('black')
      text('hp = ' + hp, 30, 30)
      fill(random(255), random(255), random(255))
      rect(mouseX - 10, mouseY - 10, 20, 20)
  fill('red')
  for(a = 0; a < rockets.length; a += 1) {
    if(mouseX > rockets[a].x) {
      rockets[a].x += rockets[a].speed
    } else {
      rockets[a].x -= rockets[a].speed
    }
    if(mouseY > rockets[a].y) {
       rockets[a].y += rockets[a].speed
    } else {
      rockets[a].y -= rockets[a].speed
    }
    circle(rockets[a].x, rockets[a].y, rockets[a].size * 50)
    if(int(dist(rockets[a].x, rockets[a].y, mouseX, mouseY)) < 25) {
      rockets.splice(a, 1)
      hp -= 1
    } else {
      for(b = 0; b < rockets.length; b += 1) {
      if(b != a) {
         if(int(dist(rockets[a].x, rockets[a].y, rockets[b].x, rockets[b].y)) < 50) {
           if(a > b) {
              rockets.splice(a, 1)
              rockets.splice(b, 1)
           } else {
              rockets.splice(b, 1)
              rockets.splice(a, 1)
           }
           break
        }
      }
    }
    }
  }
    }
  }
  }
}
  
function mousePressed() {
  if(((hp == 0) || (rockets.length == 0)) && (mouseX < displayWidth / 2 + 140) && (mouseX > displayWidth / 2) && (mouseY > displayHeight / 2 + 50) && (mouseY < displayHeight / 2 + 125)) {
    if(victory) {
      level += 1
      rocketsAmount += 6
      victory = false
    }
    hp = 3
    for(a = 0; a < rocketsAmount; a += 1) {
      rockets.push(new rocket());
      rockets[a].x = random(xar)
      rockets[a].y = random(yar)
    }
    rect(0,0,500,500)
  } else {
   if((firstEntry) && (mouseX < displayWidth / 2 + 140) && (mouseX > displayWidth / 2) && (mouseY > displayHeight / 2 + 50) && (mouseY < displayHeight / 2 + 125)) {
     firstEntry = false
   }
  }
}
  
function continueButton() {
  fill('red')
  rect(displayWidth / 2, displayHeight / 2 + 50, 140, 75)
  fill('black')
  textSize(35)
  text('continue', displayWidth / 2 + 2, displayHeight / 2 + 100)
}
  
function replayButton() {
  fill('red')
  rect(displayWidth / 2, displayHeight / 2 + 50, 140, 75)
  fill('black')
  text('replay', displayWidth / 2, displayHeight / 2 + 100)
}