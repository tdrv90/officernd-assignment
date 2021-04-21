import React from 'react'
import '../index.css'
import { Button } from '@material-ui/core'
import AddMember from './AddMember'

const AddDeleteButtons = ({ selectionModel, handleDelete, teams, offices, url, authHeader }) => {
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
            <AddMember teams={teams} offices={offices} url={url} authHeader={authHeader} />
        </div>
    )
}

export default AddDeleteButtons
