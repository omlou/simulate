### Langue

* [English](https://github.com/omlou/simulate#readme)
* [简体中文](https://github.com/omlou/simulate/blob/master/docs/md/readme-zh.md)
* [日本語](https://github.com/omlou/simulate/blob/master/docs/md/readme-ja.md)
* [한국어](https://github.com/omlou/simulate/blob/master/docs/md/readme-ko.md)
* [Français](https://github.com/omlou/simulate/blob/master/docs/md/readme-fr.md)

### Introduction

* Un outil purement frontend pour simuler les interfaces API backend.
* Prise en charge des requêtes XMLHttpRequest et fetch.
* Peut être utilisé dans des projets Node.js après avoir été regroupé.

### Utilisation

#### Utilisation de balises de script

```html
<script src="https://unpkg.com/@xlou/simulate@1.0.8/dist/umd/simulate.min.js"></script>
<!-- Il est recommandé de le télécharger localement et de l'utiliser -->
<script>
  /* Après avoir inclus ce fichier JS, un objet Simulate sera assigné à la fenêtre */
  Simulate.serve({
    "/updateById": {
      type: 'post',
      response({ data }) {
        return {
          code: 200,
          data: {
            id: data.id
          }
        };
      }
    }
  });
</script>
```

#### Utilisation dans Node.js et des projets modulaires

Installation

```bash
npm i @xlou/simulate -S
```

Importation

```javascript
import { serve } from '@xlou/simulate';

serve({
  "/getById": {
    type: 'get',
    response({ params }) {
      return {
        code: 200,
        data: {
          id: params.id
        }
      };
    }
  },
  "/updateById": {
    type: 'post',
    response({ data }) {
      return {
        code: 200,
        data: {
          id: data.id
        }
      };
    }
  });
```

### API

#### serve

Définir des interfaces API.

```typescript
interface SetConfig {
  getConfig: () => SimulateConfig;
  setConfig: (obj: SimulateConfig) => void;
}
interface SimulateConfig {
  wait: number;
}
const serve: ((obj: object) => void) | SetConfig;
```

Utilisation

```js
/* Configurer des interfaces API */
serve({
  "/getById": { // Définir le chemin de la requête
    type: 'get', // Définir le type de requête, par exemple, post, get
    response({ url, type, params, data }) {
      /* 
        Vous pouvez accéder aux paramètres de la requête via les paramètres d'entrée
        url : URL de la requête
        type : Type de requête
        params : Paramètres d'URL de la requête
        data : Paramètres du corps de la requête (généralement disponibles pour les requêtes POST)
      */
    }
  }
});

/* Interroger et configurer Simulate */
serve.setConfig({
  wait: 1000 // Définir le temps de réponse pour les requêtes à 1 seconde
});
serve.getConfig(); // Obtenir des informations de configuration
// { wait: 1000 }
```

#### int

Générer un entier aléatoire avec un nombre de chiffres spécifié.

`int: (n: string | number) => number`

```js
int(3); // Générer un entier aléatoire avec 3 chiffres
```

#### fixed

Générer un nombre décimal aléatoire avec la possibilité de spécifier le nombre de chiffres entiers et décimaux. Le nombre par défaut de chiffres décimaux est de 2.

`fixed: (n: string | number, f?: string | number) => string`

```js
fixed(8, 3); // Générer un nombre décimal aléatoire avec 8 chiffres entiers et 3 chiffres décimaux
```

#### id

Générer une chaîne aléatoire unique et non répétée.

`id: () => string`

```js
id();
```

#### img

Générer une image de grille aléatoire et la renvoyer au format Base64. Vous pouvez spécifier la largeur, la hauteur et la couleur. Si la largeur et la hauteur ne sont pas spécifiées, elles sont par défaut à 512, et la couleur est générée de manière aléatoire.

`img: (width?: number, height?: number, color?: string) => string`

```js
img(256, 256, '#f00'); // La couleur prend en charge les chaînes hexadécimales et les chaînes de fonction RGB
```

![img()](https://github.com/omlou/simulate/assets/73682875/34e30e69-923c-4f40-8a31-f33d57713a36)