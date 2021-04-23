//import stuff
import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "./form.css"
import Feedback from "../svg/feedback.svg"



//the class you are making your component from
class ModalContact extends Component {
  // constructor to set state and bind "this"
  constructor(props) {
      super(props);
      this.state = {showModal: false};
      this.handleClick = this.handleClick.bind(this);
    }

  // function to handle the click
   handleClick() {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }
  
  
  // the render() method to put stuff into the DOM
  render() {
    // the modal you will toggle on and off
    let lpath = '/';
    if (typeof window !== `undefined`){ 
      lpath = window.location.href;
    }
    const url1 = this.props.url1;
    const url2 = this.props.url2;
    const contactEmail = this.props.email;

    const modal = (
      <div className="modal">
          <div style={{
              padding:"50px 2% 20px",
              maxWidth: "960px",
              margin:"3% auto",
              background:"#fff",
              position: "relative",
              boxShadow: "var(--shadow1)"
          }}>
            <button title="Close this" className="close-modal" type="close" onClick={this.handleClick} >
                &#10006;
            </button>    
            <div>
 
              <Formik
        
                initialValues={{ 
                    email: '', 
                    name: '',
                    page: lpath,
                    message: '',
                    pot: '',
                }}
        
                validate={values => {
        
                  const errors = {};
        
                  if (values.email) {
                    if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ) {
                      errors.email = 'Invalid email address';
                    }
                  }

                  if (!values.message) {
                    errors.message = 'Required';
                  } 
        
                  return errors;
        
                }}
        
                onSubmit={ async (values, { setSubmitting }) => {
                  
                  const url = values.pot ? url1 : url2
                  console.log( 'url1: ' + JSON.stringify(url1) )

                  const getUrl = url +"?data=" + encodeURI(JSON.stringify(values))

                  try {
                    console.log('Send GET to: ' + url + ' values: '+ JSON.stringify(values, null, 2))
                    fetch(getUrl)
                      .then(response => response.text())
                      .then(result => console.log(result))
                      .catch(error => console.log('error', error));
                    console.log('done'); 
                    
                    setTimeout(() => {
                      this.handleClick();
                      }, 500);
                    
                    
                  } catch(err) {
                    console.log(err); // Failed to fetch
                    alert('Send failed! Please contact ' + contactEmail)
                    this.handleClick();
                  }  
                }}
        
              >
        
                {({ isSubmitting }) => (
        
                  <Form>
                    <div className="form-item">  
                        <label className="optional" htmlFor="email">Your Email</label>  
                        <Field type="email" className="field" name="email" />
                        <div className="field-line gradient1"></div>
                        <ErrorMessage className="errorMessage" name="email" component="div" />
                    </div>

                    <div className="form-item">  
                        <label className="optional" htmlFor="name">Your name</label>
                        <Field id="name" className="field" name="name" />
                        <div className="field-line gradient1"></div>
                    </div>

                    <div className="form-item hidden">  
                        <label htmlFor="page">Page</label>
                        <Field id="page" className="field" name="page"/>
                    </div>

                    <div className="form-item">  
                        <label className="required" htmlFor="message">Your message</label>
                        <Field id="message" className="field" name="message" as="textarea" />
                        <div className="field-line gradient1"></div>
                        <ErrorMessage className="errorMessage" name="message" component="div" />
                    </div>
                    
                    <div className="form-item hidden">  
                        <label htmlFor="pot">Your other message</label>
                        <Field id="pot" className="field" name="message2" placeholder="avoid filling this" />
                    </div>

                    <button className={`pink-button ${isSubmitting ? 'sending' : 'ready'}`} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Submit"}
                    </button>
        
                  </Form>
        
                )}
        
              </Formik>
        
            </div>
          </div>
        
      </div>
    );
    
    // the return() to put your default HTML into the DOM
    return (
        // wrapper div of component
        <span className="modal-wrapper">
          <button id="feedbackButton" className="pink-button small-button" type="text" title="Get in touch!" onClick={this.handleClick} >Get in touch!<Feedback
              style={{
                position: "relative",
                top: "6px",
                fill: "#fff",
                height: "18px",
                margin: "0 0 0 3px"
              }}></Feedback></button>

          {this.state.showModal ? modal : ''} 
        </span>
    );
  }
}


// export the class so you can call it elsewhere
export default ModalContact;