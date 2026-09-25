# 🃏 Crapette Magique 🃏

Ce projet est une adaptation numérique multijoueur du jeu de cartes la **Crapette**. Il a été conçu pour permettre de jouer en ligne et à distance, avec un système de salons privés.

**Jouer en ligne** : Pas encore terminé

## Règles du jeu

TODO

## Fonctionnalités
- **Matchmaking (Actuel) :** Recherche d'adversaire aléatoire avec une seule partie gérée à la fois.
- **Multijoueur par salons (À venir) :** Lancement de plusieurs parties en simultané grâce à un système de code secret (room code).
- **Mode Solo (À venir) :** Affrontez un bot dans le navigateur.

## Crédits & Ressources
- **Cartes** : [Playing Card Pack](https://kenney.nl/assets/playing-cards-pack)
- **Plateau & UI :** Plateau de jeu et espaces de cartes vides (emplacements sur le plateau de jeu, crapette, poubelle, pioche) réalisés par moi-même.

## Architecture & Fonctionnalités techniques
Ce projet suit l'architecture **MVC (Modèle-Vue-Contrôleur)** :
- **Modèle** : Gestion des données et de la logique métier.
- **Contrôleur** : Gestion des interactions et de la communication réseau.
- **Vue** : Affichage interactif pour l'utilisateur.

### Détails techniques :
- **Interaction fluide** : Système de Drag&Drop pour jouer les cartes.
- **Gestion des sessions** : Reconnexion automatique au serveur en cas de rafraîchissement de la page via `SessionStorage`.
- **Temps réel** : Synchronisation instantanée des actions et gestion des salons isolés.

### Stack Technique :
- **Frontend** : React et Vite.
- **Backend** : Node.js et Express.js.
- **Réseau** : Socket.io pour la communication WebSocket.
- **Langage** : TypeScript (Modèle/Backend) et JavaScript/TSX (Frontend).