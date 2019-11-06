(function() {
  class IA {
    placerBateaux() {

      var coordonneesUtilisees = [];

      var coordonneesPorteAvion = this.creationBateau(4);

      coordonneesUtilisees.push.apply(coordonneesUtilisees, coordonneesPorteAvion);
      var coordonneesCuirasse = this.creationBateau(3, coordonneesUtilisees);

      coordonneesUtilisees.push.apply(coordonneesUtilisees, coordonneesCuirasse);
      var coordonneesDestroyer = this.creationBateau(2, coordonneesUtilisees);

      coordonneesUtilisees.push.apply(coordonneesUtilisees, coordonneesDestroyer);
      var coordonneesTorpilleur = this.creationBateau(2, coordonneesUtilisees);

      coordonneesUtilisees.push.apply(coordonneesUtilisees, coordonneesTorpilleur);
      var coordonneesSousMarin = this.creationBateau(1, coordonneesUtilisees);

      console.log("Porte-Avion : " + coordonneesPorteAvion);
      console.log("Cuirassé : " + coordonneesCuirasse);
      console.log("Destroyer : " + coordonneesDestroyer);
      console.log("Torpilleur : " + coordonneesTorpilleur);
      console.log("Sous-Marin : " + coordonneesSousMarin);
      
      return {
        'porte-avions': ['D-2', 'E-2', 'F-2', 'G-2', 'H-2'],
        'cuirasse': ['F-9', 'G-9', 'H-9', 'I-9'],
        'destroyer': ['A-2', 'A-3', 'A-4'],
        'torpilleur': ['B-7', 'C-7', 'D-7'],
        'sous-marin': ['F-3', 'F-4'],
      };
    };

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
      return coordonneesBateau;
    };

    lancerMissile() {
      // Trouver un meilleur algo .. !
      return 'A-1';
    };

    resultatLancerMissile(resultat) {
      // Ajuster l'algo pour utiliser le résultat d'un lancé
    };

    // ...
  }

  const monIA = new IA();
  if (window.Battleship && window.Battleship.ajouterJoueur) {
    window.Battleship.ajouterJoueur('Vos noms', monIA);
  }

  monIA.placerBateaux();

  // ...
}());
