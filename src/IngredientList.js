import React from "react";
import {ListGroup} from "react-bootstrap";

import Ingredient from "./Ingredient";

function IngredientList({ingredientList, isReadOnly, handleRemove}) {
    return (
        <ListGroup as="ul">
            {ingredientList.map(ingredientItem => (
                <Ingredient isReadOnly={isReadOnly} handleRemove={handleRemove} key={ingredientItem.id}
                            id={ingredientItem.id} name={ingredientItem.name} />
            ))}
        </ListGroup>
    )
}

export default IngredientList;