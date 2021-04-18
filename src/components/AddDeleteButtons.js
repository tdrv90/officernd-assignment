import React from 'react'
import '../index.css'
import { Button } from '@material-ui/core'
import AddMember from './AddMember'

const AddDeleteButtons = ({ selectionModel, handleDelete }) => {
    return (
        <div className="add-delete-buttons">
            <Button
                onClick={() => {
                    if (window.confirm('are you sure you want to delete?')) {
                        handleDelete(selectionModel)
                    }
                }}
                classes={{ label: 'delete-btn' }}>
                delete
            </Button>
            {/* <Button classes={{ label: 'add-btn' }}>add member</Button> */}
            <AddMember />
        </div>
    )
}

export default AddDeleteButtons
