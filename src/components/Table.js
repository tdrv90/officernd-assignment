import * as React from 'react'
import { useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import CategoryList from './CategoryList'
import AddDeleteButtons from './AddDeleteButtons';
import formatDate from '../Helpers/formatDate'
import '../index.css'

export default function DataTable({ members, filterItems, allCategories, itemsPerCategory, filteredMembers, teams, offices, url, authHeader }) {
    // selectionModel - used to get IDs of the selected rows
    const [selectionModel, setSelectionModel] = useState([])

    // table header structure
    const columns = [
        { field: 'member', headerName: 'Member', width: 250 },
        { field: 'team', headerName: 'Team', width: 200 },
        { field: 'status', headerName: 'Status/Label', width: 150 },
        { field: 'createdAt', headerName: 'Created At', width: 200, },
        { field: 'office', headerName: 'Location', width: 200 },
    ]

    //delete selected row or rows in multiple selection
    const handleDelete = (selectionModel) => {
        selectionModel.map(async (id) => {
            await fetch(`${url}/members/${id}`, {
                ...authHeader,
                method: 'DELETE'
            })
        })
    }

    // filter to display only the selected selected category of members
    const mappedMembers = filteredMembers.map((member) => {
        return {
            id: member._id,
            member: member.name,
            team: teams[member.team],
            office: offices[member.office],
            status: member.calculatedStatus,
            createdAt: formatDate(member.createdAt)
        }
    })

    return (
        <div className="table-container">
            <div className='table-header-container'>
                <CategoryList
                    filterItems={filterItems}
                    filteredMembers={filteredMembers}
                    allCategories={allCategories}
                    itemsPerCategory={itemsPerCategory}
                    className='statuses'
                />
                <AddDeleteButtons selectionModel={selectionModel} handleDelete={handleDelete} className="table-controls" />
            </div>
            <div className="table-counter">
                {filteredMembers.length} {filteredMembers.length === 1 ? "result" : "results"} (of total {members.length})
            </div>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={mappedMembers}
                    columns={columns}
                    pageSize={20}
                    checkboxSelection
                    autoHeight
                    onSelectionModelChange={(newSelection) => {
                        setSelectionModel(newSelection.selectionModel);
                    }}
                    selectionModel={selectionModel}
                />
            </div>
        </div>
    );
}