import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase.js'
import {
  loadingOn,
  operationFailure,
  operationSuccess,
} from '../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function OAuth() {
  const { loading } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleClick() {
    try {
      dispatch(loadingOn())

      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      const response = await fetch('/api/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      })
      const data = await response.json()
      if (data.success) {
        dispatch(operationSuccess(data.payload))
        navigate('/')
      } else dispatch(operationFailure(data.message))
    } catch (error) {
      dispatch(operationFailure(error.message))
    }
  }

  return (
    <button
      type='button'
      onClick={handleClick}
      className='bg-red-700 p-3 rounded-lg text-white hover:opacity-95'
    >
      {loading ? 'Loading...' : 'Continue With Google'}
    </button>
  )
}
