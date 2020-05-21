import React from 'react';
import './Form.css';

export default function Form(props) {
    const {values, onInputChange, onSubmit, disabled, errors} = props;

    return (
        <form className='form-container' 
              onSubmit={onSubmit}>
            <div className='submit'>
                <h2>Add Team Member</h2>
                <button disabled={disabled}>submit</button>
                <div className='form-errors'>
                <div>{errors.name}</div>
                <div>{errors.email}</div>
                <div>{errors.role}</div>
                <div>{errors.tos}</div>
                </div>
            </div>
            <div className='inputs'>
                <h4>Information</h4>
                <label>Name:&nbsp;
                    <input type='text' 
                           maxLength='32' 
                           name='name' 
                           value={values.name} 
                           onChange={onInputChange}/>
                </label>
                <label>Email:&nbsp;
                    <input type='email' 
                           maxLength='32' 
                           name='email' 
                           value={values.email} 
                           onChange={onInputChange}/>
                </label>
                <label>Role&nbsp;
                    <select name='role' 
                            value={values.role} 
                            onChange={onInputChange}>
                        <option value=''>Select a Role</option>
                        <option value='Test Subject'>Test Subject</option>
                        <option value='Clueless Intern'>Clueless Intern</option>
                        <option value='Dread Excretion Collector'>Dread Excretion Collector</option>
                        <option value='Research Assistant'>Research Assistant</option>
                        <option value='Mid-level Bureaucrat'>Mid-level Bureaucrat</option>
                        <option value='Unassuming Plain-clothes Security'>Unassuming Plain-clothes Security</option>
                        <option value='Lead Project Designer, Existential Dread Initiative'>Lead Project Designer, Existential Dread Initiative</option>
                    </select>
                </label>
                <label>
                    <input type='checkbox' 
                           name='tos' 
                           value={values.tos} 
                           onClick={onInputChange}></input>
                    I've read the Terms of Service
                </label>
            </div>
        </form>
    )
}