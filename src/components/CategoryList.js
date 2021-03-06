import React from 'react'
import Button from '@material-ui/core/Button';

const CategoryList = ({ filterItems, filteredMembers, allCategories, itemsPerCategory }) => {
    // display category list with the available status codes per category from the existing members
    return (
        <div>
            {allCategories.map((category, index) => {
                return (
                    <Button
                        key={index}
                        onClick={() => filterItems(category)}
                    >
                        {category} {itemsPerCategory[category]}
                    </Button>
                )
            })}
        </div>
    )
}

export default CategoryList
