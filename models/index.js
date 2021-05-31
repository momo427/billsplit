const User = require('./User');
const Events = require('./Events');
const Memberships = require('./Memberships');



// User.associate = (models) => {
  User.belongsToMany(Events, {
    through: {
      model: Memberships,
      unique: false
    },
      as: 'memberships',
      foreignKey: 'user_id'
  });
// };

// Events.associate = (models) => {
  Events.belongsToMany(User, {
    through: {
      model: Memberships,
      unique: false
    },
      as: 'participants',
      foreignKey: 'events_id'
  });
// };


module.exports = { User, Events, Memberships };




// // User.associate = (models) => {
//   User.belongsToMany(Events, {
//     through: 'Memberships',
//     as: 'User',
//     foreignKey: 'userId'
//   });
// // };

// // Events.associate = (models) => {
//   Events.belongsToMany(User, {
//     through: 'Memberships',
//     as: 'Events',
//     foreignKey: 'eventsId'
//   });
// // };

//   User.hasMany(Events, {
//     foreignKey: 'user_id' //can be creator_id. doesn't have to be user_id
//   }) //in the routes, will need an "include"