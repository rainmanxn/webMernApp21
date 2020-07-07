const express = require('express');
const Article = require('../../models/Article');

const router = express.Router();


router.post('/create', async (req, res) => {
  try {
    const { title, description, text, tags, userName, likes } = req.body;
    const article = new Article ({
      title,
      description,
      text,
      tags,
      userName,
      likes
    });
    await article.save();
    res.status(201).json(article)
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
  const { title, description, text, tags, userName, _id, likedUsers } = req.body;
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
        _id,
        likedUsers
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

  // res.status(201).json({ body })
})

router.patch('/edit/likes/:id', async (req, res) => {
  try {
  let { id, like, userId } = req.body;
  let likes = like + 1;

  const currentArticle = await Article.findOne({ _id: id });
  // console.log(currentArticle.likedUsers);
  // const res = currentArticle.likedUsers.indexOf(userId) === -1 ? currentArticle.likedUsers : [...currentArticle.likedUsers, userId];
  //   let res;
  // console.log(currentArticle.likedUsers.indexOf(userId));const likedUsers = [...currentArticle.likedUsers]
    let likedUsers = [...currentArticle.likedUsers]
  if (currentArticle.likedUsers.indexOf(userId) === -1) {
    likedUsers = [...likedUsers, userId]
  }
  console.log(likedUsers);
  const resp = await Article.findOneAndUpdate(
    { "_id": `${id}` },
    {
      $set: {
        likes,
        likedUsers
      }
    }
  )
  // console.log(resp);
  res
    .status(200)
    .json({ message: 'Success' });
} catch (e) {
    res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
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