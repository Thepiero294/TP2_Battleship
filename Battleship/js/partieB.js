(function() {
  // Joueurs de la partie
  const joueursPartie =
  {
    joueur: '',
    ordinateur: '',
  };
  // Compteur pour nombre de coup touché sur les bateaux du joueurs
  let nbCoupPorteAvionJ = 0;
  let nbCoupCuirasseJ = 0;
  let nbCoupDestroyerJ = 0;
  let nbCoupTorpilleurJ = 0;
  let nbCoupSousMarinJ = 0;

  // Compteur pour nombre de coup touché sur les bateaux de l'ordinateur
  let nbCoupPorteAvionIA = 0;
  let nbCoupCuirasseIA = 0;
  let nbCoupDestroyerIA = 0;
  let nbCoupTorpilleurIA = 0;
  let nbCoupSousMarinIA = 0;
  // let joueurHumain = null;
  // const joueurAI = null;
  // let joueurCommence = 0;
  // let partieCommencer = false;
  // let estEnCoursDePlacement = false;

  /**
   * Retourne une nombre entre le chiffre minimum (inclus) et maximum (inclus)
   * @param {number} nbMin Nombre minimum de l'intervalle
   * @param {number} NbMax Nombre maximum de l'intervalle
   * @return {number} Retourne un nombre entier entre l'intervalle
   */
  function nombreAleatoireIntervalle(nbMin, NbMax) {
    return Math.floor(Math.random() * (nbMax - nbMin + 1)) + min;
  }

  class Joueur {
    constructor() {
      this.listeBateaux = {
        'porte-avion': ['', '', '', '', ''],
        'cuirasse': ['', '', '', ''],
        'destroyer': ['', '', ''],
        'torpilleur': ['', '', ''],
        'sous-marin': ['', '', ''],
      };
    }

    /**
     * Fonction qui sert à placer les bateaux du joueur
     * @return {Array} return la liste des bateaux avec leur positions
     */
    placementBateaux() {
      return this.listeBateaux;
    }

    /**
     * Cette fonction détermine si ce que le joueur a
     * touché et renvoie le bon entier selon le résultat
     * @param {string} positionTir Position à laquel le joueur à tiré
     * @return {Number} Retourne un entier selon le résultat du tir
     */
    obtenirResultatLancerJoueur(positionTir) {
      // TODO J'étais rendu à finir cette fonction
      if (this.listeBateaux['porte-avion'].forEach() == positionTir) {
        nbCoupPorteAvionIA++;
        if (nbCoupPorteAvionIA == 5) {
          return 2;
        } else {
          return 1;
        }
      }
    }
  }

  class Battleship {
    constructor() {
      this.positionBateauxJoueur1 = null;
      this.positionBateauxJoueur2 = null;
    }

    ajouterJoueur(joueur) {
      joueursPartie.joueur = joueur;
    }

    ajouterOrdinateur(ordinateur) {
      joueursPartie.ordinateur = ordinateur;
    }

    /**
     * Fonction qui sert à tout mettre en place pour commencer la partie
     */
    commencerPartie() {
      partieCommencer = true;
      this.positionBateauxJoueur1 = joueursPartie.joueur.placementBateaux();
      this.positionBateauxJoueur2 = joueursPartie.ordinateur.placerBateaux();
      joueurCommence = nombreAleatoireIntervalle(1, 2);
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

      nbCoupToucheIA = nbCoupPorteAvionJ + nbCoupCuirasseJ +
      nbCoupDestroyerJ + nbCoupTorpilleurJ + nbCoupSousMarinJ;

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
    joueurHumain = new Joueur();
    partie = new Battleship();

    partie.ajouterJoueur(joueurHumain);
    partie.ajouterOrdinateur(window.IA);

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
          tr.appendChild(td);
        }
        grilleAtt.appendChild(tr);
      }
      grille.appendChild(grilleAtt);
    }

    // TODO vérifier comment arranger cette erreur
    function caseEnterCouleur() {
      $('.eau').mouseenter(function() {
        $(this).css('opacity', '0.5');
      });
      $('.eau').mouseleave(function() {
        $(this).css('opacity', '1');
      });
    }

    creationGrilleDef();
    creationGrilleAtt();
    caseEnterCouleur();
    console.log(joueurHumain.grilleJoueur[9][9]);
  });
}());