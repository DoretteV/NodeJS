module.exports = (req, res) => {
    //destroy all session data incl. session user id
  req.session.destroy(() => {
    res.redirect("/");
  });
};
