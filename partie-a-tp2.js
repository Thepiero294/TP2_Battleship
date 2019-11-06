(function() {
  class IA {
    placerBateaux() {
      // Trouver un meilleur algo .. !
      return {
        'porte-avions': ['D-2', 'E-2', 'F-2', 'G-2', 'H-2'],
        'cuirasse': ['F-9', 'G-9', 'H-9', 'I-9'],
        'destroyer': ['A-2', 'A-3', 'A-4'],
        'torpilleur': ['B-7', 'C-7', 'D-7'],
        'sous-marin': ['F-3', 'F-4'],
      };
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

  // ...
}());
