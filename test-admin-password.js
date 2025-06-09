const bcrypt = require('bcryptjs');

const inputPassword = 'Kirilser02'; // сюда введи ПАРОЛЬ, который ты пробуешь
const storedHash = '$2a$10$K7l3xgFQRzZq6nQO9cDpUuVZ8sT7vWfLjYRrS7mXwPnIiJd1oHtCO'; // хэш из БД

bcrypt.compare(inputPassword, storedHash).then(result => {
  console.log('Пароль совпадает?', result);
});