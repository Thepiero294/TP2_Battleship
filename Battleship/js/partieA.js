(function() {
  // Tu peux le remettre normal c juste que si il était pas en commentaire il y avait un erreur eslint
  // let cptNombresBateauxCoules = 0;
  let resultatTirPrecedent;

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
        'porteAvions': coordonneesPorteAvion,
        'cuirasse': coordonneesCuirasse,
        'destroyer': coordonneesDestroyer,
        'torpilleur': coordonneesTorpilleur,
        'sousMarin': coordonneesSousMarin,
      };
    };

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

    creationBateau(nbCoordonnees, coordonneesUtilisees) {
      var coordonneesBateau = [];

      var randomPourChiffre = Math.floor(Math.random() * 10) + 1;
      var randomPourLettre = String.fromCharCode(65+Math.floor(Math.random() * 10));
      var randomPourDirection = Math.floor(Math.random() * 10);

      coordonneesBateau.push(randomPourLettre + "-" + randomPourChiffre);

      if(randomPourDirection == 0) {
        for(var i = 1; i <= nbCoordonnees; ++i) {
          coordonneesBateau.push(randomPourLettre + '-' + (randomPourChiffre + i));
        } 
        // SI UN CHIFFRE DÉPASSE 10
        if(randomPourChiffre + 4 > 10) {
          coordonneesBateau = [];
          for(var i = nbCoordonnees; i > 0; i--) {
            coordonneesBateau.push(randomPourLettre + '-' + (randomPourChiffre - i));
          }
          coordonneesBateau.push(randomPourLettre + "-" + randomPourChiffre);
        }
      }
      else {
        for(var i = 1; i <= nbCoordonnees; ++i) {
          coordonneesBateau.push(String.fromCharCode(randomPourLettre.charCodeAt(0) + i) + '-' + randomPourChiffre);
        }
        // SI UNE LETTRE DÉPASSE LA LETTRE J
        if(randomPourLettre.charCodeAt(0) + 4 > 74) {
          coordonneesBateau = [];
          for(var i = nbCoordonnees; i > 0; i--) {
            coordonneesBateau.push(String.fromCharCode(randomPourLettre.charCodeAt(0) - i) + '-' + randomPourChiffre);
          }
          coordonneesBateau.push(randomPourLettre + "-" + randomPourChiffre); 
        }
      }

      for(i = 0; i < coordonneesBateau.length; i++) {
        if(coordonneesUtilisees.includes(coordonneesBateau[i])) {
          var nouveauBateau = this.creationBateau(nbCoordonnees, coordonneesUtilisees);
          return nouveauBateau;
        }
      }
      coordonneesUtilisees.push.apply(coordonneesUtilisees, coordonneesBateau);
      return coordonneesBateau;
    };

    lancerMissile() {
      let coordonneesMissile;
      if (resultatTirPrecedent === undefined || resultatTirPrecedent == 0) {
        const randomPourChiffre = Math.floor(Math.random() * 10) + 1;
        const randomPourLettre = String.fromCharCode(65+Math.floor(Math.random() * 10));
        coordonneesMissile = randomPourLettre + '-' + randomPourChiffre;
      }
      if (resultatTirPrecedent == 1) {

      }
      // valeurDernierMissile = coordonneesMissile;
      return coordonneesMissile;
    };

    /**
     * Fonction qui reçois un résultat et modifie l'interface de jeu
     * @param {Number} resultat Résultat du lancé
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
      return 'allo';
    }

    // ...
  }

  var ciblesTouchees= [];
  var cptPorteAvionsIA = 0;
  var cptCuirasseIA = 0;
  var cptDestroyerIA = 0;
  var cptTorpilleurIA = 0;
  var cptSousMarinIA = 0;
  var cptGlobalTir = 0;
  const monIA = new IA();
  window.IA = monIA;
  console.log(monIA.listeBateaux);


  const monIA2 = new IA();
  console.log(monIA2.listeBateaux);

  var test = monIA.lancerMissile();
  console.log(test);

  if(monIA2.listeBateaux.porteAvions.includes(test)) {
    ciblesTouchees.push(test); 
    ++cptPorteAvionsIA;
    ++cptGlobalTir;
  }
  else if(monIA2.listeBateaux.cuirasse.includes(test)) {
    ciblesTouchees.push(test); 
    ++cptCuirasseIA;
    ++cptGlobalTir;
  }
  else if(monIA2.listeBateaux.destroyer.includes(test)) {
    ciblesTouchees.push(test); 
    ++cptDestroyerIA;
    ++cptGlobalTir;
  }
  else if(monIA2.listeBateaux.torpilleur.includes(test)) {
    ciblesTouchees.push(test); 
    ++cptTorpilleurIA;
    ++cptGlobalTir;
  }
  else if(monIA2.listeBateaux.sousMarin.includes(test)) {
    ciblesTouchees.push(test); 
    ++cptSousMarinIA;
    ++cptGlobalTir;
  }
  else console.log('Tir raté');

  if(cptPorteAvionsIA == 1) {
    monIA2.resultatLancerMissile(2);
    console.log('Porte-Avions détruit!')
  }
  else if(cptCuirasseIA == 1) {
    monIA2.resultatLancerMissile(3);
    console.log('Cuirasse détruite!');
  }
  else if(cptDestroyerIA == 1) {
    monIA2.resultatLancerMissile(4);
    console.log('Destroyer détruit!');
  }
  else if(cptTorpilleurIA == 1) {
    monIA2.resultatLancerMissile(5);
    console.log('Torpilleur détruit!');
  }
  else if(cptGlobalTir == 1) {
    monIA2.resultatLancerMissile(1);
    console.log('Vous avez touché quelque chose!');
  }
  else {
    monIA2.resultatLancerMissile(0);
  }

  
  // if(monIA.listeBateaux.includes('porte-avions')) {
  //   console.log('C\'est vrai');
  // }

  // ...
}());
