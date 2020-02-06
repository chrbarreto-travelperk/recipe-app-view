import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cookbook from "./Cookbook";
import RecipeForm from "./RecipeForm";
import Recipe from "./Recipe";
import {ErrorsProvider} from "./context/error.context"

function App() {

    return (
        <ErrorsProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/recipe/create' component={RecipeForm} />
                    <Route exact path='/recipe/view/:recipeId' component={Recipe} />
                    <Route exact path='/recipe/edit/:recipeId' component={RecipeForm} />
                    <Route exact path='/' component={Cookbook} />
                </Switch>
            </BrowserRouter>
        </ErrorsProvider>
    );
}

export default App;
