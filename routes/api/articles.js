const express = require('express');
const Article = require('../../models/Article');

const router = express.Router();


router.post('/create', async (req, res) => {
  try {
    const { title, description, text, tags, userName } = req.body;
    const article = new Article ({
      title,
      description,
      text,
      tags,
      userName
    });
    await article.save();
    res.status(201).json({ message: 'Статья создан' })
  } catch (e) {
    res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
})

router.get('/articles', async (req, res) => {
  try {
      const articles = await Article.find();
      res.status(200).json({ articles })

  } catch (e) {
    res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
})

router.patch('/edit/:id', async (req, res) => {
  const { title, description, text, tags, userName, _id } = req.body;
try {
  const resp = await Article.findOneAndUpdate(
    { "_id": `${_id}` },
    {
      $set: {
        title,
        description,
        text,
        tags,
        userName,
        _id
      }
    }
  )
  res
    .status(200)
    .json({ message: 'Success' });
} catch (e) {
  res
    .status(500)
    .json({ message: 'Что-то пошло не так, попробуйте снова' });
}
  console.log(_id);
  console.log(resp);
  // res.status(201).json({ body })
})

router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const resp = await Article.deleteOne({ "_id": id })
    res
      .status(200)
      .json(resp);
  } catch (e) {
    res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
})

module.exports = router;