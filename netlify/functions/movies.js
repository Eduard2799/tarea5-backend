'use strict';
const express = require('express');
const serverless = require('serverless-http');
const exp = express();
const bodyParser = require('body-parser');

let movies = [
  {
    "id": 1,
    "title": "Avengers: Endgame",
    "year": 2019,
    "duration": "3h 1min",
    "description": "Después de que Thanos haya aniquilado a la mitad del universo, los Vengadores supervivientes deben hacer todo lo posible por deshacer tal atrocidad.",
    "genere": [
      "Acción",
      "Aventura",
      "Drama"
    ],
    "image_src": "https://play-lh.googleusercontent.com/XDg-bt655am_Q-7X-I0s64Kq8SJKfb7BBTHkUVbFR6-zDNv9J7rW61xZn0BB3SVCJ6gz",
    "directors": [
      {
        "id": 1,
        "name": "Anthony Russo"
      },
      {
        "id": 2,
        "name": "Joe Russo"
      }
    ],
    "producers": [
      {
        "id": 1,
        "name": "Marvel Studios"
      },
      {
        "id": 2,
        "name": "Walt Disney Pictures"
      }
    ]
  },
  {
    "id": 2,
    "title": "John Wick",
    "year": 2014,
    "duration": "1h 41min",
    "description": "Un ex asesino a sueldo suspende su jubilación para localizar a los mafiosos que mataron a su perro y le quitaron todo.",
    "genere": [
      "Acción",
      "Crimen",
      "Thriller"
    ],
    "image_src": "https://es.web.img3.acsta.net/pictures/14/10/01/14/18/135831.jpg",
    "directors": [
      {
        "id": 3,
        "name": "Chad Stahelski"
      },
      {
        "id": 4,
        "name": "David Leitch"
      }
    ],
    "producers": [
      {
        "id": 3,
        "name": "Summit Entertainment"
      },
      {
        "id": 4,
        "name": "Thunder Road Pictures"
      }
    ]
  },
  {
    "id": 3,
    "title": "El gato con botas",
    "year": 2011,
    "duration": "1h 30min",
    "description": "Un gato forajido, su amigo de la infancia y una seductora gatita ladrona, parten en busca de los huevos de oro de una legendaria gansa para limpiar su nombre, restaurar su honor perdido y recuperar la confianza de su madre y del pueblo.",
    "genere": [
      "Acción",
      "Aventura",
      "Comedia"
    ],
    "image_src": "https://es.web.img3.acsta.net/medias/nmedia/18/84/34/57/19816291.jpg",
    "directors": [
      {
        "id": 5,
        "name": "Chris Miller"
      }
    ],
    "producers": [
      {
        "id": 5,
        "name": "DreamWorks Animation"
      }
    ]
  },
  {
    "id": 4,
    "title": "Transformers: El último caballero",
    "year": 2017,
    "duration": "2h 34min",
    "description": "Autobots y decepticons están en guerra, mientras los humanos se mantienen al margen. Optimus Prime se ha ido. La clave para salvar el futuro está enterrada en los secretos del pasado, en la historia oculta de los transformers en la Tierra.",
    "genere": [
      "Acción",
      "Aventura",
      "Ciencia fición"
    ],
    "image_src": "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/b44e2937ec042809b01ef60f63ba1a44bd10f52201ca09ccfd8aa3396000aabe._RI_V_TTW_.jpg",
    "directors": [
      {
        "id": 6,
        "name": "Michael Bay"
      }
    ],
    "producers": [
      {
        "id": 6,
        "name": "Paramount Pictures Studios"
      }
    ]
  },
  {
    "id": 5,
    "title": "Venom",
    "year": 2018,
    "duration": "2h 20m",
    "description": "El periodista Eddie Brock intenta desenmascarar al genio científico Carlton Drake, el célebre fundador de la Fundación Vida.",
    "genere": [
      "Acción",
      "Ciencia ficción",
      "Super héroes"
    ],
    "image_src": "https://es.web.img3.acsta.net/pictures/18/09/18/16/30/4389164.jpg",
    "directors": [
      {
        "id": 7,
        "name": "Ruben Fleischer"
      }
    ],
    "producers": [
      {
        "id": 7,
        "name": "Columbia Pictures"
      }
    ]
  },
  {
    "id": 6,
    "title": "Black Widow",
    "year": 2021,
    "duration": "2h 13m",
    "description": "Una peligrosa conspiración, relacionada con su pasado, persigue a Natasha Romanoff, también conocida como Viuda Negra. La agente tendrá que lidiar con las consecuencias de haber sido espía, así como con las relaciones rotas, para sobrevivir.",
    "genere": [
      "Acción",
      "Aventura",
      "Ciencia ficción"
    ],
    "image_src": "https://lumiere-a.akamaihd.net/v1/images/blueb_007d_g_spa-ar_70x100_43a5cf52.jpeg",
    "directors": [
      {
        "id": 1,
        "name": "Anthony Russo"
      },
      {
        "id": 2,
        "name": "Joe Russo"
      }
    ],
    "producers": [
      {
        "id": 1,
        "name": "Marvel Studios"
      },
      {
        "id": 2,
        "name": "Walt Disney Pictures"
      }
    ]
  }
]

const app = express.Router();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Content-Type', 'application/json');
  next();
});


app.get('/', (req, res) => {
  res.json(movies);
})

app.get('/:id', (req, res) => {
  let movie = movies.find(i => i.id == req.params.id);
  if (movie == undefined) {
    res.status(404).send('Movie not found');
  }
  else {
    res.json(movie);
  }
})

app.get('/director/:id', (req, res) => {
  let directorMovies = [];
  movies.forEach(m => {
    m.directors.forEach(d => {
      if (d.id == req.params.id) {
        directorMovies.push(m);
      }
    })
  });
  res.json(directorMovies);
})

app.get('/producer/:id', (req, res) => {
  let producerMovies = [];
  movies.forEach(m => {
    m.producers.forEach(p => {
      if (p.id == req.params.id) {
        producerMovies.push(m);
      }
    })
  });
  res.json(producerMovies);
})

app.post('/', (req, res) => {
  req.body.id = movies.length + 1;
  movies.push(req.body);
  res.status(200).send('Movie created');
})

app.put('/', (req, res) => {
  let index = movies.findIndex(i => i.id == req.body.data.id);
  if (index == -1) {
    res.status(404).send('Movie not found');
  }
  else {
    movies[index] = req.body.data;
    res.status(200).send('Movie updated');
  }
})

app.delete('/:id', (req, res) => {
  let index = movies.findIndex(i => i.id == req.params.id);
  if (index == -1) {
    res.status(404).send('Movie not found');
  }
  else {
    movies = movies.filter(i => i.id != req.params.id);
    res.status(200).send('Movie deleted');
  }
})

exp.use(bodyParser.json());
exp.use('/.netlify/functions/movies', app);

module.exports = exp;
module.exports.handler = serverless(exp);