const express = require('express');
const Article = require('../../models/Article');

const router = express.Router();


router.post('/create', async (req, res) => {
  try {
    const { title, description, text, skills } = req.body;
    const article = new Article ({
      title,
      description,
      text,
      skills
    });
    await article.save();
    res.status(201).json({ message: 'Статья создан' })
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
})

// router.get('/articles', async (req, res) => {
//
// })

module.exports = router;