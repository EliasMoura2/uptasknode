const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  sequelize.sync({ force: true })
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(error => console.error(error.message));
});