import { useState } from 'react';
import {FaSignInAlt, FaUser} from 'react-icons/fa';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../features/auth/authSlice';


function Login() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const { name, email, password } = formData;

  const dispatch = useDispatch()

  const { user, isLoading, isSuccess, message } = useSelector((state) => state.auth)


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      // [e.target.email]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Log in to get support</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
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
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;