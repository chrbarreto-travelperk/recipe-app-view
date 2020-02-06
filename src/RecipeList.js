import {Col, Row} from "react-bootstrap";
import Link from "react-router-dom/Link";
import React from "react";

function RecipeList({recipeList}) {
    return (
        <Row>
            {recipeList.map(recipeItem => (
                <Col key={recipeItem.id} xs={12}>
                    <Link to={`/recipe/view/${recipeItem.id}`}>
                        {recipeItem.name}
                    </Link>
                </Col>
            ))}
        </Row>
    )
}

export default RecipeList;