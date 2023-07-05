const User = require("../models/user");

const getPreferences = (req, res) => {
  const userId = req.params.userId;

  User.findById(userId)
    .select("preference")
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found",
        });
      }

      return res.status(200).send({
        preference: user.preference,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err,
      });
    });
};

const updatePreferences = (req, res) => {
  const userId = req.params.userId;
  const newPreferences = req.body.preferences;

  User.findByIdAndUpdate(userId, { preference: newPreferences })
    .then(() => {
      return res.status(200).send({
        message: "Preferences updated successfully",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err,
      });
    });
};

module.exports = { getPreferences, updatePreferences };
