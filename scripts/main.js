// Initialisation de Scrollify après le chargement complet du DOM
$(document).ready(function () {
  $.scrollify({
    section: ".section", // Sélectionne les sections de la page à faire défiler
    before: function (index, sections) {
      // Avant de passer à une nouvelle section, on ajoute la classe 'active' à la section actuelle
      $(sections[index]).addClass("active");
    },
    after: function (index, sections) {
      // Après avoir quitté une section, on retire la classe 'active' de l'ancienne section
      $(sections[index - 1]).removeClass("active");
    },
  });
});

// Variable globale pour suivre l'icône actuellement dans le conteneur temporaire
let currentIconInTempContainer = null;
let currentIconLi = null;

document.querySelectorAll(".skills__icon").forEach((icon) => {
  icon.addEventListener("click", (event) => {
    event.stopPropagation();

    // Sélectionner le conteneur temporaire
    const tempContainer = document.querySelector(
      ".skills__icon-temporary--open"
    );

    // Récupérer le parent de l'icône cliquée
    const parentIcon = icon.parentNode;

    // Cloner le parent
    const parentIconCopy = parentIcon.cloneNode(true);

    // Si une icône est déjà dans le conteneur temporaire, on la retire
    if (currentIconInTempContainer) {
      currentIconLi.classList.remove("hidden"); // Restaurer l'état de l'icône originale
      currentIconInTempContainer.remove(); // Supprime l'ancienne icône du conteneur temporaire
      currentIconInTempContainer = null;
      currentIconLi = null;
    }

    // Ajouter la classe 'hidden' au parent de l'icône cliquée
    parentIcon.classList.add("hidden");
    // Affichage du texte
    parentIconCopy.querySelector("div").classList.toggle("hidden");
    // Ajouter le clone dans le conteneur temporaire
    tempContainer.appendChild(parentIconCopy);

    // Ajoute un gestionnaire d'événements sur l'icône clonée pour réagir au clic
    const clonedIcon = parentIconCopy.querySelector(".skills__icon");
    clonedIcon.addEventListener("click", () => {
      console.log("Clique sur le clone");

      // Retirer l'icône du conteneur temporaire et réinitialiser l'état de l'icône dans la liste
      parentIcon.classList.remove("hidden"); // Restaurer l'état de l'icône originale
      parentIconCopy.remove(); // Supprimer le clone du conteneur temporaire
      currentIconInTempContainer = null; // Réinitialiser l'icône dans le conteneur
    });

    // Met à jour l'icône actuelle dans le conteneur temporaire
    currentIconInTempContainer = parentIconCopy;
    currentIconLi = parentIcon;
  });
});

// TODO Ajouter un effet d'assombrissement lorsque l'on clique sur un icone pour mettre en avant la valeur choisie

// TODO vérifier si on a bien besoin des ids pour que cela marche

// TODO faire un effet ou l'icone part de la gauche, le texte de la droite au moment du click et arrive à la position finale plus effet d'opacité pour un mouvement plus fluide

document.addEventListener("click", () => {
  if (currentIconInTempContainer) {
    currentIconLi.classList.remove("hidden"); // Restaurer l'état de l'icône originale
    currentIconInTempContainer.remove(); // Supprime l'ancienne icône du conteneur temporaire
    currentIconInTempContainer = null;
    currentIconLi = null;
  }
});

const overlay = document.querySelector(".skills__overlay");

// Sélectionner le conteneur où les enfants seront ajoutés/supprimés
const container = document.querySelector(".skills__icon-temporary--open");

let config = { childList: true };

let callback = function (mutationsList) {
  for (var mutation of mutationsList) {
    if (mutation.type == "childList") {
      if (container.childLis !== 0) {
        overlay.classList.toggle("hidden");
      }
    }
  }
};

let observer = new MutationObserver(callback);
// Commence à observer le noeud cible pour les mutations précédemment configurées
observer.observe(container, config);

const skillsSection = document.querySelector("#skills");

function checkSkillsVisibility() {
  const rect = skillsSection.getBoundingClientRect(); // Récupère la position de la section
  // Vérifie si la section est complètement hors de la fenêtre (au-dessus ou en dessous)

  if (rect.top >= window.innerHeight || rect.bottom <= 0) {  
    if (currentIconInTempContainer !== null) {
      overlay.classList.add("hidden"); // Ferme l'overlay si la section n'est plus visible
      currentIconLi.classList.remove("hidden"); // Restaurer l'état de l'icône originale
      currentIconInTempContainer.remove(); // Supprime l'ancienne icône du conteneur temporaire
      currentIconInTempContainer = null;
      currentIconLi = null;
    }
  }
}

// Ajouter un écouteur d'événements pour vérifier la visibilité lors du défilement
window.addEventListener("scroll", checkSkillsVisibility);

// Vérifie aussi au chargement de la page si la section est visible
document.addEventListener("DOMContentLoaded", checkSkillsVisibility);
