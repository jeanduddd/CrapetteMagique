# 🃏 Crapette Magique 🃏

Ce projet est une adaptation numérique multijoueur du jeu de cartes la **Crapette**. Il a été conçu pour permettre de jouer en ligne et à distance, avec un système de salons privés, sur pc ou sur mobile.

[**Jouer en ligne**](https://crapettemagique.onrender.com)

## 📖 Règles de la Crapette

**But du jeu**<br>
Ce jeu se joue en 1 contre 1, au tour par tour. Chaque joueur possède son propre jeu de 52 cartes (aucun doublon dans les piles). Le vainqueur est le premier à vider entièrement toutes ses cartes.

**🗺️ Le Plateau de Jeu**<br>
- Les 8 Colonnes situées aux extrémités. Vous pouvez y placer des cartes en alternant les couleurs (Rouge/Noir) et en descendant d'une valeur (ex: un 8 ♥️ sur un 9 ♣️).
    - Règle spéciale : Si une colonne est vide, n'importe quelle carte peut y être placée.
    - Les cartes du plateau ne peuvent être déplacées qu'une par une.
- Les 8 piles situées au centre. Les séries se construisent de l'As au Roi, en respectant le même symbole (♠️♥️♣️♦️).
    - Règle spéciale : Une carte placée au centre est verrouillée et ne peut plus revenir sur le plateau.

**🃏 Vos Piles**<br>
Chaque joueur possède 3 tas devant lui :
1. La Crapette (Gauche) : Votre priorité absolue. Si la carte au sommet peut être jouée, vous devez la jouer.
2. La Pioche (Droite) : Si la Crapette est bloquée, vous retournez une carte d'ici. Si elle ne peut pas être jouée, elle va dans la défausse et votre tour se termine.
3. La Défausse (Milieu) : Pendant votre tour, vous avez le droit de jouer au maximum une carte issue de cette pile.

**⚔️ Attaquer l'adversaire**<br>
Vous pouvez bloquer votre adversaire en plaçant vos cartes directement sur sa Crapette ou sa Défausse.
- Condition : La carte doit être du même symbole et d'une valeur voisine (+1 ou -1).


**🚨 La Règle de la "CRAPETTE !"**<br>
La Crapette est prioritaire. Si vous retournez une carte de votre pioche alors que vous pouviez jouer votre Crapette (directement, ou en déplaçant des cartes sur le plateau pour lui faire de la place), vous êtes en faute !

L'adversaire peut alors appuyer sur le bouton "CRAPETTE !". Si la faute est avérée, votre tour s'interrompt instantanément. (Cette pénalité ne s'applique plus si votre tas de Crapette est vide).

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