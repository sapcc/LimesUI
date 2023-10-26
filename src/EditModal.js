import React from "react";
import { Modal } from "juno-ui-components";

const EditModal = (props) => {

    console.log(props)

    return (
        <>
            <Modal
                onCancel={() => { props.setShowModal(false) }}
                onConfirm={null}
                open={true}
            >
                {props.resource.name}
            </Modal>
        </>
    )
}

export default EditModal
