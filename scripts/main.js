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
      if (index > 0) {
        $(sections[index - 1]).removeClass("active");
      }
    },
  });
});

// Smoothing sur le click d'un a href
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  });
});

/* ========== HERO ========== */
document.addEventListener("DOMContentLoaded", function () {
  // Génération dynamique des formes organiques
  const section = document.querySelector(".hero__animated-bg");
  const numberOfCircles = 10; // Nombre de cercles animés

  function createCircle() {
    const circle = document.createElement("div");
    circle.classList.add("hero__circle");

    // Taille aléatoire entre 50px et 150px
    const size = (Math.floor(Math.random() * 100) + 50) * 20;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;

    // Positionner de manière aléatoire
    const top = Math.floor(Math.random() * 100); // Position verticale
    const left = Math.floor(Math.random() * 100); // Position horizontale
    circle.style.top = `${top}%`;
    circle.style.left = `${left}%`;

    // Définir une luminosité aléatoire pour créer l'effet de dégradé

    const lightness = Math.floor(Math.random() * 60) + 10; // Luminosité entre 40% et 80%
    const color = `hsl(255,0%, ${lightness}%)`;
    // Appliquer la couleur lumineuse
    circle.style.backgroundColor = color;

    // Animation aléatoire des déplacements et échelles
    const x1 = Math.floor(Math.random() * 200) - 100 + "vw";
    const y1 = Math.floor(Math.random() * 200) - 100 + "vh";
    const x2 = Math.floor(Math.random() * 200) - 100 + "vw";
    const y2 = Math.floor(Math.random() * 200) - 100 + "vh";
    const x3 = Math.floor(Math.random() * 200) - 100 + "vw";
    const y3 = Math.floor(Math.random() * 200) - 100 + "vh";
    const x4 = Math.floor(Math.random() * 200) - 100 + "vw";
    const y4 = Math.floor(Math.random() * 200) - 100 + "vh";
    const x5 = Math.floor(Math.random() * 200) - 100 + "vw";
    const y5 = Math.floor(Math.random() * 200) - 100 + "vh";

    const opacity1 = Math.random() * 0.5 + 0.3;
    const opacity2 = Math.random() * 0.5 + 0.5;

    const scale1 = Math.random() * 0.5 + 0.8;
    const scale2 = Math.random() * 0.5 + 0.8;
    const scale3 = Math.random() * 0.5 + 0.8;
    const scale4 = Math.random() * 0.5 + 0.8;
    const scale5 = Math.random() * 0.5 + 0.8;

    // Appliquer les variables CSS pour l'animation
    circle.style.setProperty("--x1", x1);
    circle.style.setProperty("--y1", y1);
    circle.style.setProperty("--x2", x2);
    circle.style.setProperty("--y2", y2);
    circle.style.setProperty("--x3", x3);
    circle.style.setProperty("--y3", y3);
    circle.style.setProperty("--x4", x4);
    circle.style.setProperty("--y4", y4);
    circle.style.setProperty("--x5", x5);
    circle.style.setProperty("--y5", y5);
    circle.style.setProperty("--opacity1", opacity1);
    circle.style.setProperty("--opacity2", opacity2);
    circle.style.setProperty("--scale1", scale1);
    circle.style.setProperty("--scale2", scale2);
    circle.style.setProperty("--scale3", scale3);
    circle.style.setProperty("--scale4", scale4);
    circle.style.setProperty("--scale5", scale5);

    // Ajouter le cercle à la section
    section.appendChild(circle);
  }
  // Créer les cercles
  for (let i = 0; i < numberOfCircles; i++) {
    createCircle();
  };
});

/* ========== SKILLS ========== */

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

// TODO implémentation d'une navbar avec logo pour revenir au hero
// TODO ajout d'un footer
// TODO Ajout du contenu sur les section skills et projects
// TODO animation de l'apparation de la navbar au chargement de la page


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
        listIcon.classList.toggle("skills__list-icon--active");
        liste.forEach((liste) => {
          let children = liste.querySelector(".skills__item");
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

/* ========== PROJECTS ========== */

const cards = document.querySelectorAll(".projects__card");
let activeCard = null;
let isTransitioning = false;

function disableScrolling() {
  $.scrollify.disable();
  document.body.classList.add("active-card");
}

function enableScrolling() {
  document.body.classList.remove("active-card");
  $.scrollify.enable();
}

cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    e.stopPropagation();

    if (isTransitioning) return;

    const cardBack = card.querySelector(".projects__card-back");

    if (activeCard === card) {
      // Close active card
      isTransitioning = true;
      cardBack.classList.add("closing");
      card.classList.remove("active");

      setTimeout(() => {
        cardBack.classList.remove("closing");
        cardBack.style.visibility = "hidden";
        activeCard = null;
        isTransitioning = false;
        enableScrolling();
        cards.forEach((otherCard) => {
          otherCard.classList.remove("minimized");
        });
      }, 500);
    } else if (!activeCard) {
      // Open new card
      isTransitioning = true;
      activeCard = card;
      cardBack.style.visibility = "visible";
      disableScrolling();

      requestAnimationFrame(() => {
        card.classList.add("active");

        cards.forEach((otherCard) => {
          if (otherCard !== card) {
            otherCard.classList.add("minimized");
          }
        });

        setTimeout(() => {
          isTransitioning = false;
        }, 500);
      });
    }
  });
});

// Handle outside clicks
document.addEventListener("click", () => {
  if (activeCard) {
    const cardBack = activeCard.querySelector(".projects__card-back");
    cardBack.classList.add("closing");
    activeCard.classList.remove("active");

    setTimeout(() => {
      cardBack.classList.remove("closing");
      activeCard = null;
      enableScrolling();

      cards.forEach((card) => {
        card.classList.remove("minimized");
      });
    }, 500);
  }
});

//Animation text-shadow sur le hover des projects__card

cards.forEach((card) => {
  let h2 = card.querySelector("h2");
  let text = h2.innerText;
  h2.innerHTML = ""; // On vide le h2

  // On transforme chaque lettre en un <span>
  text.split("").forEach((char) => {
    let span = document.createElement("span");
    span.innerText = char;
    h2.appendChild(span);
  });

  let chars = h2.querySelectorAll("span");

  let glowShadow = `  2px 0px 4px rgba(5, 13, 51, .9), 
                      -2px 0px 8px rgba(5, 13, 51, 1), 
                      0px 2px 10px rgba(5, 13, 51, 1),
                      0px -2px 10px rgba(5, 13, 51, 1)`;

  const initShadow = `  2px 0px 4px rgba(5, 13, 51, 0), 
                        -2px 0px 8px rgba(5, 13, 51, 0), 
                        0px 2px 10px rgba(5, 13, 51, 0),
                        0px -2px 10px rgba(5, 13, 51, 0)`;

  card.addEventListener("mouseenter", () => {
    gsap.fromTo(
      chars,
      { textShadow: initShadow },
      {
        textShadow: glowShadow,
        stagger: { amount: 0.6 },
        duration: 0.5,
        delay: 0.3,
        ease: "power2.out",
      }
    );
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(chars, {
      textShadow: initShadow,
      duration: 0.6,
      ease: "power2.inOut",
    });
  });
});
