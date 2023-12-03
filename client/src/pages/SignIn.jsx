import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  loadingOn,
  operationFailure,
  operationSuccess,
} from '../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'

export default function SignIn() {
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(loadingOn())
    fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(operationSuccess(data.payload))
          navigate('/')
        } else dispatch(operationFailure(data.message))
      })
      .catch((error) => {
        dispatch(operationFailure(error.message))
      })
  }

  return (
    <div className='max-w-2xl mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          required
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          required
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type='submit'
          className='bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <span>Do not have an account?</span>
        <Link to='/sign-up'>
          <span className='text-blue-600'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-700 mt-5'>{error}</p>}
    </div>
  )
}
