import React from 'react'
import './Data.css';

export default function Data(props) {
  const { details } = props

  if (!details) {
    return <h3>Collecting data...</h3>
  }

  return (
    <div className='data-container'>
      <h2>{details.name}</h2>
      <p>Email: {details.email}</p>
      <p>Role: {details.role}</p>
    </div>
  )
}
