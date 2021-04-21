import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'

import '../index.css'

export default function FormDialog({ teams, offices, url, authHeader }) {
    const [open, setOpen] = useState(false)
    const [values, setValues] = useState({
        name: '',
        organization: '',
        office: '',
        status: '',
        startDate: '',
        email: '',
        tel: ''
    })

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleNameInputChange = (e) => {
        setValues({ ...values, name: e.target.value })
    }
    const handleOrganizationInputChange = (e) => {
        setValues({ ...values, organization: e.target.value })
    }
    const handleOfficeInputChange = (e) => {
        setValues({ ...values, office: e.target.value })
    }
    const handleEmailInputChange = (e) => {
        setValues({ ...values, email: e.target.value })
    }
    const handleTelInputChange = (e) => {
        setValues({ ...values, tel: e.target.value })
    }
    const handleStartDateInputChange = (e) => {
        setValues({ ...values, startDate: e.target.value })
    }

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${url}/members`, {
                ...authHeader,
                mode: 'no-cors',
                method: 'POST',
                // body: JSON.stringify(values)
                body: {
                    "name": "Test 3",
                    "organization": "5d81dcfcb18f3e0010f503ef",
                    "office": "5d839686e59be52704c30fbb",
                    "status": "contact",
                    "startDate": "2021-04-18T00:00:00.000Z",
                    "tel": "+123456789"
                }
            })
            console.log(response.json())
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div>
            <Button classes={{ label: 'add-btn' }} onClick={handleClickOpen}>
                add member
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Member (NOT FUNCTIONAL YET)</DialogTitle>
                <div className="form-container">
                    <form className="register-form">
                        <label for="name">Name</label>
                        <input
                            onChange={handleNameInputChange}
                            className="form-field"
                            placeholder="Full name..."
                            name="name"
                            value={values.name}
                            required
                        />
                        <br />
                        <label for="organization">Company *</label>
                        <select
                            name="organization"
                            onChange={handleOrganizationInputChange}
                        >
                            {Object.entries(teams).map(team => {
                                return (
                                    <option value={team[0]}>{team[1]}</option>
                                )
                            })}
                        </select>
                        <label for="office">Location *</label>
                        <select
                            name="office"
                            onChange={handleOfficeInputChange}
                        >
                            {Object.entries(offices).map(office => {
                                return (
                                    <option value={office[0]}>{office[1]}</option>
                                )
                            })}
                        </select>
                        <br />
                        <label for="email">Email</label>
                        <input
                            onChange={handleEmailInputChange}
                            className="form-field"
                            placeholder="Contact email..."
                            name="email"
                            value={values.email}
                        />
                        <label for="tel">Phone</label>
                        <input
                            onChange={handleTelInputChange}
                            className="form-field"
                            placeholder="Phone number..."
                            name="tel"
                            type="tel"
                            value={values.tel}
                        />
                        <br />
                        <label for="startDate">Start Date</label>
                        <input
                            onChange={handleStartDateInputChange}
                            className="form-field"
                            placeholder="Phone number..."
                            name="startDate"
                            type="date"
                            value={values.startDate}
                        />
                    </form>
                </div>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}