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
  tos: false
};

const initialUsers = [];

const initialDisabled = true;

// primary app function
function App() {

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

  const onInputChange = event => {

    const {name} = event.target;
    const {value} = event.target;
    const {type} = event.target;

    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: ""
        });
      })
      .catch(error => {
        setFormErrors({
          ...formErrors,
          [name]: error.errors[0]
        });
      });

    if (type === 'checkbox'){
      setFormValues({...formValues,
        [name]:!(/true/i).test(value)});
    }
    else {
      setFormValues({...formValues, 
        [name]:value});
    }

// Incorrect output for some reason. Is this some weird javascript event timing 
// thing or something? Unsure.
//    
//    console.log("formValues after if: ");
//    console.log(formValues.tos);

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
            errors={formErrors}/>
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
