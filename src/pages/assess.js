import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Layout from "../components/layout"



 
 const Basic = () => (
    <Layout> 
        <div>
        <h1>Gender Equity Assessment Form</h1>
        <Formik

       initialValues={{ email: '', password: '' }}

       validate={values => {

         const errors = {};

         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }

         return errors;

       }}

       onSubmit={(values, { setSubmitting }) => {

        setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);

       }}

     >

       {({ isSubmitting }) => (

         <Form>

           <Field type="type" name="type" />
           <ErrorMessage name="type" component="div" />

           <Field type="password" name="password" />
           <ErrorMessage name="password" component="div" />

           <button type="submit" disabled={isSubmitting}>

             Submit

           </button>

         </Form>

       )}

     </Formik>
    </div>
   </Layout> 
 );
 
 export default Basic;