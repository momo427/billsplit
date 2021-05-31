const router = require("express").Router();
const { Events, User, Memberships } = require("../models");
const withAuth = require("../utils/auth");

router.get("/events", withAuth, (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render("events", {
        logged_in: req.session.logged_in,
      });
      return;
    }
    res.redirect("/profile");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Events,
         through: Memberships, 
         as: 'memberships' 
         }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
  
module.exports = router;
