import React, {useState} from 'react';
import {v4 as uuid} from 'uuid';
import Form from './components/Form.js'
import Data from './components/Data.js'
import './App.css';

const initialData = [
  {
    id: uuid(),
    name: 'Bartholymue',
    email: 'b.ridiculous@aol.com',
    role: 'Dread Excretion Collector'
  },
  {
    id: uuid(),
    name: 'Jerry The Rat',
    email: 'sk8rbro@gmail.gov',
    role: 'Test Subject'
  },
  {
    id: uuid(),
    name: 'Dr. Felicia Applebaum',
    email: 'fna43@pitt.edu',
    role: 'Lead Project Designer, Existential Dread Initiative'
  }
]

const initialFormValues = {
  name: '',
  email: '',
  role: ''
}

function App() {

  const [data, setData] = useState(initialData)
  const [formValues, setFormValues] = useState(initialFormValues)

  const onInputChange = event => {
    const {name} = event.target
    const {value} = event.target
    setFormValues({...formValues, [name]:value})
  }

  const onSubmit = event => {
    event.preventDefault()
    if (!formValues.name.trim() || !formValues.email.trim() || !formValues.role.trim()){return}
    const newData = {...formValues, id:uuid()}
    setData([newData, ...data])
    setFormValues(initialFormValues)
  }

  return (
    <div className='app-container'>
      <header><h1>Team Builder</h1></header>
      <Form values={formValues} onInputChange={onInputChange} onSubmit={onSubmit}/>
      {
        data.map(d => {
          return (
            <Data key={d.id} details={d}/>
          )
        })
      }
    </div>

  );
}

export default App;
