const User = require('../model/user.model.js');
const {getUser,setUser} = require('../service/auth.service.js');

async function handleUserSignUp (req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.render('login')
}

async function handleUserLogin (req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) {
        return res.status(401).render('login', {
            error : 'User not found'
        });
    }

    if (user.password === password) {
        const token = setUser(user);
        res.cookie('sessionID', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 10 * 60 * 1000)
        });
        req.user = getUser(token);
        return res.redirect('/pages');
    } else {
        return res.status(404).render('login', {
            error: 'Incorrect email or password'
        });
    }
}

module.exports = {handleUserSignUp, handleUserLogin};