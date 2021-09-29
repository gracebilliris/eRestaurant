const config = require("../config/auth.config");
const db = require("../models");
const { user: User, role: Role, booking: Booking, refreshToken: RefreshToken} = db;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// create new User in database, role is user if not specified
exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

// find username of the request in database, if it exists
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

	    // compare password with password in database using bcrypt, if it is correct
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

	    // generate a token using jsonwebtoken
      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });

      let refreshToken = await RefreshToken.createToken(user);

      let authorities = [];

	    // return user information & access Token
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
        refreshToken: refreshToken,
      });
    });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    // get the Refresh Token from request data
    // get the RefreshToken object {id, user, token, expiryDate} from raw Token using RefreshToken model static method
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    // verify the token (expired or not) basing on expiryDate field
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();

 	    // If the Refresh Token was expired, remove it from MongoDB database and return message
       res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    // Continue to use user._id field of RefreshToken object as parameter to generate new Access Token using jsonwebtoken library
    let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    // Return { new accessToken, refreshToken } if everything is done
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    // else send error message
    return res.status(500).send({ message: err });
  }
};

exports.update = (req, res) => {
	console.log('username:'+req.body.username);
	console.log('email:'+req.body.email);
	console.log('password:'+req.body.password);
	var setInfo = { "email": req.body.email};
	if(req.body.password){
		setInfo =  {
        		"email": req.body.email,
			"password":bcrypt.hashSync(req.body.password, 8)
      		}
	}else{
		console.log('password not change');
	}
  User.findOneAndUpdate(
    { username: req.body.username },
    { 
      $set: setInfo
    },
    {new: false, useFindAndModify: false}
  ).exec((err, user) => {
    if(err){
      res.status(500).send({ message: err });
      return;
    }
    if(user){
      res.status(500).send({ message: 'User details updated successfully!' });
    }
  })
};
