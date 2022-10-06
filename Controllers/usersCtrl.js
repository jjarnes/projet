const { response } = require('express');
const fetch = require('node-fetch');
const LocalStorage = require('node-localstorage').LocalStorage;


let localStorage = new LocalStorage('./storageToken');

exports.register = async (req, res) => {
    let reg = await fetch(`http://localhost:8030/api/users/register/`, {
    // Adding method type
    method: "POST",
    
    // Adding body or contents to send
    body: JSON.stringify({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    avatar : req.body.avatar,
    bio: req.body.bio,
    }),
    
    // Adding headers to the request
    headers: {
    "Content-type": "application/json",
    },
    })
    .then((response) => response.json())
    
    .then((json) => {
        if (json.success) {
            req.flash('success', 'créé avec succes')
            res.redirect('/login')
        }
        else {
            res.render('register', json)
        }
    })
    
    .catch((err) => console.log(err));
};

exports.login = async (req, res) => {
    let reg = await fetch(`http://localhost:8030/api/users/login/`, {

    // Adding method type
    method: "POST",
    
    // Adding body or contents to send
    body: JSON.stringify({
    email: req.body.email,
    password: req.body.password,
    }),
    
    // Adding headers to the request
    headers: {
    "Content-type": "application/json",
    },
    })
    .then((response) => response.json())
    
    .then((json) => {
        if (json.success) {
            localStorage.setItem("token", json.token);
            req.flash('success', 'connecté avec succes')
            res.redirect('/feed')
        }
        else {
            res.render('login', json)
        }
    })
    
    .catch((err) => console.log(err));
};

exports.getMe = async (req, res) => {
    let myInfo = await fetch(`http://localhost:8030/api/users/getMe/`, {
        
        // Adding headers to the request
        headers: {
            Authorization: localStorage.getItem("token"), // Token à récupérer        },
        }
        })
        const myProfil = await myInfo.json()

        res.render('profil', myProfil)
}

// exports.getUsersAll = async (req, res) => {
//     let myInfo = await fetch(`http://localhost:8030/api/users/getUsersAll/`, {
        
//         // Adding headers to the request
//         headers: {
//             Authorization: localStorage.getItem("token"), // Token à récupérer        },
//         }
//         })
//         const myProfil = await myInfo.json()

// }

exports.updateProfile = async (req, res) => {
        fetch(`http://localhost:8030/api/users/update/`, {
        // Adding method type
        method: "PUT",
        
        // Adding body or contents to send
        body: JSON.stringify({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        bio: req.body.bio,
        }),
        
        // Adding headers to the request
        headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"), //Token à récupérer
        },
        })
        // Converting to JSON
        .then((response) => response.json())
        
        
        .then((json) => {
        if (json.success) {
        res.redirect('/profil')
        } else {
        
        }
        });
};

exports.delete = async (req, res) => {
    const myInfo = await fetch(`http://localhost:8030/api/users/delete/`, {
        // Adding method type
        method: "DELETE",
        
       // Adding headers to the request
        headers: {
        Authorization: localStorage.getItem("token"), // Token à récupérer        },
    }
    })
    const myProfil = await myInfo.json()

    res.redirect('/register')
};