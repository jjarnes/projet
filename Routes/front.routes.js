const express = require('express') 
const usersCtrl = require('.././Controllers/usersCtrl')
const postCtrl = require('.././Controllers/postCtrl')


exports.router = (() => {
    let appRouter = express.Router();
    
    // Users Routes

    appRouter.route('/').get((req, res) => {   res.render('home') })
    // Register
    appRouter.route('/register').get((req, res) => { res.render('register', {message:req.flash('success')}) })
    appRouter.route('/register').post(usersCtrl.register)

    // Login
    appRouter.route('/login').get((req, res) => { res.render('login',{message:req.flash('success')}) })
    appRouter.route('/login').post(usersCtrl.login)

    // Feed
    appRouter.route('/feed').get(postCtrl.getAllPosts)

    // Profil read
    appRouter.route('/profil').get(usersCtrl.getMe)
    // appRouter.route('/profil').get(usersCtrl.getUsersAll)

    appRouter.route('/profilupdate').post(usersCtrl.updateProfile)
    appRouter.route('/delete').get(usersCtrl.delete)

    // Posts Routes

    appRouter.route('/newpost').post(postCtrl.newPost)
    appRouter.route('/updatePost/:id').post(postCtrl.updatePost)
    appRouter.route('/deletePost/:id').post(postCtrl.deletePost)



    
    return appRouter;
})();