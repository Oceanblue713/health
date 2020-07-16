const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

router.post("/register", async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    
    if(user.rows.length !== 0) {
      return res.status(401).send("User already exist");
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword])

    // res.json(newUser.rows[0].id);

    const token = jwtGenerator(newUser.rows[0].id);

    res.json({token});

  } catch(err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;