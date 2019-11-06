$(document).ready(function() {
  function creationGrilleDef()
  {
    const grille = document.getElementById('grilleDef');
    const grilleDef = document.createElement('table');

    // Création des chiffres pour les colonnes
    for (let i = 0; i < 1; i++) {
      var tr = document.createElement('tr');

      for (let j = 0; j < 11; j++) {
        var th = document.createElement('th');
        $(th).addClass('title-col');

        if (j > 0) {
          th.append(j);
        }
        tr.appendChild(th);
      }
      grilleDef.appendChild(tr);
    }

    for (let i = 0; i < 10; i++) {
      var tr = document.createElement('tr');

      $(tr).addClass('titre-lig');
      $(tr).append(String.fromCharCode(65 + i))
      for (let j = 0; j < 10; j++) {
        var td = document.createElement('td');
        $(td).addClass('eau');
        tr.appendChild(td);
      }
      grilleDef.appendChild(tr);
    }
    grille.appendChild(grilleDef);
  }

  creationGrilleDef();
});
