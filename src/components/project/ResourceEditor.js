import React from "react";
import { GridColumn, TextInput, Button } from "juno-ui-components";

const ResourceEditor = (props) => {

    console.log(props.input)
    return (
        <>
            <GridColumn cols={2}>
                <TextInput
                    value={props.input.value}
                    onChange={(e) => { props.input.value = e.target.value }}
                />
            </GridColumn>
            <GridColumn cols={1}>
                <Button
                    onClick={() => { props.handleInput(props.input.value) }}
                >
                    Commit
                </Button>
            </GridColumn>
        </>
    )
}

export default ResourceEditor
