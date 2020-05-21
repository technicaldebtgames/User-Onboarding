import React, {useState, useEffect} from 'react';
import {v4 as uuid} from 'uuid';
import axios from 'axios';
import * as yup from 'yup'; 
import Form from './components/Form.js';
import Users from './components/Users.js';
import formSchema from './validation/formSchema';
import './App.css';

// init values
const initialFormValues = {
  name: '',
  email: '',
  role: '',
  tos: false
};

const initialFormErrors = {
  name: '',
  email: '',
  role: '',
  tos: ''
};

const initialUsers = [];

const initialDisabled = true;

// primary app function
function App() {

  console.log('APP START')

  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  //async api call that actually just gives us what we gave it
  const postNewUsers = newUsers => {
    axios.post('https://reqres.in/api/users', newUsers)
         .then(result => {
           //console.log('result.data in postNewUsers:');
           //console.log(result.data);
           setUsers([result.data, ...users]);
         })
         .catch(err => {
           console.log("ERROR in or during postNewUsers request.");
         })
         .finally(() => {
           //setUsers(initialUsers);
           console.log('postNewUsers API request and form reset complete.');
         });
  };

  const onCheckboxChange = event => {

    const {name} = event.target;
    const {checked} = event.target;

    yup
    .reach(formSchema, name)
    // we can then run validate using the value
    .validate(checked)
    .then(valid => {
      // happy path, we can clear the error message
      setFormErrors({
        ...formErrors,
        [name]: ''
      })
    })
    .catch(error => {
      // sad path, does not validate so we set the error message to the message 
      // returned from yup (that we created in our schema)
      setFormErrors({
        ...formErrors,
        [name]: error.errors[0]
      })
    })

    setFormValues({
      ...formValues,
      [name]: checked // ?
    });

  }

  //sent to onChange on elements
  const onInputChange = event => {

    const {name} = event.target;
    const {value} = event.target;
    //const {type} = event.target;

    //if (type === 'checkbox') {
      //console.log("name value type");
      //console.log(name)
      //console.log(value)
      //console.log(type)
    //}

    //debugger

    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        //debugger
        setFormErrors({
          ...formErrors,
          [name]: ''
        });
        //debugger
      })
      .catch(error => {
        //debugger
        setFormErrors({
          ...formErrors,
          [name]: error.errors[0]
        });
        //debugger
      });

      setFormValues({...formValues,
        [name]:value});
      
    //I think this needs spun out into another function perhaps to solve the inverted validation checkbox error?
/*    if (type === 'checkbox'){

      setFormValues({...formValues,
        [name]:(/false/i).test(value)}); // this is used to convert a string to a bool by comparing the fake bool-string given through value, via regex comparison

    }
    else {

      setFormValues({...formValues, // the non-checkbox vals
        [name]:value});
    
    }*/

// Incorrect output for some reason. Is this some weird javascript event timing 
// thing or something? Unsure. Tied in to validation issue?
//    
    console.log("formValues after if: ");
    console.log(formValues);

  }

  const onSubmit = event => {
    event.preventDefault();
    const newUsers = {...formValues, 
                     id:uuid()};
                     postNewUsers(newUsers);
  }

    //validation effect
    useEffect(() => {
      formSchema.isValid(formValues)
                .then(valid => {
                  //debugger
                  setDisabled(!valid);
                });
    }, [formValues]);

  //return component elements
  return (
    <div className='app-container'>
      <header><h1>Team Builder</h1></header>
      <Form values={formValues} 
            onInputChange={onInputChange} 
            onSubmit={onSubmit} 
            disabled={disabled}
            errors={formErrors}
            onCheckboxChange={onCheckboxChange}/>
      {
        users.map(d => {
          return (
            <Users key={d.id} 
                  details={d}/>
          );
        })
      }
    </div>

  );
};

export default App;
