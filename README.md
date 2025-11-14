# SpaceVoyager Booking System

## Description
SpaceVoyager est une application web permettant aux utilisateurs de réserver des voyages spatiaux. Elle affiche les réservations existantes sous forme de cartes, avec la possibilité de consulter un ticket imprimable pour chaque réservation. Les utilisateurs doivent se connecter pour accéder aux réservations et aux fonctionnalités.

## Fonctionnalités
- Page de **login** pour authentifier les utilisateurs.
- Affichage de toutes les réservations de l'utilisateur sous forme de **cartes interactives**.
- Affichage des informations de réservation : destination, date, prix, et liste des passagers.
- **Bouton "View Ticket"** sur chaque réservation :
  - Ouvre un ticket bien formaté dans une nouvelle fenêtre.
  - Possibilité d’imprimer le ticket directement via `window.print()`.
- Responsive : les cartes s'affichent en **grille 1 ou 2 colonnes** selon la taille de l'écran.
- Stockage des données dans le **LocalStorage** du navigateur pour persistance simple.

## Technologies utilisées
- **HTML5 / CSS3**
- **Tailwind CSS** pour le style et les animations.
- **JavaScript** pour la logique (affichage des réservations, tickets imprimables, LocalStorage).

## Structure du projet
