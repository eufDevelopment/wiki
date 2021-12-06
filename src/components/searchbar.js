import React from 'react';
import { Formik, Field, Form } from 'formik';
import MagnifyingGlass from "../svg/magnifyingGlass.svg"

const SearchBar = ({ defaultSearchQuery }) => (
    <div className="search-wrapper" id="menu-searchbar">
      <Formik
        initialValues={{
          search: defaultSearchQuery,
        }}
        onSubmit={async (values) => {
          window.location = '/search?s='+values.search   
        }}
      >
        <Form>
          <Field className="search" id="search" name="search" placeholder="Search..." />
          <button aria-label="Search Button" className="searchButton" title="Search" type="submit"><span><MagnifyingGlass /></span></button>
        </Form>

      </Formik>
    </div>
);

export default SearchBar;