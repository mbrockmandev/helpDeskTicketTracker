import {useEffect, useState} from 'react';
import {FaUser} from 'react-icons/fa';
import {toast} from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import {register, reset} from '../features/auth/authSlice';
import {useNavigate} from 'react-router-dom';
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const { name, email, password, passwordConfirmation } = formData;

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // redirect if logged in
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset)
  }, [isError, isSuccess, user, message, navigate, dispatch]);


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      // [e.target.email]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== passwordConfirmation) {
      toast.error('Passwords do not match.')
    } else {
      const userData = {
        name,
        email,
        password,
      }
      dispatch(register(userData))
    }
  }

  if (isLoading) return <Spinner />

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className='form-control'
              name='name'
              id='name'
              value={name}
              onChange={onChange}
              placeholder='Enter your name'
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className='form-control'
              name='email'
              id='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className='form-control'
              name='password'
              id='password'
              value={password}
              onChange={onChange}
              placeholder='Enter your password'
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className='form-control'
              name='passwordConfirmation'
              id='passwordConfirmation'
              value={passwordConfirmation}
              onChange={onChange}
              placeholder='Confirm your password'
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;