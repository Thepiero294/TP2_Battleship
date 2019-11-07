(function() {
  class IA {
    placerBateaux() {

      var coordonneesUtilisees = [];

      var coordonneesPorteAvion = this.creationBateau(4, coordonneesUtilisees);

      var coordonneesCuirasse = this.creationBateau(3, coordonneesUtilisees);

      var coordonneesDestroyer = this.creationBateau(2, coordonneesUtilisees);

      var coordonneesTorpilleur = this.creationBateau(2, coordonneesUtilisees);

      var coordonneesSousMarin = this.creationBateau(1, coordonneesUtilisees);
     
      return {
        'porte-avions': coordonneesPorteAvion,
        'cuirasse': coordonneesCuirasse,
        'destroyer': coordonneesDestroyer,
        'torpilleur': coordonneesTorpilleur,
        'sous-marin': coordonneesSousMarin,
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

  console.log(monIA.placerBateaux());

  // ...
}());
