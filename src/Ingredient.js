import React, {memo} from 'react';
import {ListGroup, Button, Col, Row} from "react-bootstrap";

function Ingredient({isReadOnly, name, id, handleRemove}) {
    return (
        <ListGroup.Item as="li">
            <Row>
                <Col xs={9}>
                    {name}
                </Col>
                <Col xs={3}>
                    <Button variant="danger" style={{display: isReadOnly ? 'none' : 'inline'}}
                            onClick={()=> {handleRemove(id)}}>
                        remove
                    </Button>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}

export default memo(Ingredient);