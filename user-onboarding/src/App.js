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

    //yup val

    setFormValues({...formValues, 
                   [name]:value});
  }

  const onSubmit = event => {
    event.preventDefault();
    if (!formValues.name.trim() || 
        !formValues.email.trim() || 
        !formValues.role.trim())
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
