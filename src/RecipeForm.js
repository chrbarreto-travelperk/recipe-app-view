import React, {useEffect, useState} from "react";
import useInputState from "./hooks/useInputState";
import axios from "axios";
import IngredientList from "./IngredientList";
import {withRouter} from "react-router-dom";
import uuid from 'react-uuid';
import {Form, Button, Container, Row, Col, Alert} from "react-bootstrap";

const emptyRecipe = {
    name: "", description: "", ingredients: []
}

function RecipeForm({match, history}) {
    const recipeId = match.params['recipeId'];
    const [ingredientName, setIngredientName, resetIngredientName] = useInputState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [recipe, setRecipe] = useState(emptyRecipe);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`http://localhost:8000/api/recipe/recipes/${recipeId}/`);
            let recipeData = response.data;
            recipeData.ingredients.forEach(item => item.id = uuid());
            setRecipe(recipeData);
        }
        if (recipeId) {
            fetchData();
        }
    }, [recipeId]);

    const clearErrorMessage = () => {
        setErrorMessage("");
    };

    const handleChange = (evt) => {
        const property_name = evt.target.name;
        const property_value = evt.target.value;
        setRecipe({...recipe, [property_name]: property_value});
    };

    const addIngredient = (evt) => {
        evt.preventDefault();

        if(!ingredientName){
            setErrorMessage('Ingredient name is mandatory!');
            return;
        }
        const ingredientList = [...recipe.ingredients, {name: ingredientName, id: uuid()}];
        setRecipe({...recipe, ingredients: ingredientList});
        resetIngredientName();
    };

    const removeIngredient = (idToRemove) => {
        const ingredientList = recipe.ingredients.filter(item => {
            return idToRemove !== item['id'];
        });
        setRecipe({...recipe, ingredients: ingredientList});
    };

    const sendRecipe = (evt) => {
        evt.preventDefault();
        if (!recipe.name) {
            setErrorMessage('Recipe name is mandatory!');
            return;
        }
        async function addRecipe() {
            const response = await axios.post('http://localhost:8000/api/recipe/recipes/', recipe);
            history.push(`/recipe/view/${response.data.id}`);
        }
        async function editRecipe() {
            const response = await axios.patch(`http://localhost:8000/api/recipe/recipes/${recipeId}/`, recipe);
            history.push(`/recipe/view/${response.data.id}`);
        }
        if (recipeId) {
            editRecipe();
        } else {
            addRecipe();
        }
    };

    return (
        <Container>
            <h1>{recipeId ? 'Edit Recipe' : 'Create Recipe'}</h1>
            <Form>
                <Row>
                    <Col xs={12}>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control value={recipe.name} name="name" onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col xs={12}>
                        <Form.Group>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control value={recipe.description} name="description" onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <p>Ingredient list:</p>
                    </Col>
                    <Col xs={12} md={6}>
                        <IngredientList handleRemove={removeIngredient} ingredientList={recipe.ingredients}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} style={{marginTop: '5px'}}>
                        <Form.Group>
                            <Form.Label>Add ingredient:</Form.Label>
                            <Form.Control value={ingredientName} name="ingredient_name" onChange={setIngredientName} />
                        </Form.Group>
                    </Col>
                    <Col xs={12}>
                        <Button onClick={addIngredient} type="submit">Add Ingredient</Button>&nbsp;
                    </Col>
                </Row>
            </Form>
                <Row>
                    <Col xs={12} style={{marginTop: '5px'}}>
                        <Button onClick={sendRecipe}>{recipeId ? 'Update Recipe' : 'Create Recipe'}</Button>&nbsp;
                        <Button onClick={history.goBack}>Cancel</Button>
                    </Col>
                </Row>
            <Row>
                <Col xs={12} style={{marginTop: '5px'}}>
                    {errorMessage &&
                    (<Alert variant="danger" onClose={clearErrorMessage} dismissible>{errorMessage}</Alert>)
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default withRouter(RecipeForm);