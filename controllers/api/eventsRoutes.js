const router = require('express').Router();

const { Events, User, Memberships } = require('../../models');
const withAuth = require('../../utils/auth');



router.post('/', withAuth, async (req, res) => {
  try {

    const newEvents = await Events.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    
    res.status(200).json(newEvents);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/', withAuth, async (req, res) => {
  try {
    const eventData = await Events.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!eventData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(eventData);//Mike
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;

// router.get('/', (req, res) => {
//   Events.findAll({
//     include: [
//       {
//         model: User,
//         through: Memberships,
//         as: 'participants'
//       },
//     ],
//   })
//   .then((eventData) => res.render("handlebarname", eventData))//res.render takes .json array and renders info through handlebars
//   .catch((err) => {
//     console.log(err);
//     res.status(500).json(err)
//   })
// })
