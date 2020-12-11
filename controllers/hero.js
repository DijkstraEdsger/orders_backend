const Hero = require("../models/hero");

exports.getHeros = (req, res, next) => {
  Hero.findAll()
    .then((heros) => {
      res.status(200).json({ heros: heros });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getHero = (req, res, next) => {
  const heroId = req.params.heroId;
  Hero.findByPk(heroId)
    .then((hero) => {
      if (!hero) {
        res.status(404).json({ message: "Hero not found!" });
      }
      res.status(200).json({ hero: hero });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createHero = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const image = req.body.image;

  Hero.create({
    name: name,
    email: email,
    image: image,
  })
    .then((hero) => {
      res
        .status(201)
        .json({ message: "Hero created succesfully!", hero: hero });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateHero = (req, res, next) => {
  const heroId = req.params.heroId;
  const name = req.body.name;
  const email = req.body.email;
  const image = req.body.image;

  Hero.findByPk(heroId)
    .then((hero) => {
      if (!hero) {
        res.status(404).json({ message: "Hero not found!" });
      }
      hero.name = name;
      hero.email = email;
      hero.image = image;
      return hero.save();
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Hero updated succesfully", hero: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteHero = (req, res, next) => {
  const heroId = req.params.heroId;

  Hero.findByPk(heroId)
    .then((hero) => {
      if (!hero) {
        res.status(404).json({ message: "Hero not found!" });
      }
      return hero.destroy();
    })
    .then((result) => {
      res.status(200).json({ message: "Hero deleted succesfully!" });
    })
    .catch((err) => {
      console.log(err);
    });
};
