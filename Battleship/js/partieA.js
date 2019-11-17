(function() {
  // Tu peux le remettre normal c juste que si il était pas en commentaire il y avait un erreur eslint
  // let cptNombresBateauxCoules = 0;
  let resultatTirPrecedent = 0;
  let coordonneesTirPrecedent;
  let cptPorteAvionsIA = 0;
  let cptCuirasseIA = 0;
  let cptDestroyerIA = 0;
  let cptTorpilleurIA = 0;
  let cptSousMarinIA = 0;
  let cptGlobalTir = 0;
  let ciblesTouchees = [];
  let gauche = false;
  let droite = false;
  let haut = false;
  let bas = false;
  let lettrePremierMissile = 0;
  let chiffrePremierMissile = 0;

  class IA {
    constructor() {
      this.listeBateaux = this.placerBateaux();
    }
    /**
     * Fonction qui sert à placer les bateaux de l'ordinateur
     * @return {object} Object littéral de bateaux avec leurs coordonnées
     */
    placerBateaux() {
      const coordonneesUtilisees = [];

      const coordonneesPorteAvion = this.creationBateau(4, coordonneesUtilisees);

      const coordonneesCuirasse = this.creationBateau(3, coordonneesUtilisees);

      const coordonneesDestroyer = this.creationBateau(2, coordonneesUtilisees);

      const coordonneesTorpilleur = this.creationBateau(2, coordonneesUtilisees);

      const coordonneesSousMarin = this.creationBateau(1, coordonneesUtilisees);

      return {
        'porte-avions': coordonneesPorteAvion,
        'cuirasse': coordonneesCuirasse,
        'destroyer': coordonneesDestroyer,
        'torpilleur': coordonneesTorpilleur,
        'sous-marin': coordonneesSousMarin,
      };
    };


    creationBateau(nbCoordonnees, coordonneesUtilisees) {
      let coordonneesBateau = [];

      let randomPourChiffre = Math.floor(Math.random() * 10) + 1;
      let randomPourLettre = String.fromCharCode(65+Math.floor(Math.random() * 10));
      let randomPourDirection = Math.floor(Math.random() * 10);

      coordonneesBateau.push(randomPourLettre + '-' + randomPourChiffre);

      if (randomPourDirection == 0) {
        for (let i = 1; i <= nbCoordonnees; ++i) {
          coordonneesBateau.push(randomPourLettre + '-' + (randomPourChiffre + i));
        }
        // SI UN CHIFFRE DÉPASSE 10
        if (randomPourChiffre + 4 > 10) {
          coordonneesBateau = [];
          for (let i = nbCoordonnees; i > 0; i--) {
            coordonneesBateau.push(randomPourLettre + '-' + (randomPourChiffre - i));
          }
          coordonneesBateau.push(randomPourLettre + '-' + randomPourChiffre);
        }
      } else {
        for (let i = 1; i <= nbCoordonnees; ++i) {
          coordonneesBateau.push(String.fromCharCode(randomPourLettre.charCodeAt(0) + i) + '-' + randomPourChiffre);
        }
        // SI UNE LETTRE DÉPASSE LA LETTRE J
        if (randomPourLettre.charCodeAt(0) + 4 > 74) {
          coordonneesBateau = [];
          for (let i = nbCoordonnees; i > 0; i--) {
            coordonneesBateau.push(String.fromCharCode(randomPourLettre.charCodeAt(0) - i) + '-' + randomPourChiffre);
          }
          coordonneesBateau.push(randomPourLettre + '-' + randomPourChiffre);
        }
      }

      for (let i = 0; i < coordonneesBateau.length; i++) {
        if (coordonneesUtilisees.includes(coordonneesBateau[i])) {
          let nouveauBateau = this.creationBateau(nbCoordonnees, coordonneesUtilisees);
          return nouveauBateau;
        }
      }
      coordonneesUtilisees.push.apply(coordonneesUtilisees, coordonneesBateau);
      return coordonneesBateau;
    };

    verificationDirection() {
      if (gauche == false && droite == false && haut == false && bas == false) {
        return true;
      } else if (gauche == true && droite == true && haut == true && bas == true) {
        return true;
      }
      return false;
    }

    lancerMissile() {
      let coordonneesMissile;

      if (resultatTirPrecedent === undefined || resultatTirPrecedent == 0 && this.verificationDirection()) {
        const randomPourChiffre = Math.floor(Math.random() * 10) + 1;
        const randomPourLettre = String.fromCharCode(65+Math.floor(Math.random() * 10));
        coordonneesMissile = randomPourLettre + '-' + randomPourChiffre;
        lettrePremierMissile = randomPourLettre;
        chiffrePremierMissile = randomPourChiffre;
      } else if (resultatTirPrecedent == 1 && gauche == false) {
        coordonneesMissile = coordonneesTirPrecedent[0] + '-' + (coordonneesTirPrecedent[2] - 1);
        console.log(coordonneesMissile);
        gauche = true;
        console.log('ON PASSE DANS GAUCHE');
      } else if (resultatTirPrecedent == 1 && droite == false && haut == false && bas == false) {
        coordonneesMissile = coordonneesTirPrecedent[0] + '-' + (coordonneesTirPrecedent[2] - 1);
        console.log(coordonneesMissile);
        gauche = true;
        console.log('ON PASSE DANS GAUCHE');
      } else if (resultatTirPrecedent == 0 && gauche == true && droite == false) {
        coordonneesMissile = coordonneesTirPrecedent[0] + '-' + (chiffrePremierMissile + 1);
        console.log(coordonneesMissile);
        droite = true;
        console.log('ON PASSE DANS DROITE');
      } else if (resultatTirPrecedent == 1 && haut == false && bas == false) {
        coordonneesMissile = coordonneesTirPrecedent[0] + '-' + (coordonneesTirPrecedent[2] + 1);
        console.log(coordonneesMissile);
        droite = true;
        console.log('ON PASSE DANS DROITE');
      } else if (resultatTirPrecedent == 0 && droite == true) {
        coordonneesMissile = String.fromCharCode(lettrePremierMissile.charCodeAt(0) - 1) + '-' + chiffrePremierMissile;
        console.log(coordonneesMissile);
        haut = true;
        console.log('ON PASSE EN HAUT');
      } else if (resultatTirPrecedent == 1 && bas == false) {
        coordonneesMissile = String.fromCharCode(coordonneesTirPrecedent[0].charCodeAt(0) - 1) + '-' +
          chiffrePremierMissile;
        console.log(coordonneesMissile);
        haut = true;
        console.log('ON PASSE EN HAUT');
      } else if (resultatTirPrecedent == 0 && haut == true) {
        coordonneesMissile = String.fromCharCode(lettrePremierMissile.charCodeAt(0) + 1) + '-' + chiffrePremierMissile;
        console.log(coordonneesMissile);
        bas = true;
        console.log('ON PASSE EN BAS');
      }
      console.log(gauche);
      this.calculResultat(coordonneesMissile);
    };

    /**
     * Fonction qui reçois un résultat et modifie l'interface de jeu
     * @param {Number} resultat Résultat du lancé
     * @return {string}
     */
    resultatLancerMissile(resultat) {
      // TODO Il va rester à aller modifier dans l'interface selon le résultat obtenue
      // La variable test c juste pour me rapeller d'aller modifier ça quand on va être rendu à l'interface
      const test = 0;
      if (resultat == 0) {
        test;
      } else if (resultat == 1) {
        test;
      } else if (resultat == 2) {
        $('#porte-avions-ia').removeClass('btn-info').addClass('btn-danger');
      } else if (resultat == 3) {
        $('#cuirasse-ia').removeClass('btn-info').addClass('btn-danger');
      } else if (resultat == 4) {
        $('#destroyer-ia').removeClass('btn-info').addClass('btn-danger');
      } else if (resultat == 5) {
        $('#torpilleur-ia').removeClass('btn-info').addClass('btn-danger');
      } else if (resultat == 6) {
        $('#sous-marin-ia').removeClass('btn-info').addClass('btn-danger');
      }
      resultatTirPrecedent = resultat;
      console.log(resultat);
      return 'allo';
    }


    calculResultat(coordonneesMissile) {
      console.log(coordonneesMissile);
      coordonneesTirPrecedent = coordonneesMissile;

      if (this.listeBateaux.porteAvions.includes(coordonneesMissile)) {
        ciblesTouchees.push(coordonneesMissile);
        ++cptPorteAvionsIA;
        ++cptGlobalTir;
        console.log('YUP! PORTE-AVION');
      } else if (this.listeBateaux.cuirasse.includes(coordonneesMissile)) {
        ciblesTouchees.push(coordonneesMissile);
        ++cptCuirasseIA;
        ++cptGlobalTir;
        console.log('YUP! CUIRASSE');
      } else if (this.listeBateaux.destroyer.includes(coordonneesMissile)) {
        ciblesTouchees.push(coordonneesMissile);
        ++cptDestroyerIA;
        ++cptGlobalTir;
        console.log('YUP! DESTROYER');
      } else if (this.listeBateaux.torpilleur.includes(coordonneesMissile)) {
        ciblesTouchees.push(coordonneesMissile);
        ++cptTorpilleurIA;
        ++cptGlobalTir;
        console.log('YUP! TORPILLEUR');
      } else if (this.listeBateaux.sousMarin.includes(coordonneesMissile)) {
        ciblesTouchees.push(coordonneesMissile);
        ++cptSousMarinIA;
        ++cptGlobalTir;
        console.log('YUP! SOUS-MARIN');
      } else console.log('Tir raté');

      console.log('PORTE-AVION: ' + cptPorteAvionsIA);
      console.log('CUIRASSE: ' + cptCuirasseIA);
      console.log('DESTROYER: ' + cptDestroyerIA);
      console.log('TORPILLEUR: ' + cptTorpilleurIA);
      console.log('SOUS-MARIN: ' + cptSousMarinIA);

      if (cptPorteAvionsIA >= 5) {
        this.resultatLancerMissile(2);
        console.log('Porte-Avions détruit!');
      } else if (cptCuirasseIA >= 4) {
        this.resultatLancerMissile(3);
        console.log('Cuirasse détruite!');
      } else if (cptDestroyerIA >= 3) {
        this.resultatLancerMissile(4);
        console.log('Destroyer détruit!');
      } else if (cptTorpilleurIA >= 3) {
        this.resultatLancerMissile(5);
        console.log('Torpilleur détruit!');
      } else if (cptSousMarinIA >= 2) {
        this.resultatLancerMissile(5);
        console.log('Torpilleur détruit!');
      } else if (cptGlobalTir == 1) {
        this.resultatLancerMissile(1);
        console.log('TOUCHÉ!');
        cptGlobalTir = 0;
      } else {
        console.log('À l\'eau');
        this.resultatLancerMissile(0);
      }
    }
    // ...
  }

  const monIA = new IA();
  window.IA = monIA; // Laisser cette variable la, c'est de cette façon qu'on a accès au IA dans la partie B.
  console.log(monIA.listeBateaux);
  const monIA2 = new IA();
  console.log(monIA2.listeBateaux);
  $(document).keypress(function(e) {
    if (e.which == 13) {
      monIA.lancerMissile();
      console.log(ciblesTouchees);
    }
  });


  // console.log(test);


  // console.log(resultatTirPrecedent);
  // console.log(coordonneesTirPrecedent[0] + '-' + (coordonneesTirPrecedent[2] - 1));


  // if(monIA.listeBateaux.includes('porte-avions')) {
  //   console.log('C\'est vrai');
  // }

  // ...
}());


// creationBateau(nbCoordonnees, coordonneesUtilisees) {
//   let coordonneesBateau = [];

//   const randomPourChiffre = Math.floor(Math.random() * 10) + 1;
//   const randomPourLettre = String.fromCharCode(65+Math.floor(Math.random() * 10));
//   const randomPourDirection = Math.floor(Math.random() * 10);

//   coordonneesBateau.push(randomPourLettre + '-' + randomPourChiffre);

//   if (randomPourDirection == 0) {
//     for (let i = 1; i <= nbCoordonnees; ++i) {
//       coordonneesBateau.push(randomPourLettre + '-' + (randomPourChiffre + i));
//     }
//     // SI UN CHIFFRE DÉPASSE 10
//     if (randomPourChiffre + 4 > 10) {
//       coordonneesBateau = [];
//       for (let i = nbCoordonnees; i > 0; i--) {
//         coordonneesBateau.push(randomPourLettre + '-' + (randomPourChiffre - i));
//       }
//       coordonneesBateau.push(randomPourLettre + '-' + randomPourChiffre);
//     }
//   } else {
//     for (let i = 1; i <= nbCoordonnees; ++i) {
//       coordonneesBateau.push(String.fromCharCode(randomPourLettre.charCodeAt(0) + i) + '-' + randomPourChiffre);
//     }
//     // SI UNE LETTRE DÉPASSE LA LETTRE J
//     if (randomPourLettre.charCodeAt(0) + 4 > 74) {
//       coordonneesBateau = [];
//       for (let i = nbCoordonnees; i > 0; i--) {
//         coordonneesBateau.push(String.fromCharCode(randomPourLettre.charCodeAt(0) - i) + '-' + randomPourChiffre);
//       }
//       coordonneesBateau.push(randomPourLettre + '-' + randomPourChiffre);
//     }
//   }

//   for (let i = 0; i < coordonneesBateau.length; i++) {
//     if (coordonneesUtilisees.includes(coordonneesBateau[i])) {
//       const nouveauBateau = this.creationBateau(nbCoordonnees, coordonneesUtilisees);
//       return nouveauBateau;
//     }
//   }
//   // coordonneesUtilisees.push.apply(coordonneesUtilisees, coordonneesBateau);
//   coordonneesUtilisees.push(...coordonneesUtilisees, coordonneesBateau);
//   return coordonneesBateau;
// };
