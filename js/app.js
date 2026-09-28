// ==========================================================
// INITIALISATION DU SCRIPT APRÈS LE CHARGEMENT DU DOM
// ==========================================================
document.addEventListener("DOMContentLoaded", function () {

  // ==========================================================
  // INITIALISATION DES ANIMATIONS AOS
  // Vérifie que la bibliothèque AOS est disponible avant
  // de l'initialiser.
  // ==========================================================
  if (window.AOS) {
    AOS.init({
      duration: 750,
      once: true,
      offset: 60,
      easing: "ease-out-cubic"
    });
  }

  // ==========================================================
  // MENU DE NAVIGATION MOBILE
  // Récupération du bouton du menu et des liens de navigation.
  // ==========================================================
  const menu = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");

  // Vérifie que les éléments du menu existent.
  if (menu && links) {

    // Ouverture / fermeture du menu mobile
    menu.addEventListener("click", function () {
      links.classList.toggle("open");

      // Mise à jour de l'état du bouton pour l'accessibilité
      menu.setAttribute(
        "aria-expanded",
        links.classList.contains("open")
      );
    });

    // Ferme automatiquement le menu après avoir cliqué
    // sur un lien de navigation.
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
      });
    });
  }

  // ==========================================================
  // ANNÉE AUTOMATIQUE DU COPYRIGHT
  // Remplace les éléments [data-year] par l'année actuelle.
  // ==========================================================
  document.querySelectorAll("[data-year]").forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

  // ==========================================================
  // GALERIE PHOTO ET FENÊTRE MODALE
  // ==========================================================

  // Récupération de la fenêtre modale
  const modal = document.getElementById("galleryModal");

  // Récupération de l'image affichée dans la modale
  const modalImage = document.getElementById("modalImage");

  // Sélection de tous les éléments de la galerie
  document.querySelectorAll("[data-gallery]").forEach(function(item){

    // Ouverture de la modale au clic sur une réalisation
    item.addEventListener("click", function(){

      // Vérifie que la modale et l'image existent
      if (!modal || !modalImage) return;

      // Récupère l'image contenue dans l'élément sélectionné
      const img = item.querySelector("img");

      // Arrête l'exécution si aucune image n'est trouvée
      if (!img) return;

      // Transmet la source de l'image à la modale
      modalImage.src = img.src;

      // Définit le texte alternatif de l'image
      modalImage.alt = img.alt || "Réalisation Côté Alu-CI SARL";

      // Affiche la fenêtre modale
      modal.classList.add("open");
    });
  });

  // ==========================================================
  // FERMETURE DE LA FENÊTRE MODALE
  // ==========================================================

  // Sélectionne les boutons de fermeture
  document.querySelectorAll(".modal-close").forEach(function(btn){

    // Ferme la modale au clic sur le bouton
    btn.addEventListener("click", function(){
      modal && modal.classList.remove("open");
    });
  });

  // Ferme également la modale lorsqu'on clique sur son arrière-plan
  if (modal) {
    modal.addEventListener("click", function(e){
      if (e.target === modal) modal.classList.remove("open");
    });
  }

  // ==========================================================
  // FORMULAIRE DE CONTACT
  // Prépare les informations du formulaire pour WhatsApp.
  // ==========================================================
  const form = document.getElementById("contactForm");

  // Vérifie que le formulaire existe sur la page.
  if (form) {

    // Interception de l'envoi classique du formulaire
    form.addEventListener("submit", function(e){

      // Empêche le rechargement de la page
      e.preventDefault();

      // Récupération et nettoyage des informations saisies
      const name = form.querySelector("[name=name]").value.trim();
      const phone = form.querySelector("[name=phone]").value.trim();
      const service = form.querySelector("[name=service]").value;
      const message = form.querySelector("[name=message]").value.trim();

      // ========================================================
      // CONSTRUCTION DU MESSAGE WHATSAPP
      // ========================================================
      const text =
        "Bonjour Côté Alu-CI SARL,\n\n" +
        "Je souhaite obtenir un devis.\n\n" +
        "Nom : " + name + "\n" +
        "Téléphone : " + phone + "\n" +
        "Service : " + service + "\n" +
        "Projet : " + message;

      // Ouverture de WhatsApp avec le message prérempli
      window.open(
        "https://wa.me/2250719913927?text=" + encodeURIComponent(text),
        "_blank",
        "noopener"
      );
    });
  }

  // ==========================================================
  // COMPTEUR ANIMÉ DES STATISTIQUES
  // ==========================================================

  // Récupération des éléments possédant l'attribut data-counter
  const counters = document.querySelectorAll("[data-counter]");

  // Vérifie que le navigateur prend en charge IntersectionObserver
  if ("IntersectionObserver" in window) {

    // Création de l'observateur permettant de détecter
    // l'apparition des compteurs à l'écran.
    const observer = new IntersectionObserver(function(entries){

      entries.forEach(function(entry){

        // Ignore les éléments qui ne sont pas encore visibles
        if (!entry.isIntersecting) return;

        // Élément actuellement visible
        const el = entry.target;

        // Récupération de la valeur cible du compteur
        const target = Number(el.dataset.counter || 0);

        // Durée de l'animation du compteur en millisecondes
        const duration = 1200;

        // Variable permettant de mémoriser le début de l'animation
        let start = null;

        // ======================================================
        // ANIMATION DU COMPTEUR
        // ======================================================
        function animate(ts){

          // Initialise le temps de départ
          if (!start) start = ts;

          // Calcule la progression de l'animation
          const progress = Math.min((ts-start)/duration, 1);

          // Affiche la valeur progressivement
          el.textContent = Math.floor(progress * target);

          // Continue l'animation jusqu'à atteindre la valeur cible
          if (progress < 1) requestAnimationFrame(animate);
        }

        // Lance l'animation
        requestAnimationFrame(animate);

        // Arrête l'observation une fois le compteur déclenché
        observer.unobserve(el);
      });

    }, {threshold:.5});

    // Active l'observation sur chaque compteur
    counters.forEach(function(c){
      observer.observe(c);
    });
  }

});