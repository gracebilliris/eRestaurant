const { verifySignUp, verifyUserUpdate } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

   app.post(
       "/api/auth/update",
       [ 
         verifyUserUpdate.checkDuplicateEmail, 
       ],
       controller.update
   );
///////////////////////////////////////////////////////////

   app.post(
       "/api/auth/ownerUpdate",
       [ 
         verifyUserUpdate.checkDuplicateEmail, 
       ],
       controller.update
   );
   
   app.post(
       "/api/auth/manageUpdate",
       [ 
         verifyUserUpdate.checkDuplicateEmail, 
       ],
       controller.update
   );
   
   app.post(
       "/api/auth/userUpdate",
       [ 
         verifyUserUpdate.checkDuplicateEmail, 
       ],
       controller.update
   );
   
   app.post(
       "/api/auth/staffUpdate",
       [ 
         verifyUserUpdate.checkDuplicateEmail, 
       ],
       controller.update
   );
///////////////////////////////////////////////////////////


  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/refreshtoken", controller.refreshToken);
};
