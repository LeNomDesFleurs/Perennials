
let axiom = "F";
let sentence = axiom;
let rules = [];

// Ajoutez vos règles de production ici
rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
};

let len = 100; // Longueur initiale du segment
let angle;

function generate() {
  frameRate(1);
  len *= 0.5; // Réduire la longueur du segment à chaque itération
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  createP(sentence); // Afficher la chaîne de caractères correspondante
  turtle();
}

function turtle() {
  background(51);
  resetMatrix();
  translate(width / 2, height);
  stroke(255, 100);
  for (let i = 0; i < sentence.length; i++) {
    wait(100);
    let current = sentence.charAt(i);
    if (current == "F") {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle);
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }
}

function setup() {
  createCanvas(800, 600);
  angle = radians(25); // Angle de rotation des branches
  background(51);
  createP(axiom); // Afficher l'axiome initial
  turtle();
  
  let button = createButton("Générer");
  button.mousePressed(generate);
}



