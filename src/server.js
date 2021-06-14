const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0'

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  sequelize.sync({ force: false })
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(error => console.error(error.message));
});