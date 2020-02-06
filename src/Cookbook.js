import React, {useEffect, useState} from 'react';
import Link from "react-router-dom/Link";
import axios from "axios";
import {Container, Row, Button, Col, Form} from "react-bootstrap";
import useInputState from "./hooks/useInputState";

function Cookbook(){

    const [recipeList, setRecipeList] = useState([]);
    const [searchText, setSearchText]= useInputState("");

    useEffect(() => {
        async function fetchData() {
            const query = searchText ? `?name=${searchText}` : '';
            const response = await axios.get(`http://localhost:8000/api/recipe/recipes/${query}`);
            setRecipeList(response.data);
        }
        fetchData();
    }, [searchText]);

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <h1>My cookbook</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={4}>
                    <Form>
                        <Form.Group controlId="recipe-search">
                            <Form.Control value={searchText} onChange={setSearchText} placeholder="Search by name..." />
                        </Form.Group>
                    </Form>
                </Col>
                <Col xs={12} sm={8}>
                    <Link to={'/recipe/create'}>
                        <Button>Create new recipe</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                 {recipeList.map(recipeItem => (
                     <Col key={recipeItem.id} xs={12}>
                        <Link to={`/recipe/view/${recipeItem.id}`}>
                            {recipeItem.name}
                        </Link>
                     </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Cookbook;