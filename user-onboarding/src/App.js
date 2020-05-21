import React, {useState} from 'react';
import {v4 as uuid} from 'uuid';
import Form from './components/Form.js';
import Data from './components/Data.js';
import './App.css';

const initialData = [];

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

  const onInputChange = event => {
    const {name} = event.target;
    const {value} = event.target;

// This console.log appears to give the wrong answer, even though the correct answer
// is stored in state according to the devtools.components in chrome.
//
// Is this some weird javascript event timing thing or something? Unsure.
//    
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
        !formValues.tos) //check if error
      {return};
    const newData = {...formValues, 
                     id:uuid()};
    setData([newData, 
            ...data]);
    setFormValues(initialFormValues);
  }

  return (
    <div className='app-container'>
      <header><h1>Team Builder</h1></header>
      <Form values={formValues} 
            onInputChange={onInputChange} 
            onSubmit={onSubmit} 
            disabled={true}
            errors={{}}/>
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
