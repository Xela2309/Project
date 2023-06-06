import React, { useEffect, useState } from "react";
import Navigation from "../Components/nav";
import Axios from "axios";
import { useHistory } from "react-router";

const Accueil = () => {

    const [allPosts,setAllPosts] = useState(null);

    const url = 'http://localhost:3001/posts';
    let data = null;
    const historique = useHistory();
    const token = localStorage.getItem('token');


    // RECUPERATION DE TOUTES LES DONNEES
    useEffect(() => {

        if(!token) {
            historique.push('/error');
        } else {

            Axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    data = res.data.data;
                    const userId = res.data.userId;
                    const isAdmin = res.data.isAdmin;

                    
                    setAllPosts(data.map((post) => (
                        <div className="post">
                                {/* user */}
                                <div className="post__user">
                                    <div className="user_container">
                                        {post.user.imageUrl ? (<img src={post.user.imageUrl} className="user_pdp" />) : (<img src={'http://localhost:3001/images/defaultskin.png'} className="user_pdp" />)}
                                        <h2 className="user_name">{post.user.firstname} {post.user.lastname}</h2>
                                    </div>
                                    
                                    {(post.user_id === userId || isAdmin === true) && ( 
                                        <button className="post_delete" value={post.id} onClick={handleDelete}>x</button>
                                    )}
                                </div>
                                {/* contenu */}
                                <div className="post__content"> 
                                    <h1 className="post__content--title">{post.title}</h1>
                                    {post.imageUrl != null && (
                                        <div className="post__content--img">
                                            <img src={post.imageUrl} className="img_accueil"/>
                                        </div>
                                    )}
                                    <p className="post__content--desc">{post.description}</p>
                                </div>
                                {/* likes */}
                                <div className="post__likes">
                                    <i class="far fa-heart" id={`${post.id}-heart`} onClick={handleLike}></i>
                                    <span id={`${post.id}-span`} className="spanLike">{post.likes}</span>
                                </div>
                            </div>
                    ))) 
                })
                .catch((err) => err);
        }
    },[]);

    // TEST DU COEUR ROUGE
    useEffect(() => {
        Axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
                    .then((data) => {
                        const serverId = data.data.userId;
                        const dataLength = data.data.data.length;
                        const dataTest = data.data.data;

                        for(let i = 0; i <= dataLength; i++) {
                            const heartId = `${dataTest[i].id}-heart`;
                            const heart = document.getElementById(heartId);
                            const userId = `${serverId}-`;
                            const usersLiked = dataTest[i].usersLiked;

                            if(usersLiked.includes(userId)) {
                                heart.style.color = 'red';

                            } else {
                                heart.style.color = 'black';
                            }
                        }

                    })
                    .catch((err) => console.log(err))
    }, [])


    // BOUTON DE LIKE
    const handleLike = (e) => {
        const postId = e.target.id;
        let id = postId.split('-')[0];
        console.log(id);
        const token = localStorage.getItem('token');

        Axios.put(url, { postId: id }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                Axios.get('http://localhost:3001/post', { params: { id: id, token: token } })
                    .then((data) => {
                        console.log(data.data.userLiked);
                        if(data.data.userLiked) {
                            const heart = document.getElementById(postId);
                            heart.style.color = 'red';
                        } else {
                            const heart = document.getElementById(postId);
                            heart.style.color = 'black';
                        }

                        const spanName = `${id}-span`;
                        const span = document.getElementById(spanName);
                        const likes = data.data.data.likes;
                        span.innerHTML = likes;

                    })
                    .catch((err) => console.log(err))
            })
    }

    // BOUTON DE SUPRESSION
    const handleDelete = (e) => {
        const postId = e.target.value;
        Axios.delete(url, { data: { postId: postId } })
            .then(() => {
                console.log('post correctement supprimer');
                window.location.reload();})
            .catch((err) => console.log(err));
    }

    // BOUTON POUR REVENIR EN HAUT DE PAGE
    window.addEventListener('scroll', () => {

        const button = document.getElementById('scroll');
        if(button != null || button != undefined) {
            if(window.scrollY > 100) {
                button.style.display = "block";
            } else {
                button.style.display = "none";
            }
        }
    })

    const handleScroll = () => {
        document.documentElement.scrollTop = 0;
    }

    


    
 
    return (
        <div className="accueil">
            <Navigation />
            {allPosts}
            <button id="scroll" onClick={handleScroll}>^</button>
        </div>
    )
}

export default Accueil;