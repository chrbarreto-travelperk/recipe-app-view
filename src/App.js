import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cookbook from "./Cookbook";
import RecipeForm from "./RecipeForm";
import Recipe from "./Recipe";

function App() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/recipe/create' component={RecipeForm} />
                <Route exact path='/recipe/view/:recipeId' component={Recipe} />
                <Route exact path='/recipe/edit/:recipeId' component={RecipeForm} />
                <Route exact path='/' component={Cookbook} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
