import React, {useState, useEffect} from 'react';
import {v4 as uuid} from 'uuid';
import axios from 'axios';
import * as yup from 'yup'; 
import Form from './components/Form.js';
import Data from './components/Data.js';
import formSchema from './validation/formSchema';
import './App.css';

const initialData = [
  {
    id: uuid(),
    name: 'Bartholymue',
    email: 'b.ridiculous@aol.com',
    role: 'Dread Excretion Collector',
    tos: true
  },
  {
    id: uuid(),
    name: 'Jerry The Rat',
    email: 'sk8rbro@gmail.gov',
    role: 'Test Subject',
    tos: true
  },
  {
    id: uuid(),
    name: 'Dr. Felicia Applebaum',
    email: 'fna43@pitt.edu',
    role: 'Lead Project Designer, Existential Dread Initiative',
    tos: true
  }
];

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

const initialDisabled = true;

function App() {

  const [data, setData] = useState(initialData);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const getData = () => { // needed? might just need post?
    axios.get('https://reqres.in/api/users')
         .then(result => {
           setData(result.data);
         })
         .catch(err => {
           console.log("ERROR in or during getData request.");
         })
         .finally(() => {
           console.log('getData API request complete.');
         })
  };

  const postNewData = newData => {

  }

  const onInputChange = event => {

    const {name} = event.target;
    const {value} = event.target;

//    console.log("formValues before if: ");
//    console.log(formValues.tos);

    //yup val here or below?

    if (event.target.type === 'checkbox'){ // should technically invert the order of these
      setFormValues({...formValues,        // since it is more likely it WON'T be a checkbox
      [name]:!formValues.tos});            // but this doesn't happen often anyway so who cares
    }
    else {
      setFormValues({...formValues, 
        [name]:value});
    }

    //yup val here or above?

// This console.log appears to give the wrong answer, even though the correct answer
// is stored in state according to the devtools.components in chrome.
//
// Is this some weird javascript event timing thing or something? Unsure.
//    
//    console.log("formValues after if: ");
//    console.log(formValues.tos);

  }

  const onSubmit = event => {
    event.preventDefault();
    if (!formValues.name.trim() || 
        !formValues.email.trim() || 
        !formValues.role.trim() ||
        !formValues.tos) //check if error, also p sure unneeded
      {return};
    const newData = {...formValues, 
                     id:uuid()};
    setData([newData, 
            ...data]);
    setFormValues(initialFormValues);
  }

  /*useEffect(() => { // needed? might just need post
    getData();
  }, []);*/

  /*useEffect(() => {

  }, []);*/

  console.log(data);

  return (
    <div className='app-container'>
      <header><h1>Team Builder</h1></header>
      <Form values={formValues} 
            onInputChange={onInputChange} 
            onSubmit={onSubmit} 
            disabled={disabled}
            errors={formErrors}/>
      {
        data.map(d => {
          return (
            <Data key={d.id} 
                  details={d}/>
          );
        })
      }
    </div>

  );
};

export default App;
