// 1. On charge les tâches depuis le localStorage s'il y en a, sinon on crée un tableau vide
let taches = [];
let tachesSauvegardees = localStorage.getItem("mesTaches");

// Si on a trouvé des sauvegardes, on les reconvertit en vrai tableau
if (tachesSauvegardees !== null) {
    taches = JSON.parse(tachesSauvegardees);
}

// 2. Sélection des éléments HTML
const formulaire = document.getElementById('formulaire-ajout');
const champTache = document.getElementById('champ-tache');
const listeTaches = document.getElementById('liste-taches');
const messageErreur = document.getElementById('message-erreur');
const texteCompteur = document.getElementById('texte-compteur');

// Nouveaux éléments pour les filtres (Bonus)
const btnFiltreToutes = document.getElementById('filtre-toutes');
const btnFiltreEnCours = document.getElementById('filtre-encours');
const btnFiltreTerminees = document.getElementById('filtre-terminees');

// Variable pour savoir quel filtre est actif
let filtreActuel = "toutes";

// 3. Fonction pour sauvegarder dans le localStorage (Bonus)
function sauvegarderTaches() {
    let texteJSON = JSON.stringify(taches);
    localStorage.setItem("mesTaches", texteJSON);
}

// 4. Fonction pour le compteur
function mettreAJourCompteur() {
    let nbEnCours = 0;
    taches.forEach(function(tache) {
        if (tache.terminee === false) {
            nbEnCours = nbEnCours + 1; 
        }
    });
    texteCompteur.textContent = nbEnCours + " tâche(s) en cours";
}

// 5. Fonction pour afficher la liste (avec le filtre appliqué)
function afficherTaches() {
    listeTaches.innerHTML = '';

    // -- APPLICATION DU FILTRE BONUS --
    let tachesAafficher = [];

    if (filtreActuel === "toutes") {
        tachesAafficher = taches; 
    } else if (filtreActuel === "encours") {
        // Utilisation de la méthode filter() comme demandé par le prof
        tachesAafficher = taches.filter(function(tache) {
            return tache.terminee === false;
        });
    } else if (filtreActuel === "terminees") {
        tachesAafficher = taches.filter(function(tache) {
            return tache.terminee === true;
        });
    }

    // On parcourt le tableau filtré pour l'affichage
    tachesAafficher.forEach(function(tache) {
        
        // Comme on utilise un tableau filtré, il faut retrouver la vraie position 
        // de la tâche dans le tableau principal pour pouvoir la modifier ou la supprimer
        let vraiIndex = taches.indexOf(tache);

        let li = document.createElement('li');
        li.textContent = tache.texte;
        
        if (tache.terminee === true) {
            li.classList.add('terminee');
        }

        let divActions = document.createElement('div');
        divActions.classList.add('actions-tache');

        let btnTerminer = document.createElement('button');
        btnTerminer.textContent = 'Terminé';
        btnTerminer.classList.add('btn-terminer');
        
        btnTerminer.addEventListener('click', function() {
            if (taches[vraiIndex].terminee === true) {
                taches[vraiIndex].terminee = false;
            } else {
                taches[vraiIndex].terminee = true;
            }
            sauvegarderTaches(); // On sauvegarde la modification
            afficherTaches();
        });

        let btnSupprimer = document.createElement('button');
        btnSupprimer.textContent = 'Supprimer';
        btnSupprimer.classList.add('btn-supprimer');
        
        btnSupprimer.addEventListener('click', function() {
            taches.splice(vraiIndex, 1);
            sauvegarderTaches(); // On sauvegarde la suppression
            afficherTaches(); 
        });

        divActions.appendChild(btnTerminer);
        divActions.appendChild(btnSupprimer);
        li.appendChild(divActions);
        
        listeTaches.appendChild(li);
    });

    mettreAJourCompteur();
}

// 6. Fonction pour ajouter
function ajouterTache(event) {
    event.preventDefault();

    let texteSaisi = champTache.value.trim();

    if (texteSaisi === '') {
        messageErreur.style.display = 'block';
    } else {
        messageErreur.style.display = 'none';

        let nouvelleTache = {
            texte: texteSaisi,
            terminee: false
        };

        taches.push(nouvelleTache);
        champTache.value = '';
        
        sauvegarderTaches(); // On sauvegarde l'ajout
        afficherTaches();
    }
}

formulaire.addEventListener('submit', ajouterTache);

// 7. GESTION DES FILTRES (BONUS)
function changerFiltre(nouveauFiltre, boutonActif) {
    filtreActuel = nouveauFiltre;

    // On retire la classe "actif" de tous les boutons
    btnFiltreToutes.classList.remove('actif');
    btnFiltreEnCours.classList.remove('actif');
    btnFiltreTerminees.classList.remove('actif');

    // On l'ajoute seulement au bouton cliqué
    boutonActif.classList.add('actif');

    // On met à jour l'affichage
    afficherTaches();
}

btnFiltreToutes.addEventListener('click', function() {
    changerFiltre("toutes", btnFiltreToutes);
});

btnFiltreEnCours.addEventListener('click', function() {
    changerFiltre("encours", btnFiltreEnCours);
});

btnFiltreTerminees.addEventListener('click', function() {
    changerFiltre("terminees", btnFiltreTerminees);
});

// 8. On affiche la liste une première fois au lancement de la page
afficherTaches();