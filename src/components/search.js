import React from 'react';
import MagnifyingGlass from "../svg/magnifyingGlass.svg"

const Search = ({ searchQuery, setSearchQuery }) => (
    <div className="search-wrapper" id="menu-search">
        <form
            action="/search"
            method="get"
            autoComplete="off"
        >
            <label className="searchLabel" htmlFor="menu-search">
                <span className="visually-hidden">
                    Search site
                </span>
            </label>
            <input
                value={searchQuery}
                type="text"
                id="menu-search"
                className="search"
                placeholder="Search..."
                name="s"
            />
            <button aria-label="Search Button" className="searchButton" title="Search" type="submit"><span><MagnifyingGlass /></span></button>
        </form>
    </div>
);

export default Search;