var EMOJIS = ["✊", "✋", "✌️"];
var NOMS = ["La pierre", "La feuille", "Les ciseaux"];
var VERBES = ["écrase", "recouvre", "coupent"];
var GAGNE = [2, 0, 1];

var scoreToi = 0;
var scoreEgalite = 0;
var scoreOrdi = 0;
var manche = 0;
var serie = 0;

function afficherMain(cote, indice, texte) {
  var main = document.getElementById("main" + cote);
  var nom = document.getElementById("nom" + cote);
  if (indice >= 0) {
    main.innerHTML = EMOJIS[indice];
    main.className = "emoji-main";
    nom.innerHTML = NOMS[indice];
    nom.className = "nom-main connu";
  } else {
    main.innerHTML = "?";
    main.className = "emoji-main inconnu";
    nom.innerHTML = texte;
    nom.className = "nom-main";
  }
}

function afficherScores() {
  document.getElementById("scoreToi").innerHTML = scoreToi;
  document.getElementById("scoreEgalite").innerHTML = scoreEgalite;
  document.getElementById("scoreOrdi").innerHTML = scoreOrdi;
  document.getElementById("numeroSerie").innerHTML = serie;
  if (serie >= 2) {
    document.getElementById("serie").style.display = "inline-block";
  } else {
    document.getElementById("serie").style.display = "none";
  }
}

function afficherResultat(etat, titre, sousTitre) {
  document.getElementById("resultat").className = "resultat " + etat;
  document.getElementById("titreResultat").innerHTML = titre;
  document.getElementById("sousResultat").innerHTML = sousTitre;
  afficherScores();
}

function jouer(coupToi) {
  manche++;
  document.getElementById("numeroManche").innerHTML = manche;
  afficherMain("Toi", coupToi, "En attente…");

  var coupOrdi = parseInt(Math.random() * 3);
  afficherMain("Ordi", coupOrdi, "En attente…");

  if (coupToi === coupOrdi) {
    scoreEgalite++;
    serie = 0;
    afficherResultat("egalite", "Égalité !", "Vous avez tous les deux choisi " + NOMS[coupToi].toLowerCase() + ".");
  } else if (GAGNE[coupToi] === coupOrdi) {
    scoreToi++;
    serie++;
    afficherResultat("gagne", "Tu gagnes !", NOMS[coupToi] + " " + VERBES[coupToi] + " " + NOMS[coupOrdi].toLowerCase() + ".");
  } else {
    scoreOrdi++;
    serie = 0;
    afficherResultat("perdu", "L'ordinateur gagne !", NOMS[coupOrdi] + " " + VERBES[coupOrdi] + " " + NOMS[coupToi].toLowerCase() + ".");
  }
}

function reinitialiser() {
  scoreToi = 0;
  scoreEgalite = 0;
  scoreOrdi = 0;
  serie = 0;
  manche = 0;
  afficherMain("Toi", -1, "En attente…");
  afficherMain("Ordi", -1, "En attente…");
  document.getElementById("numeroManche").innerHTML = "—";
  document.getElementById("resultat").className = "resultat";
  document.getElementById("titreResultat").innerHTML = "À toi de jouer";
  document.getElementById("sousResultat").innerHTML = "La pierre écrase les ciseaux, les ciseaux coupent la feuille, la feuille recouvre la pierre.";
  afficherScores();
}

function changerTheme() {
  var bouton = document.getElementById("boutonTheme");
  if (document.body.className === "clair") {
    document.body.className = "";
    bouton.innerHTML = "🌙 Sombre";
  } else {
    document.body.className = "clair";
    bouton.innerHTML = "☀️ Clair";
  }
}

document.getElementById("pierre").onclick = function () { jouer(0); };
document.getElementById("feuille").onclick = function () { jouer(1); };
document.getElementById("ciseaux").onclick = function () { jouer(2); };
document.getElementById("boutonTheme").onclick = changerTheme;
document.getElementById("boutonReset").onclick = reinitialiser;

reinitialiser();
