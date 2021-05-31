const sequelize = require('../config/connection');
const { User, Events, Memberships } = require('../models');

const userData = require('./userData.json');
const eventsData = require('./eventsData.json');
const membershipsData = require('./membershipsData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  for (const events of eventsData) {
  await Events.create({
    ...events,
    events_id: user[Math.floor(Math.random() * user.length)].id,
  });
}
  

  process.exit(0);
};

seedDatabase();


