module.exports = (req, res) =>{
    if(req.session.userId){
    return res.render('create');    //create.ejs will be displayed
    }
    res.redirect('.auth/login');
}