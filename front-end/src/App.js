// importation des indispensables
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Routeur
import Connexion from "./LOGIN/Pages/connexion";
import Inscription from "./LOGIN/Pages/inscription";
import Setting from "./HOME/Pages/setting";
import Modify from "./HOME/Pages/modify";
import Accueil from "./HOME/Pages/accueil";
import newPost from "./HOME/Pages/newPost";
import Error from "./HOME/Pages/erreur";



function App() {
  return (
    
    <BrowserRouter>
      <Switch>
          <Route path="/profils" exat component={Setting} />
          <Route path="/" exact component={Connexion} />
          <Route path="/inscription" exact component={Inscription} />
          <Route path="/modify" exact component={Modify} />
          <Route path="/accueil" exact component={Accueil} />
          <Route path="/new_post" exact component={newPost} />
          <Route path="/error" exact component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
