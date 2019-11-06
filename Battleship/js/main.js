$(document).ready(function() {
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
});
