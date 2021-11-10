'use strict';
const express = require('express');
const serverless = require('serverless-http');
const exp = express();
const bodyParser = require('body-parser');

let directors = [
  {
    "id": 1,
    "name": "Anthony Russo",
    "image_src": "https://images.moviefit.me/p/o/2872-anthony-russo.jpg",
    "biography": "Anthony Russo (nacido el 3 de febrero de 1970) es un director estadounidense. Él co-dirigió Captain America: The Winter Soldier, Captain America: Civil War, Avengers: Infinity War y Avengers: Endgame junto con su hermano, Joe Russo."
  },
  {
    "id": 2,
    "name": "Joe Russo updated",
    "image_src": "https://mx.web.img3.acsta.net/pictures/15/11/24/17/01/231901.jpg",
    "biography": "Joseph \"Joe\" Russo (nacido el 18 de julio de 1971) es un director estadounidense. Él co-dirigió Captain America: The Winter Soldier, Captain America: Civil War, Avengers: Infinity War y Avengers: Endgame junto con su hermano, Anthony Russo."
  },
  {
    "id": 3,
    "name": "Chad Stahelski",
    "image_src": "https://m.media-amazon.com/images/M/MV5BNjgwNzc0NTc2Nl5BMl5BanBnXkFtZTgwMjM0NzEzMDI@._V1_.jpg",
    "biography": "Chad Stahelski es un director de cine y doble de riesgo estadounidense, reconocido por dirigir la trilogía de John Wick.​​​ Stahelski además ofició como doble de Brandon Lee tras el accidente que le costó la vida al actor durante el rodaje de la película The Crow."
  },
  {
    "id": 4,
    "name": "David Leitch",
    "image_src": "https://images.moviefit.me/p/o/4740-david-leitch.jpg",
    "biography": "David Leitch es un director de cine, coordinador de escenas de riesgo, director de segunda unidad, especialista de cine, productor y actor estadounidense."
  },
  {
    "id": 5,
    "name": "Chris Miller",
    "image_src": "https://m.media-amazon.com/images/M/MV5BMTAzNDAzODgzOTheQTJeQWpwZ15BbWU3MDc5MDg4MTg@._V1_.jpg",
    "biography": "Christopher Robert Miller, también conocido como Christopher Miller o Chris Miller, es un director, productor y guionista de cine estadounidense. Más conocido por haber dirigido las películas de 21 Jump Street y The Lego Movie junto a su amigo Phil Lord."
  },
  {
    "id": 6,
    "name": "Michael Bay",
    "image_src": "https://m.media-amazon.com/images/M/MV5BMTc2NzcyMDU5NV5BMl5BanBnXkFtZTcwODc1OTM0NA@@._V1_.jpg",
    "biography": "Michael Benjamin Bay ​ es un cineasta estadounidense conocido por dirigir y producir películas de acción de gran presupuesto caracterizadas por su corte rápido y el uso extensivo de efectos especiales, incluyendo frecuentemente explosiones."
  },
  {
    "id": 7,
    "name": "Ruben Fleischer",
    "image_src": "https://m.media-amazon.com/images/M/MV5BMTc0NDU5MDc1NF5BMl5BanBnXkFtZTcwMDY0MTM5OA@@._V1_.jpg",
    "biography": "Ruben Samuel Fleischer ​ es un director y productor de cine estadounidense que reside en la ciudad de Los Ángeles. Obtuvo reconocimiento al dirigir Zombieland, su primer largometraje.​ Otros de sus largometrajes incluyen 30 Minutes or Less, Gangster Squad y Venom."
  }
];

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
  res.json(directors);
})

app.get('/:id', (req, res) => {
  let director = directors.find(i => i.id == req.params.id);
  if (director == undefined) {
    res.status(404).send('Director not found');
  }
  else {
    res.json(director);
  }
})

app.post('/', (req, res) => {
  req.body.data.id = directors.length + 1;
  directors.push(req.body.data);
  res.status(200).send('Movie created');
})

app.put('/', (req, res) => {
  let index = directors.findIndex(i => i.id == req.body.data.id);
  if (index == -1) {
    res.status(404).send('Director not found');
  }
  else {
    directors[index] = req.body.data;
    res.status(200).send('Movie updated');
  }
})

app.delete('/:id', (req, res) => {
  let index = directors.findIndex(i => i.id == req.params.id);
  if (index == -1) {
    res.status(404).send('Director not found');
  }
  else {
    directors = directors.filter(i => i.id != req.params.id);
    res.status(200).send('Director deleted');
  }
})

exp.use(bodyParser.json());
exp.use('/.netlify/functions/directors', app);

module.exports = exp;
module.exports.handler = serverless(exp);