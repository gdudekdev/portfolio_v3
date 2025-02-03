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

// Gestion du click sur les icônes
// Variable globale pour suivre l'icône actuellement dans le conteneur temporaire
let currentIconInTempContainer = null;
let currentIconLi = null;
document.querySelectorAll(".skills__icon").forEach((icon) => {
  icon.addEventListener("click", (event) => {
    event.stopPropagation();

    const tempContainer = document.querySelector(".skills__icon--active");
    const parentIcon = icon.parentNode;

    if (!tempContainer.classList.contains("show")) {
      tempContainer.classList.add("show"); // Ajoute la classe qui déclenche l'animation
    }
    // Si une icône est déjà dans le conteneur temporaire, on la retire
    if (currentIconInTempContainer) {
      currentIconLi.classList.remove("hidden");
      currentIconInTempContainer.remove();
      currentIconInTempContainer = null;
      currentIconLi = null;
    }

    // Cloner l'icône et l'ajouter au conteneur temporaire
    const parentIconCopy = parentIcon.cloneNode(true);
    parentIcon.classList.add("hidden");
    parentIconCopy.querySelector("div").classList.toggle("hidden");

    // ✅ RÉINITIALISER LA ROTATION AVANT D'AJOUTER
    parentIconCopy.classList.remove("skills__item--justify"); // Supprime la rotation précédente
    parentIconCopy.style.transform = "rotate(0deg)"; // Remet à 0° immédiatement

    tempContainer.appendChild(parentIconCopy);

    // Ajoute une animation de transition après un petit délai
    setTimeout(() => {
      parentIconCopy.classList.add("skills__item--justify");
    }, 100);

    // Gestion du retour au clic
    parentIconCopy
      .querySelector(".skills__icon")
      .addEventListener("click", () => {
        parentIcon.classList.remove("hidden");
        parentIconCopy.remove();
        currentIconInTempContainer = null;
      });

    // Met à jour l'icône actuelle dans le conteneur temporaire
    currentIconInTempContainer = parentIconCopy;
    currentIconLi = parentIcon;
  });
});
// Fonction pour fermer la boîte avec animation
function closeSkillContainer(tempContainer, originalIcon, clonedIcon) {
  tempContainer.classList.add("hide"); // Ajoute la classe pour l'animation de sortie

  // Attendre la fin de l'animation avant de réinitialiser
  setTimeout(() => {
    tempContainer.classList.remove("show", "hide"); // Réinitialise les classes
    originalIcon.classList.remove("hidden"); // Réaffiche l'icône dans la liste
    clonedIcon.remove(); // Supprime l'icône du conteneur temporaire
    currentIconInTempContainer = null;
    currentIconLi = null;
  }, 300); // Attente pour correspondre à la transition CSS
}

// Fermer en cliquant en dehors du conteneur
document.addEventListener("click", (event) => {
  const tempContainer = document.querySelector(".skills__icon--active");

  if (currentIconInTempContainer && !tempContainer.contains(event.target)) {
    closeSkillContainer(
      tempContainer,
      currentIconLi,
      currentIconInTempContainer
    );
  }
});

// TODO Gérer le scroll de sortie de section pour l'overlay, l'icone sort bien mais pas l'overlay
// TODO Ajouter un effet d'assombrissement lorsque l'on clique sur un icone pour mettre en avant la valeur choisie

// TODO vérifier si on a bien besoin des ids pour que cela marche

// TODO faire un effet ou l'icone part de la gauche, le texte de la droite au moment du click et arrive à la position finale plus effet d'opacité pour un mouvement plus fluide

// TODO commencer à séparer les fichiers js et css pour que cela soit plus lisible, créer un fichier d'import config.js pour ne pas avoir a mettre plein de balises script dans l'hmtl, voir pour faire de même avec les fichiers css
// TODO voir si on doit modifier hidden par visible pour jouer sur l'attribut visibility et opacity afin de gérer les aniamtions, checker aussi pour les sortir du flux lorsqu'elles ne sont pas affichées via l'attribut position:absolute

// Sélectionner le conteneur où les enfants seront ajoutés/supprimés
const container = document.querySelector(".skills__icon--active");
const listIcon = document.querySelector(".skills__list-icon");
let liste = document.querySelector(".skills__list-icon").querySelectorAll("li");

// let icons=liste.get

let config = { childList: true };

let callback = function (mutationsList) {
  for (var mutation of mutationsList) {
    if (mutation.type === "childList") {
      if (container !== 0) {
        console.log(liste);
        listIcon.classList.toggle("skills__list-icon--active");
        liste.forEach((liste) => {
          let children = liste.querySelector(".skills__item");
          console.log(children);
          children.classList.toggle("skills__item--justify");
        });
      }
    }
  }
  let currentIcon = container.children;
  currentIcon[0].classList.remove(".skills__item--justify");
};

let observer = new MutationObserver(callback);
// Commence à observer le noeud cible pour les mutations précédemment configurées
observer.observe(container, config);

const cards = document.querySelectorAll(".projects__card");
const cardsContainer = document.querySelector(".projects");
let isCardActive = false; // État global

cards.forEach((card) => {
  card.addEventListener("click", (event) => {
    event.stopPropagation(); // Empêche l'événement de se propager au document
    const cardBack = card.querySelector(".projects__card-inner .projects__card-back")
    console.log(cardBack);
    if (isCardActive && !card.classList.contains("active")) {
      return; // Empêche d’ouvrir une autre carte si une est déjà active
    }
    cardBack.classList.toggle("display")
    // Réinitialise toutes les cartes
    cards.forEach((otherCard) => {
      otherCard.classList.remove("active", "minimized");
      otherCard.style.position = "relative";
      otherCard.style.transform = "scale(1)";
      otherCard.style.zIndex = "1";
    });

    // Active la carte actuelle
    isCardActive = true;
    card.classList.add("active");
    card.style.position = "absolute";
    card.style.transform = "scale(1.2)";
    card.style.zIndex = "2";

    // Réduit les autres cartes
    cards.forEach((otherCard) => {
      if (otherCard !== card) {
        otherCard.classList.add("minimized");
      }
    });
  });
});

// Gestion du clic hors des cartes pour réinitialiser
document.addEventListener("click", () => {
  isCardActive = false; // Réinitialise l'état

  cards.forEach((card) => {
    const cardBack = card.querySelector(".projects__card-inner .projects__card-back")
    cardBack.classList.remove("display")
    card.classList.remove("active", "minimized");
    card.style.position = "relative";
    card.style.transform = "scale(1)";
    card.style.zIndex = "1";
  });
});