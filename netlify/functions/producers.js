'use strict';
const express = require('express');
const serverless = require('serverless-http');
const exp = express();
const bodyParser = require('body-parser');

let producers = [
  {
    "id": 1,
    "name": "Marvel Studios",
    "description": "Marvel Studios, LLC​ es un estudio cinematográfico estadounidense que tiene su sede en los Walt Disney Studios de Burbank, el estudio es una filial de The Walt Disney Company. Marvel Studios es conocido por producir el Universo cinematográfico de Marvel, basado en los personajes de Marvel Comics.​",
    "image_src": "https://www.lacasadeel.net/wp-content/uploads/2021/07/MarvelStudios.jpg",
    "movies": [
      {
        "id": 1
      }
    ]
  },
  {
    "id": 2,
    "name": "Walt Disney Pictures",
    "description": "Walt Disney Pictures​ ​ es un estudio de producción cinematográfico estadounidense y filial de Walt Disney Studios, propiedad de The Walt Disney Company.",
    "image_src": "https://i.ytimg.com/vi/sSlax9zAXLQ/maxresdefault.jpg",
    "movies": [
      {
        "id": 1
      }
    ]
  },
  {
    "id": 3,
    "name": "Summit Entertainment",
    "description": "Summit Entertainment es un estudio de cine estadounidense dedicado al desarrollo, financiación, producción y distribución de películas de cine.",
    "image_src": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Summit_Entertainment.jpg",
    "movies": [
      {
        "id": 2
      }
    ]
  },
  {
    "id": 4,
    "name": "Thunder Road Pictures",
    "description": "Thunder Road Films es una compañía de financiación y producción de cine y televisión fundada por Basil Iwanyk. Tiene su sede en Santa Mónica, California.",
    "image_src": "https://d2kjfw7r4xcwtw.cloudfront.net/admin/2c0098ac-b46e-5631-ac37-927185475381.jpg",
    "movies": [
      {
        "id": 2
      }
    ]
  },
  {
    "id": 5,
    "name": "DreamWorks Animation",
    "description": "DreamWorks Animation SKG, Inc. es un estudio de animación estadounidense filial de Universal Pictures, una subsidaria de NBCUniversal, que es propiedad total de Comcast, que produce principalmente películas y series animadas por ordenador.",
    "image_src": "https://www.marketingdirecto.com/wp-content/uploads/2016/04/DreamWorks.jpg",
    "movies": [
      {
        "id": 3
      }
    ]
  },
  {
    "id": 6,
    "name": "Paramount Pictures Studios",
    "description": "Paramount Pictures Corporation es una compañía productora y distribuidora de cine, con sede en Hollywood. Es propiedad de ViacomCBS y anteriormente de Gulf+Western. Fue fundada el 8 de mayo de 1912.",
    "image_src": "https://cdn.britannica.com/76/103076-050-8718A416/logo-Paramount-Pictures-2002.jpg",
    "movies": [
      {
        "id": 4
      }
    ]
  },
  {
    "id": 7,
    "name": "Columbia Pictures",
    "image_src": "https://i.pinimg.com/originals/09/fc/c3/09fcc38492ca4a9e93ec3ad43b7854ca.jpg",
    "description": "Columbia Pictures Industries, Inc. es un estudio de cine estadounidense y una compañía de Sony Pictures Motion Picture Group, ​ una división de Sony Pictures de Sony Entertainment, que a su vez es subsidiaria del conglomerado multinacional japonés Sony Corporation."
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
  res.json(producers);
})

app.get('/:id', (req, res) => {
  let producer = producers.find(i => i.id == req.params.id);
  if (producer == undefined) {
    res.status(404).send('Producer not found');
  }
  else {
    res.json(producer);
  }
})

app.post('/', (req, res) => {
  req.body.data.id = producers.length + 1;
  producers.push(req.body.data);
  res.status(200).send('Producer created');
})

app.put('/', (req, res) => {
  let index = producers.findIndex(i => i.id == req.body.data.id);
  if (index == -1) {
    res.status(404).send('Producer not found');
  }
  else {
    producers[index] = req.body.data;
    res.status(200).send('Producer updated');
  }
})

app.delete('/:id', (req, res) => {
  let index = producers.findIndex(i => i.id == req.params.id);
  if (index == -1) {
    res.status(404).send('Producer not found');
  }
  else {
    producers = producers.filter(i => i.id != req.params.id);
    res.status(200).send('Producer deleted');
  }
})

exp.use(bodyParser.json());
exp.use('/.netlify/functions/producers', app);

module.exports = exp;
module.exports.handler = serverless(exp);