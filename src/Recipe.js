import React, {useEffect, useState} from 'react';
import IngredientList from "./IngredientList";
import axios from "axios";
import {Container, Row, Col, Button} from "react-bootstrap";
import uuid from "react-uuid";

function Recipe({match, history}) {

    const recipeId = match.params['recipeId'];
    const [recipeData, setRecipeData] = useState("");

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`http://localhost:8000/api/recipe/recipes/${recipeId}/`);
            let recipeData = response.data;
            recipeData.ingredients.forEach(item => item.id = uuid());
            setRecipeData(recipeData);
        }
        fetchData();
    }, [recipeId]);

    const handleDelete = () => {
        async function deleteData() {
            const response = await axios.delete(`http://localhost:8000/api/recipe/recipes/${recipeId}/`);
            history.push("/");
        }
        deleteData();
    };

    const goBack = () => {
        history.push("/")
    };

    const handleEdit = () => {
        history.push(`/recipe/edit/${recipeId}`);
    };


    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <h2>{recipeData.name}</h2>
                    <p><strong>Description:</strong> {recipeData.description}</p>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <p><strong>Ingredient list:</strong></p>
                </Col>
                <Col xs={12}>
                    {recipeData.ingredients && (
                        <IngredientList isReadOnly ingredientList={recipeData.ingredients}/>
                    )}
                </Col>
            </Row>
            <Row>
                <Col xs={12} style={{marginTop: '5px'}}>
                    <Button onClick={goBack}>Back</Button>&nbsp;
                    <Button onClick={handleEdit}>Edit</Button>&nbsp;
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Recipe;