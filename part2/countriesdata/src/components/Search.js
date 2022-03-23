import React from 'react'

const Search = ({ search, setSearch }) => {
    return (
        <p>find countries 
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </p>
    )
}

export default Search