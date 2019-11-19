/* eslint-disable prefer-spread */
(function() {
  // Tu peux le remettre normal c juste que si il était pas en commentaire il y avait un erreur eslint
  // let cptNombresBateauxCoules = 0;
  let resultatTirPrecedent = 0;
  let coordonneesPremierTirRéussi;
  let coordonneesDernierMissile;
  let coordonneesMissile = [];
  const ciblesTouchees = [];
  const endroitsCiblees = [];
  let gauche = false;
  let droite = false;
  let haut = false;
  let bas = false;
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

    /**
     * Fonction qui sert à créer les bateaux pour l'utilisateur du qu'on a pas eu le temps
     * de faire le placement bateaux
     * @param {Number} nbCoordonnees Nombre de coordonnées utilisée
     * @param {string} coordonneesUtilisees Coordonnées
     * @return {string} Retourne une coordonnée
     */
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

    /**
     * Vérifie la direction du tir
     * @return {boolean} Retourne vrai ou faux
     */
    verificationDirection() {
      if (gauche == false && droite == false && haut == false && bas == false) {
        return true;
      } else if (gauche && droite && haut && bas) {
        return true;
      }
      return false;
    }

    /**
     * Fonction qui vérifie si la coordonnée du tir est valide ou n'a pas déjà été effectué
     * @return {string} Retourne la coordonnée si elle est valide
     */
    lancerMissile() {
      if (resultatTirPrecedent == 1) {
        coordonneesMissile = coordonneesDernierMissile;
      }
      if (resultatTirPrecedent == 0) {
        coordonneesMissile = coordonneesPremierTirRéussi;
      }

      // RANDOM
      if (resultatTirPrecedent === undefined || (resultatTirPrecedent == 0 && this.verificationDirection()) ||
        (resultatTirPrecedent != 0 && resultatTirPrecedent != 1)) {
        coordonneesMissile = this.obtenirNouveauRandomNonTouché();
      } else if ((resultatTirPrecedent == 1 && droite == false && haut == false && bas == false)) {
        // GAUCHE SI RÉUSSI
        const coordonneeChiffre = parseInt(coordonneesMissile[1]) + 1;
        coordonneesMissile = coordonneesMissile[0] + '-' + (parseInt(coordonneesMissile[1]) - 1);
        if (parseInt(coordonneesMissile[2]) == 0 || endroitsCiblees.includes(coordonneesMissile[0] +
          '-' + coordonneeChiffre)) {
          coordonneesMissile = this.obtenirNouveauRandomNonTouché();
        }
        gauche = true;
      } else if ((resultatTirPrecedent == 0 && gauche == true && droite == false) ||
        (resultatTirPrecedent == 1 && haut == false && bas == false)) {
        // DROITE SI RÉUSSI
        const coordonneeChiffre = parseInt(coordonneesMissile[1]) + 1;
        coordonneesMissile = coordonneesMissile[0] + '-' + coordonneeChiffre;
        if ((coordonneeChiffre > 10) || (endroitsCiblees.includes(coordonneesMissile[0] + '-' + coordonneeChiffre))) {
          coordonneesMissile = this.obtenirNouveauRandomNonTouché();
        }
        droite = true;
      } else if ((resultatTirPrecedent == 0 && droite == true && haut == false) ||
        (resultatTirPrecedent == 1 && bas == false)) {
        // HAUT SI RÉUSSI
        coordonneesMissile = (String.fromCharCode(coordonneesMissile[0].charCodeAt(0) - 1)) +
          '-' + coordonneesMissile[1];
        if (coordonneesMissile[0] == '@' || endroitsCiblees.includes(coordonneesMissile[0] + '-' +
          coordonneesMissile[2])) {
          coordonneesMissile = this.obtenirNouveauRandomNonTouché();
        }
        haut = true;
      } else {
        // BAS SI RÉUSSI
        coordonneesMissile = (String.fromCharCode(coordonneesMissile[0].charCodeAt(0) + 1)) + '-' +
          coordonneesMissile[1];
        if (coordonneesMissile[0] == 'K' || endroitsCiblees.includes(coordonneesMissile[0] + '-' +
          coordonneesMissile[2])) {
          coordonneesMissile = this.obtenirNouveauRandomNonTouché();
        }
      }

      // TODO Changer ça pour un return
      if (coordonneesMissile[3] != undefined && coordonneesMissile[3] == 0) {
        endroitsCiblees.push(coordonneesMissile[0] + '-' + coordonneesMissile[2] + coordonneesMissile[3]);
        return coordonneesMissile;
      } else {
        endroitsCiblees.push(coordonneesMissile[0] + '-' + coordonneesMissile[2]);
        return coordonneesMissile;
      }
    };

    /**
     * Renvoie une coordonnée random si appelé
     * @return {string} Retourne une coordonnée
     */
    obtenirNouveauRandomNonTouché() {
      for (;;) {
        let nouvelleCoordonneesMissile = [];
        const randomPourChiffre = Math.floor(Math.random() * 10) + 1;
        const randomPourLettre = String.fromCharCode(65+Math.floor(Math.random() * 10));
        nouvelleCoordonneesMissile = randomPourLettre + '-' + randomPourChiffre;
        if (!endroitsCiblees.includes(nouvelleCoordonneesMissile)) {
          return nouvelleCoordonneesMissile;
        }
      }
    }

    /**
     * Fonction qui reçois un résultat et modifie l'interface de jeu
     * @param {Number} resultat Résultat du lancé
     */
    resultatLancerMissile(resultat) {
      if (resultat == 0) {
        $('.table-def').find('#' + endroitsCiblees[endroitsCiblees.length-1]).removeClass('eau').addClass('manquer');
      } else if (resultat == 1) {
        $('.table-def').find('#' + endroitsCiblees[endroitsCiblees.length-1]).removeClass('eau').addClass('touche');
        coordonneesDernierMissile = coordonneesMissile.split('-');
        if (!tirPrecedentReussi) {
          coordonneesPremierTirRéussi = coordonneesMissile.split('-');
          tirPrecedentReussi = true;
        }
      } else if (resultat == 2) {
        $('#porte-avions-joueur').removeClass('btn-info').addClass('btn-danger').prop('disabled', true);
        $('.table-def').find('#' + endroitsCiblees[endroitsCiblees.length-1]).removeClass('eau').addClass('touche');
      } else if (resultat == 3) {
        $('#cuirasse-joueur').removeClass('btn-info').addClass('btn-danger').prop('disabled', true);
        $('.table-def').find('#' + endroitsCiblees[endroitsCiblees.length-1]).removeClass('eau').addClass('touche');
      } else if (resultat == 4) {
        $('#destroyer-joueur').removeClass('btn-info').addClass('btn-danger').prop('disabled', true);
        $('.table-def').find('#' + endroitsCiblees[endroitsCiblees.length-1]).removeClass('eau').addClass('touche');
      } else if (resultat == 5) {
        $('#torpilleur-joueur').removeClass('btn-info').addClass('btn-danger').prop('disabled', true);
        $('.table-def').find('#' + endroitsCiblees[endroitsCiblees.length-1]).removeClass('eau').addClass('touche');
      } else if (resultat == 6) {
        $('#sous-marin-joueur').removeClass('btn-info').addClass('btn-danger').prop('disabled', true);
        $('.table-def').find('#' + endroitsCiblees[endroitsCiblees.length-1]).removeClass('eau').addClass('touche');
      }
      resultatTirPrecedent = resultat;
    }

    /**
     * Calcule le nombre de cible touchées
     * @param {*} coordonneesMissile Coordonnée touché
     */
    calculCompteur(coordonneesMissile) {
      ciblesTouchees.push(coordonneesMissile);
    }

    /**
     * Sert à réinitialiser les directions
     */
    remettreDirectionsAFalse() {
      gauche = false, droite = false, haut = false, bas = false;
    }

    /**
     * Fonction qui sert pour recommencer un partie
     * @return {object} Retourne un nouvelle instance de IA
     */
    recommencerPartie() {
      const monIA = new IA();
      return window.IA = monIA;
    }
  }

  const monIA = new IA();
  window.IA = monIA; // Laisser cette variable la, c'est de cette façon qu'on a accès au IA dans la partie B.
  $(document).keypress(function(e) {
    if (e.which == 13) {
      monIA.lancerMissile();
    }
  });
}());
