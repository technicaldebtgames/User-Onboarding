import React from 'react';
import './Users.css';

export default function Users(props) {
  const { details } = props;

  if (!details) {
    return <h3>Collecting users...</h3>
  };

  return (
    <div className='users-container'>
      <h2>{details.name}</h2>
      <p>Email: {details.email}</p>
      <p>Role: {details.role}</p>
      <p>ToS: {details.tos.toString()}</p>
    </div>
  )
};
