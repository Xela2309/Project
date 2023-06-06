import React from "react";
import Pdp from "../../img/lama.png";

const Post = () => {

    return(
        <div className="post">
            {/* user */}
            <div className="post__user">

                <img src={Pdp} className="post__user--img" />
                <h2 className="post__user--name">Lamasticot</h2>

            </div>
            {/* contenu */}
            <div className="post__content">

                <h1 className="post__content--title">Groupomania</h1>
                <div className="post__content--img"></div>
                <p className="post__content--desc">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</p>

            </div>
            {/* likes */}
            <div className="post__likes">

                <i class="far fa-heart"></i>
                <p className="post__likes--p">X likes</p>

            </div>
        </div>
    )
}

export default Post;