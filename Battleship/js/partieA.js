(function() {
  // Tu peux le remettre normal c juste que si il était pas en commentaire il y avait un erreur eslint
  // let cptNombresBateauxCoules = 0;
  let resultatTirPrecedent = 0;
  let coordonneesPremierTirRéussi;
  let coordonneesDernierMissile;
  let cptPorteAvionsIA = 0;
  let cptCuirasseIA = 0;
  let cptDestroyerIA = 0;
  let cptTorpilleurIA = 0;
  let cptSousMarinIA = 0;
  let cptGlobalTir = 0;
  let ciblesTouchees = [];
  let endroitsCiblees = [];
  let gauche = false;
  let droite = false;
  let haut = false;
  let bas = false;
  let lettrePremierMissile = 0;
  let chiffrePremierMissile = 0;
  let porteAvionsCouler = false;
  let cuirasseCouler = false;
  let destroyerCouler = false;
  let torpilleurCouler = false;
  let sousMarinCouler = false;
  let tirPrecedentReussi = false;

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

      const randomPourChiffre = Math.floor(Math.random() * 10) + 1;
      const randomPourLettre = String.fromCharCode(65+Math.floor(Math.random() * 10));
      const randomPourDirection = Math.floor(Math.random() * 10);

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
          const nouveauBateau = this.creationBateau(nbCoordonnees, coordonneesUtilisees);
          return nouveauBateau;
        }
      }
      coordonneesUtilisees.push.apply(coordonneesUtilisees, coordonneesBateau);
      return coordonneesBateau;
    };

    verificationDirection() {
      if (gauche == false && droite == false && haut == false && bas == false) {
        return true;
      } else if (gauche && droite && haut && bas) {
        return true;
      }
      return false;
    }

    lancerMissile() {
      let coordonneesMissile
      if(resultatTirPrecedent == 1) {
        coordonneesMissile = coordonneesDernierMissile;
      }
      if(resultatTirPrecedent == 0) {
        coordonneesMissile = coordonneesPremierTirRéussi;
      }

      //RANDOM
      if (resultatTirPrecedent === undefined || (resultatTirPrecedent == 0 && this.verificationDirection()) 
        || (resultatTirPrecedent != 0 && resultatTirPrecedent != 1)) {

        coordonneesMissile = this.obtenirNouveauRandomNonTouché();
        console.log(coordonneesMissile);
        
      } else if ((resultatTirPrecedent == 1 && droite == false && haut == false && bas == false)) {
        //GAUCHE SI RÉUSSI
        var coordonneeChiffre = parseInt(coordonneesMissile[1]) + 1;
        coordonneesMissile = coordonneesMissile[0] + '-' + (parseInt(coordonneesMissile[1]) - 1);
          if (parseInt(coordonneesMissile[2]) == 0 || endroitsCiblees.includes(coordonneesMissile[0] + '-' +  coordonneeChiffre)) {
            coordonneesMissile = this.obtenirNouveauRandomNonTouché();
          }
        console.log(coordonneesMissile);
        gauche = true;
      } else if ((resultatTirPrecedent == 0 && gauche == true && droite == false) || (resultatTirPrecedent == 1 && haut == false && bas == false)) {
        //DROITE SI RÉUSSI  
        var coordonneeChiffre = parseInt(coordonneesMissile[1]) + 1;
        coordonneesMissile = coordonneesMissile[0] + '-' + coordonneeChiffre;
        if ((coordonneeChiffre > 10) || (endroitsCiblees.includes(coordonneesMissile[0] + '-' +  coordonneeChiffre))) {
            coordonneesMissile = this.obtenirNouveauRandomNonTouché();   
          }
        console.log(coordonneesMissile);
        droite = true;
      } else if ((resultatTirPrecedent == 0 && droite == true && haut == false) || (resultatTirPrecedent == 1 && bas == false)) {
        //HAUT SI RÉUSSI
        coordonneesMissile = (String.fromCharCode(coordonneesMissile[0].charCodeAt(0) - 1)) + '-' + coordonneesMissile[1];
          if (coordonneesMissile[0] == '@' || endroitsCiblees.includes(coordonneesMissile[0] + '-' +  coordonneesMissile[2])) {
            coordonneesMissile = this.obtenirNouveauRandomNonTouché();         
          }
        console.log(coordonneesMissile);
        haut = true;
      } else {
        //BAS SI RÉUSSI
        coordonneesMissile = (String.fromCharCode(coordonneesMissile[0].charCodeAt(0) + 1)) + '-' + coordonneesMissile[1];
          if (coordonneesMissile[0] == 'K' || endroitsCiblees.includes(coordonneesMissile[0] + '-' + coordonneesMissile[2])) {
            coordonneesMissile = this.obtenirNouveauRandomNonTouché(); 
          }
        console.log(coordonneesMissile);
      }

      if (coordonneesMissile[3] != undefined && coordonneesMissile[3] == 0) {
        this.calculResultat(coordonneesMissile[0] + '-' + coordonneesMissile[2] + coordonneesMissile[3]);
      }
      else {
        this.calculResultat(coordonneesMissile[0] + '-' + coordonneesMissile[2]);
      }
    };

    obtenirNouveauRandomNonTouché() {
      for (;;) {
        let nouvelleCoordonneesMissile = [];
        const randomPourChiffre = Math.floor(Math.random() * 10) + 1;
        const randomPourLettre = String.fromCharCode(65+Math.floor(Math.random() * 10));
        nouvelleCoordonneesMissile = randomPourLettre + '-' + randomPourChiffre;
        if(!endroitsCiblees.includes(nouvelleCoordonneesMissile)) {
          return nouvelleCoordonneesMissile;
        }
      }
      
    }

    /**
     * Fonction qui reçois un résultat et modifie l'interface de jeu
     * @param {Number} resultat Résultat du lancé
     * @return {string}
     */
    resultatLancerMissile(resultat) {
      // TODO Il va rester à aller modifier dans l'interface selon le résultat obtenue
      // La variable test c juste pour me rapeller d'aller modifier ça quand on va être rendu à l'interface
      // L'IA DOIT PAS ÊTRE INDÉPENDANT DE LA PARTIE B?
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
      console.log(endroitsCiblees);


      endroitsCiblees.push(coordonneesMissile);

      if (this.listeBateaux['porte-avions'].includes(coordonneesMissile)) {
        this.calculCompteur(coordonneesMissile, 'YUP! PORTE-AVION');
        ++cptPorteAvionsIA;
        ++cptGlobalTir;
      } else if (this.listeBateaux['cuirasse'].includes(coordonneesMissile)) {
        this.calculCompteur(coordonneesMissile, 'YUP! CUIRASSE');
        ++cptCuirasseIA;
        ++cptGlobalTir;
      } else if (this.listeBateaux['destroyer'].includes(coordonneesMissile)) {
        this.calculCompteur(coordonneesMissile, 'YUP! DESTROYER');
        ++cptDestroyerIA;
        ++cptGlobalTir;
      } else if (this.listeBateaux['torpilleur'].includes(coordonneesMissile)) {
        this.calculCompteur(coordonneesMissile, 'YUP! TORPILLEUR');
        ++cptTorpilleurIA;
        ++cptGlobalTir;
      } else if (this.listeBateaux['sous-marin'].includes(coordonneesMissile)) {
        this.calculCompteur(coordonneesMissile, 'YUP! SOUS-MARIN');
        ++cptSousMarinIA;
        ++cptGlobalTir;
      } else console.log('Tir raté');

      console.log('PORTE-AVION: ' + cptPorteAvionsIA);
      console.log('CUIRASSE: ' + cptCuirasseIA);
      console.log('DESTROYER: ' + cptDestroyerIA);
      console.log('TORPILLEUR: ' + cptTorpilleurIA);
      console.log('SOUS-MARIN: ' + cptSousMarinIA);

      if (cptPorteAvionsIA >= 5 && porteAvionsCouler == false) {
        this.resultatLancerMissile(2);
        console.log('Porte-Avions détruit!');
        porteAvionsCouler = true;
        this.remettreDirectionsAFalse();
        tirPrecedentReussi = false;
      } else if (cptCuirasseIA >= 4 && cuirasseCouler == false) {
        this.resultatLancerMissile(3);
        console.log('Cuirasse détruite!');
        cuirasseCouler = true;
        this.remettreDirectionsAFalse();
        tirPrecedentReussi = false;
      } else if (cptDestroyerIA >= 3 && destroyerCouler == false) {
        this.resultatLancerMissile(4);
        console.log('Destroyer détruit!');
        destroyerCouler = true;
        this.remettreDirectionsAFalse();
        tirPrecedentReussi = false;
      } else if (cptTorpilleurIA >= 3 && torpilleurCouler == false) {
        this.resultatLancerMissile(5);
        console.log('Torpilleur détruit!');
        torpilleurCouler = true;
        this.remettreDirectionsAFalse();
        tirPrecedentReussi = false;
      } else if (cptSousMarinIA >= 2 && sousMarinCouler == false) {
        this.resultatLancerMissile(6);
        console.log('Sous-Marin détruit!');
        sousMarinCouler = true;
        this.remettreDirectionsAFalse();
        tirPrecedentReussi = false;
      } else if (cptGlobalTir == 1) {
        this.resultatLancerMissile(1);
        coordonneesDernierMissile = coordonneesMissile.split('-');
        if(!tirPrecedentReussi) {
          coordonneesPremierTirRéussi = coordonneesMissile.split('-');
          tirPrecedentReussi = true;
        }
        console.log('TOUCHÉ!');
      } else {
        console.log('À l\'eau');
        this.resultatLancerMissile(0);
        tirPrecedentReussi = false;
      }
      cptGlobalTir = 0;
    }

    calculCompteur(coordonneesMissile, message) {
      ciblesTouchees.push(coordonneesMissile);
      console.log(message);
    }

    remettreDirectionsAFalse() {
      gauche = false, droite = false, haut = false, bas = false;
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
    }
  });
}());
