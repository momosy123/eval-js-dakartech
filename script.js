//  tableau qui va stocker toutes les tâches
let taches = [];

// 2. Sélection des éléments HTML (Le DOM)
const formulaire = document.getElementById('formulaire-ajout');
const champTache = document.getElementById('champ-tache');
const listeTaches = document.getElementById('liste-taches');
const messageErreur = document.getElementById('message-erreur');

// 3. Fonction pour afficher la liste à l'écran
function afficherTaches() {
    // On vide la liste avant de tout réafficher pour éviter les doublons
    listeTaches.innerHTML = '';

    // On parcourt notre tableau
    taches.forEach(function(tache) {
        // Création de la balise <li>
        let li = document.createElement('li');
        li.textContent = tache.texte;
        
        // On ajoute le <li> dans notre <ul>
        listeTaches.appendChild(li);
    });
}

// 4. Fonction pour ajouter une nouvelle tâche
function ajouterTache(event) {
    // Empêche la page de se recharger quand on valide le formulaire
    event.preventDefault();

    let texteSaisi = champTache.value.trim();

    // Condition : si le champ est vide
    if (texteSaisi === '') {
        messageErreur.style.display = 'block'; // On affiche l'erreur
    } else {
        messageErreur.style.display = 'none'; // On cache l'erreur

        // Création de l'objet tâche comme demandé par le prof
        let nouvelleTache = {
            texte: texteSaisi,
            terminee: false
        };

        // On ajoute l'objet dans le tableau
        taches.push(nouvelleTache);

        // On vide le champ texte pour la prochaine tâche
        champTache.value = '';

        // On met à jour l'écran
        afficherTaches();
    }
}

// 5. On écoute l'événement "submit" sur le formulaire
formulaire.addEventListener('submit', ajouterTache);