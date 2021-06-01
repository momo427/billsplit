const router = require("express").Router();
const { Events, User, Memberships } = require("../models");
const withAuth = require("../utils/auth");
const nodemailer = require('nodemailer');


router.get("/", withAuth, async (req, res) => {
  try {
    // Get all events and JOIN with user data
    const eventsData = await Events.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
          through: Memberships, 
          as: 'participants' 
        },
      ],
    });

    // Serialize data so the template can read it
   const events = eventsData.map((event) => event.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render("homepage", {
      events,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/events/:id", withAuth, async (req, res) => {
  try {
    const eventsData = await Events.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
          through: Memberships, 
          as: 'participants' 
        },
      ],
    });

    const events = eventsData.get({ plain: true });

    res.render("events", {
      ...events,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/split", withAuth, (req, res) => {
 
  res.render("contact")
});




router.post("/send",withAuth, (req, res) =>{
  var output =`
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>  
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>`;


 let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ty.devspot@gmail.com',
    pass: 'Change@89'
  }
});
let mailOptions = {
  from: 'ty.devspot@gmail.com',
  to: 'monique.ferg86@gmail.com',
  subject: 'Sending Email using Node.js',
  text: output
}
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");

});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;

