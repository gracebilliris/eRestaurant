exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.staffBoard = (req, res) => {
    res.status(200).send("Staff Content.");
  };
  
  exports.managerBoard = (req, res) => {
    res.status(200).send("Manager Content.");
  };
  
  exports.ownerBoard = (req, res) => {
    res.status(200).send("Owner Content.");
  };