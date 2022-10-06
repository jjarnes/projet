const fetch = require('node-fetch');
const LocalStorage = require('node-localstorage').LocalStorage;


let localStorage = new LocalStorage('./storageToken');




exports.getAllPosts = async (req, res) => {
    let me = await fetch(`http://localhost:8030/api/users/getMe/`, {
        
        // Adding headers to the request
        headers: {
            Authorization: localStorage.getItem("token"), // Token à récupérer        },
        }
        })
        myMe = await me.json()

        let user = await fetch(`http://localhost:8030/api/users/getUsersAll/`, {
        
        // Adding headers to the request
        headers: {
            Authorization: localStorage.getItem("token"), // Token à récupérer        },
        }
        })
        myUsers = await user.json()

        let post = await fetch(`http://localhost:8030/api/posts/all/`, {
        
        // Adding headers to the request
        headers: {
            Authorization: localStorage.getItem("token"), // Token à récupérer        },
        }
        })
        myPosts = await post.json()

        if (myPosts && myMe && myUsers)
        
        res.render('feed', {myMe, myUsers, myPosts,message:req.flash('success')})
}

exports.newPost = async (req, res) => {
            let reg = await fetch(`http://localhost:8030/api/posts/new/`, {
            // Adding method type
            method: "POST",
            
            // Adding body or contents to send
            body: JSON.stringify({
            title: req.body.title,
            text: req.body.text,
            }),
            
            // Adding headers to the request
            headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("token"),
            },
            })
            .then((response) => response.json())
            
            .then((json) => {
                if (json.success) {
                    req.flash('success', 'Publication envoyé avec success')
                    res.redirect('/feed')
                }
                else {
                    // res.render('/feed', json)
                }
            })
            
            .catch((err) => console.log(err));
};

exports.updatePost = async (req, res) => {
    fetch(`http://localhost:8030/api/posts/update/${req.params.id}`, {
    // Adding method type
    method: "PUT",
    
    // Adding body or contents to send
    body: JSON.stringify({
    title: req.body.title,
    text: req.body.text,
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
            req.flash('success', 'Publication modifié avec success')
            res.redirect('/feed')
        } else {
        
        }
    });
};

exports.deletePost = async (req, res) => {
    const myInfo = await fetch(`http://localhost:8030/api/posts/delete/${req.params.id}`, {
        // Adding method type
        method: "DELETE",
        
       // Adding headers to the request
        headers: {
        Authorization: localStorage.getItem("token"), // Token à récupérer        },
    }
    })
    myPost = await myInfo.json()

    req.flash('success', 'Publication supprimé avec success')
    res.redirect('/feed')
};