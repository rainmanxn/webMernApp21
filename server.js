const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const articles = require('./routes/api/articles');

const app = express();

const cors = require('cors');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(cors());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => console.log('MongoDB successfully connected'))
//   .catch((err) => console.log(err));

// Passport middleware
// app.use(passport.initialize());
// // Passport config
// require('./config/passport')(passport);
// Routes
app.use('/api/users', users);
app.use('/api/articles', articles);
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server up and running on port ${PORT} !`));

async function start() {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    // Если все хорошо, то подключаюсь к монго. Это промис. Первым параметром URL по которому будет отправлять в БД
    // Вторым параметром передается набор опций
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1); // остановка сервера. Завершение процесса в случае,если что-тьо пошло не так.
  }
}

start();
