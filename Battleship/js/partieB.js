/* eslint-disable prefer-spread */
/* eslint-disable no-invalid-this */
(function() {
  // Joueurs de la partie
  const joueursPartie =
  {
    joueur: '',
    ordinateur: '',
  };

  // Compteur pour nombre de coup touché sur les bateaux du joueurs
  let cptPorteAvionsIA = 0;
  let cptCuirasseIA = 0;
  let cptDestroyerIA = 0;
  let cptTorpilleurIA = 0;
  let cptSousMarinIA = 0;
  let cptGlobalTir = 0;

  // Contient si les bateaux sont coulés ou non
  let porteAvionsCouler = false;
  let cuirasseCouler = false;
  let destroyerCouler = false;
  let torpilleurCouler = false;
  let sousMarinCouler = false;

  // Compteur pour nombre de coup touché sur les bateaux de l'ordinateur
  let nbCoupPorteAvionIA = 0;
  let nbCoupCuirasseIA = 0;
  let nbCoupDestroyerIA = 0;
  let nbCoupTorpilleurIA = 0;
  let nbCoupSousMarinIA = 0;

  // Liste des tire effectuer par le joueur
  let coordonneesCoupTirer = [];

  // Contient le joueur gagnant
  let joueurGagnant = '';

  // Contient le dernier tir effectué
  let dernierTir = '';

  // Contient la coordonnée du tir pour L'IA
  let coords = '';

  // Vérifie si la partie est commencée ou non
  const partieCommencer = true;

  /**
   * Fonction qui assigne des couleurs au bateaux dans l'interface.
   */
  function couleurCaseBateaux() {
    for (let i = 0; i < 5; i++) {
      $('.table-def').find('#' + joueursPartie.joueur.listeBateaux['porte-avions'][i]).addClass('bateau');
    }
    for (let i = 0; i < 4; i++) {
      $('.table-def').find('#' + joueursPartie.joueur.listeBateaux['cuirasse'][i]).addClass('bateau');
    }
    for (let i = 0; i < 3; i++) {
      $('.table-def').find('#' + joueursPartie.joueur.listeBateaux['destroyer'][i]).addClass('bateau');
    }
    for (let i = 0; i < 3; i++) {
      $('.table-def').find('#' + joueursPartie.joueur.listeBateaux['torpilleur'][i]).addClass('bateau');
    }
    for (let i = 0; i < 2; i++) {
      $('.table-def').find('#' + joueursPartie.joueur.listeBateaux['sous-marin'][i]).addClass('bateau');
    }
  }

  class Joueur {
    constructor() {
      this.listeBateaux = this.placerBateaux();
    }

    /**
     * Fonction qui sert à placer les bateaux du joueur
     * @return {Array} return la liste des bateaux avec leur positions
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
    }

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
     * Fonction qui vérifie si la coordonnée du tir est valide ou n'a pas déjà été effectué
     * @param {string} coordonneeTir Contient la coordonnée du tir effectué
     * @return {string} Retourne la coordonnée si elle est valide
     */
    lancerMissile(coordonneeTir) {
      let estValide = false;
      while (estValide) {
        if (!coordonneesCoupTirer.includes(coordonneeTir)) {
          estValide = true;
        } else {
          estValide = false;
        }
      }
      return coordonneeTir;
    }

    /**
     * Fonction qui reçois un résultat et modifie l'interface de jeu
     * @param {Number} resultat Résultat du lancé
     */
    resultatLancerMissile(resultat) {
      // TODO Il va rester à aller modifier dans l'interface selon le résultat obtenue
      // La variable test c juste pour me rapeller d'aller modifier ça quand on va être rendu à l'interface
      if (resultat == 0) {
        $('.table-att').find('#' + dernierTir).addClass('manquer');
      } else if (resultat == 1) {
        $('.table-att').find('#' + dernierTir).removeClass('eau').addClass('touche');
        $('.table-att').find('#' + dernierTir).removeClass('bateau').addClass('touche');
      } else if (resultat == 2) {
        $('#porte-avions-ia').removeClass('btn-info').addClass('btn-danger').prop('disabled', true);
        $('.table-att').find('#' + dernierTir).removeClass('eau').addClass('touche');
        $('.table-att').find('#' + dernierTir).removeClass('bateau').addClass('touche');
      } else if (resultat == 3) {
        $('#cuirasse-ia').removeClass('btn-info').addClass('btn-danger').prop('disabled', true);
        $('.table-att').find('#' + dernierTir).removeClass('eau').addClass('touche');
        $('.table-att').find('#' + dernierTir).removeClass('bateau').addClass('touche');
      } else if (resultat == 4) {
        $('#destroyer-ia').removeClass('btn-info').addClass('btn-danger').prop('disabled', true);
        $('.table-att').find('#' + dernierTir).removeClass('eau').addClass('touche');
        $('.table-att').find('#' + dernierTir).removeClass('bateau').addClass('touche');
      } else if (resultat == 5) {
        $('#torpilleur-ia').removeClass('btn-info').addClass('btn-danger').prop('disabled', true);
        $('.table-att').find('#' + dernierTir).removeClass('eau').addClass('touche');
        $('.table-att').find('#' + dernierTir).removeClass('bateau').addClass('touche');
      } else if (resultat == 6) {
        $('#sous-marin-ia').removeClass('btn-info').addClass('btn-danger').prop('disabled', true);
        $('.table-att').find('#' + dernierTir).removeClass('eau').addClass('touche');
        $('.table-att').find('#' + dernierTir).removeClass('bateau').addClass('touche');
      }
    }
  }

  class Battleship {
    constructor() {
      this.positionBateauxJoueur = joueursPartie.joueur.listeBateaux;
      this.positionBateauxOrdinateur = joueursPartie.ordinateur.listeBateaux;
      this.joueurCommence = 1;
    }

    /**
     * Fonction qui ajoute les joueurs pour le jeu.
     * @param {Object} joueur Le joueur humain
     * @param {Object} ordinateur Le joueur ordinateur
     */
    ajouterJoueur(joueur, ordinateur) {
      joueursPartie.joueur = joueur;
      joueursPartie.ordinateur = ordinateur;
    }

    /**
     * Fonction qui sert à tout réinitialiser pour recommencer une partie
     */
    recommencerPartie() {
      const reponseQuestion = confirm('Voulez-vous vraiment recommencer?');
      if (reponseQuestion) {
        partie = new Battleship();
        const joueur1 = new Joueur();
        const joueur2 = joueursPartie.ordinateur.recommencerPartie();

        partie.ajouterJoueur(joueur1, joueur2);

        $('.manquer').removeClass('manquer').addClass('eau');
        $('.touche').removeClass('touche').addClass('eau');
        $('.bateau').removeClass('bateau').addClass('eau');

        $('#porte-avions-ia').removeClass('btn-danger').addClass('btn-info').prop('disabled', false);
        $('#cuirasse-ia').removeClass('btn-danger').addClass('btn-info').prop('disabled', false);
        $('#destroyer-ia').removeClass('btn-danger').addClass('btn-info').prop('disabled', false);
        $('#torpilleur-ia').removeClass('btn-danger').addClass('btn-info').prop('disabled', false);
        $('#sous-marin-ia').removeClass('btn-danger').addClass('btn-info').prop('disabled', false);
        $('#porte-avions-joueur').removeClass('btn-danger').addClass('btn-info').prop('disabled', false);
        $('#cuirasse-joueur').removeClass('btn-danger').addClass('btn-info').prop('disabled', false);
        $('#destroyer-joueur').removeClass('btn-danger').addClass('btn-info').prop('disabled', false);
        $('#torpilleur-joueur').removeClass('btn-danger').addClass('btn-info').prop('disabled', false);
        $('#sous-marin-joueur').removeClass('btn-danger').addClass('btn-info').prop('disabled', false);

        couleurCaseBateaux();

        cptPorteAvionsIA = 0;
        cptCuirasseIA = 0;
        cptDestroyerIA = 0;
        cptTorpilleurIA = 0;
        cptSousMarinIA = 0;
        cptGlobalTir = 0;

        porteAvionsCouler = false;
        cuirasseCouler = false;
        destroyerCouler = false;
        torpilleurCouler = false;
        sousMarinCouler = false;

        // Compteur pour nombre de coup touché sur les bateaux de l'ordinateur
        nbCoupPorteAvionIA = 0;
        nbCoupCuirasseIA = 0;
        nbCoupDestroyerIA = 0;
        nbCoupTorpilleurIA = 0;
        nbCoupSousMarinIA = 0;

        // Liste des tire effectuer par le joueur
        coordonneesCoupTirer = [];
        joueurGagnant = '';
        dernierTir = '';
        coords = '';
      }
    }

    /**
     * Fonction qui sert à lancer les missiles de chaque joueurs pour jouer
     * @param {string} coordonnee La coordonnée du tir effectué
     */
    jouer(coordonnee) {
      let resultat = 0;
      if (this.joueurCommence == 0) {
        joueursPartie.joueur.lancerMissile(coordonnee);
        resultat = this.obtenirResultatLancerJoueur(coordonnee);
        joueursPartie.joueur.resultatLancerMissile(resultat);
        if (this.partieFini()) {
          joueurGagnant = this.estGagnant();
          alert(joueurGagnant);
        }

        coords = joueursPartie.ordinateur.lancerMissile();
        resultat = this.calculResultat(coords);
        joueursPartie.ordinateur.resultatLancerMissile(resultat);
        if (this.partieFini()) {
          joueurGagnant = this.estGagnant();
          alert(joueurGagnant);
        }
      } else {
        coords = joueursPartie.ordinateur.lancerMissile();
        resultat = this.calculResultat(coords);
        joueursPartie.ordinateur.resultatLancerMissile(resultat);
        if (this.partieFini()) {
          joueurGagnant = this.estGagnant();
          alert(joueurGagnant);
        }

        joueursPartie.joueur.lancerMissile(coordonnee);
        resultat = this.obtenirResultatLancerJoueur(coordonnee);
        joueursPartie.joueur.resultatLancerMissile(resultat);
        if (this.partieFini()) {
          joueurGagnant = this.estGagnant();
          alert(joueurGagnant);
        }
      }
    }

    /**
     * Cette fonction détermine ce que le joueur a
     * touché et renvoie le bon entier selon le résultat
     * @param {string} coordonneeTir Position à laquel le joueur à tiré
     * @return {Number} Retourne un entier selon le résultat du tir
     */
    obtenirResultatLancerJoueur(coordonneeTir) {
      if (joueursPartie.ordinateur.listeBateaux['porte-avions'].includes(coordonneeTir)) {
        nbCoupPorteAvionIA++;
        if (!coordonneesCoupTirer.includes(coordonneeTir)) {
          coordonneesCoupTirer.push(coordonneeTir);
        }
        dernierTir = coordonneeTir;
        if (nbCoupPorteAvionIA == 5) {
          return 2;
        } else {
          return 1;
        }
      } else if (joueursPartie.ordinateur.listeBateaux['cuirasse'].includes(coordonneeTir)) {
        nbCoupCuirasseIA++;
        if (!coordonneesCoupTirer.includes(coordonneeTir)) {
          coordonneesCoupTirer.push(coordonneeTir);
        }
        dernierTir = coordonneeTir;
        if (nbCoupCuirasseIA == 4) {
          return 3;
        } else {
          return 1;
        }
      } else if (joueursPartie.ordinateur.listeBateaux['destroyer'].includes(coordonneeTir)) {
        nbCoupDestroyerIA++;
        if (!coordonneesCoupTirer.includes(coordonneeTir)) {
          coordonneesCoupTirer.push(coordonneeTir);
        }
        dernierTir = coordonneeTir;
        if (nbCoupDestroyerIA == 3) {
          return 4;
        } else {
          return 1;
        }
      } else if (joueursPartie.ordinateur.listeBateaux['torpilleur'].includes(coordonneeTir)) {
        nbCoupTorpilleurIA++;
        if (!coordonneesCoupTirer.includes(coordonneeTir)) {
          coordonneesCoupTirer.push(coordonneeTir);
        }
        dernierTir = coordonneeTir;
        if (nbCoupTorpilleurIA == 3) {
          return 5;
        } else {
          return 1;
        }
      } else if (joueursPartie.ordinateur.listeBateaux['sous-marin'].includes(coordonneeTir)) {
        nbCoupSousMarinIA++;
        if (!coordonneesCoupTirer.includes(coordonneeTir)) {
          coordonneesCoupTirer.push(coordonneeTir);
        }
        dernierTir = coordonneeTir;
        if (nbCoupSousMarinIA == 2) {
          return 6;
        } else {
          return 1;
        }
      } else {
        if (!coordonneesCoupTirer.includes(coordonneeTir)) {
          coordonneesCoupTirer.push(coordonneeTir);
        }
        dernierTir = coordonneeTir;
        return 0;
      }
    }

    /**
     * Cette fonction détermine ce que l'ordinateur a
     * touché et renvoie le bon entier selon le résultat
     * @param {string} coordonneesMissile Position à laquel le joueur à tiré
     */
    calculResultat(coordonneesMissile) {
      if (joueursPartie.joueur.listeBateaux['porte-avions'].includes(coordonneesMissile)) {
        joueursPartie.ordinateur.calculCompteur(coordonneesMissile);
        ++cptPorteAvionsIA;
        ++cptGlobalTir;
      } else if (joueursPartie.joueur.listeBateaux['cuirasse'].includes(coordonneesMissile)) {
        joueursPartie.ordinateur.calculCompteur(coordonneesMissile);
        ++cptCuirasseIA;
        ++cptGlobalTir;
      } else if (joueursPartie.joueur.listeBateaux['destroyer'].includes(coordonneesMissile)) {
        joueursPartie.ordinateur.calculCompteur(coordonneesMissile);
        ++cptDestroyerIA;
        ++cptGlobalTir;
      } else if (joueursPartie.joueur.listeBateaux['torpilleur'].includes(coordonneesMissile)) {
        joueursPartie.ordinateur.calculCompteur(coordonneesMissile);
        ++cptTorpilleurIA;
        ++cptGlobalTir;
      } else if (joueursPartie.joueur.listeBateaux['sous-marin'].includes(coordonneesMissile)) {
        joueursPartie.ordinateur.calculCompteur(coordonneesMissile);
        ++cptSousMarinIA;
        ++cptGlobalTir;
      }

      if (cptPorteAvionsIA >= 5 && porteAvionsCouler == false) {
        joueursPartie.ordinateur.resultatLancerMissile(2);
        porteAvionsCouler = true;
        joueursPartie.ordinateur.remettreDirectionsAFalse();
      } else if (cptCuirasseIA >= 4 && cuirasseCouler == false) {
        joueursPartie.ordinateur.resultatLancerMissile(3);
        cuirasseCouler = true;
        joueursPartie.ordinateur.remettreDirectionsAFalse();
      } else if (cptDestroyerIA >= 3 && destroyerCouler == false) {
        joueursPartie.ordinateur.resultatLancerMissile(4);
        destroyerCouler = true;
        joueursPartie.ordinateur.remettreDirectionsAFalse();
      } else if (cptTorpilleurIA >= 3 && torpilleurCouler == false) {
        joueursPartie.ordinateur.resultatLancerMissile(5);
        torpilleurCouler = true;
        joueursPartie.ordinateur.remettreDirectionsAFalse();
      } else if (cptSousMarinIA >= 2 && sousMarinCouler == false) {
        joueursPartie.ordinateur.resultatLancerMissile(6);
        sousMarinCouler = true;
        joueursPartie.ordinateur.remettreDirectionsAFalse();
      } else if (cptGlobalTir == 1) {
        joueursPartie.ordinateur.resultatLancerMissile(1);
      } else {
        joueursPartie.ordinateur.resultatLancerMissile(0);
      }
      cptGlobalTir = 0;
    }

    /**
     * Fonction qui sert à déterminer si la partie est terminé ou non
     * @return {bool} Retourne vrai ou faux dépendant si la partie est fini ou non
     */
    partieFini() {
      const nbCoupTotalGagner = 17;
      let nbCoupToucheJoueur = 0; // Coup touché par le joueur
      let nbCoupToucheIA = 0; // Coup touché par l'ordinateur

      nbCoupToucheJoueur = nbCoupPorteAvionIA + nbCoupCuirasseIA +
        nbCoupDestroyerIA + nbCoupTorpilleurIA + nbCoupSousMarinIA;

      nbCoupToucheIA = cptPorteAvionsIA + cptCuirasseIA +
      cptDestroyerIA + cptTorpilleurIA + cptSousMarinIA;

      if (nbCoupToucheJoueur == nbCoupTotalGagner || nbCoupToucheIA == nbCoupTotalGagner) {
        return true;
      } else {
        return false;
      }
    }

    /**
     * Fonction qui sert à déterminer qui est le gagnant
     * @return {string} Retourne le nom de la personnes gagnante
     */
    estGagnant() {
      const nbCoupTotalGagner = 17;
      let nbCoupToucheJoueur = 0;

      nbCoupToucheJoueur = nbCoupPorteAvionIA + nbCoupCuirasseIA +
      nbCoupDestroyerIA + nbCoupTorpilleurIA + nbCoupSousMarinIA;

      if (nbCoupToucheJoueur == nbCoupTotalGagner) {
        return 'Le joueur est le gagnant! :)';
      } else {
        return 'L\'ordinateur à gagner :(';
      }
    }
  }

  $(document).ready(function() {
    // Initialise le jeu et les joueurs
    joueurHumain = new Joueur();
    partie = new Battleship();

    partie.ajouterJoueur(joueurHumain, window.IA);

    // Création des grilles de jeu
    function creationGrilleDef() {
      const grille = document.getElementById('grilleDef');
      const grilleDef = document.createElement('table');

      // Création des chiffres pour les colonnes
      for (let i = 0; i < 1; i++) {
        const tr = document.createElement('tr');

        for (let j = 0; j < 11; j++) {
          const th = document.createElement('th');
          $(th).addClass('title-col');

          if (j > 0) {
            th.append(j);
          }
          tr.appendChild(th);
        }
        grilleDef.appendChild(tr);
        $(grilleDef).addClass('table-def');
      }

      // Création des cases de la grille de défense
      for (let i = 0; i < 10; i++) {
        const tr = document.createElement('tr');

        $(tr).addClass('titre-lig');
        $(tr).append(String.fromCharCode(65 + i));
        const lettre = String.fromCharCode(65 + i);
        for (let j = 0; j < 10; j++) {
          const td = document.createElement('td');
          $(td).addClass('eau').attr('id', lettre + '-' + (j + 1));
          tr.appendChild(td);
        }
        grilleDef.appendChild(tr);
      }
      grille.appendChild(grilleDef);
    }

    function creationGrilleAtt() {
      const grille = document.getElementById('grilleAtt');
      const grilleAtt = document.createElement('table');

      // Création des chiffres pour les colonnes
      for (let i = 0; i < 1; i++) {
        const tr = document.createElement('tr');

        for (let j = 0; j < 11; j++) {
          const th = document.createElement('th');
          $(th).addClass('title-col');

          if (j > 0) {
            th.append(j);
          }
          tr.appendChild(th);
        }
        grilleAtt.appendChild(tr);
        $(grilleAtt).addClass('table-att');
      }

      // Création des cases de la grille attaque
      for (let i = 0; i < 10; i++) {
        const tr = document.createElement('tr');

        $(tr).addClass('titre-lig');
        $(tr).append(String.fromCharCode(65 + i));
        const lettre = String.fromCharCode(65 + i);
        for (let j = 0; j < 10; j++) {
          const td = document.createElement('td');
          $(td).addClass('eau').attr('id', lettre + '-' + (j + 1));
          $(td).addClass('tir');
          tr.appendChild(td);
        }
        grilleAtt.appendChild(tr);
      }
      grille.appendChild(grilleAtt);
    }

    function caseEnterCouleur() {
      $('.eau').mouseenter(function() {
        $(this).css('opacity', '0.5');
      });
      $('.eau').mouseleave(function() {
        $(this).css('opacity', '1');
      });
    }

    // Appel des fonctions pour la création de l'interface
    creationGrilleDef();
    creationGrilleAtt();
    caseEnterCouleur();
    couleurCaseBateaux();


    // Si activé, va lancer la fonction jouer qui va déclancer les missiles de chaques joueurs
    $('td').click(function() {
      if ($(this).hasClass('tir') && partieCommencer) {
        const coordonnee = $(this).attr('id');
        partie.jouer(coordonnee);
      }
    });

    // Si activé, va lancer la fonction recommencer qui va tout réinisialiser la table de jeu
    $('#recommencer').click(function() {
      partie.recommencerPartie();
    });
  });
}());
