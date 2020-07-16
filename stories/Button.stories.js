import React from 'react'

const Button = ({ onClick }) => (
  <button onClick={onClick} type="button">
    Click me
  </button>
)

export const Base = () => <Button onClick={() => console.log('clicked!')} />

export default {
  component: Button,
  title: 'Test/Button',
}
