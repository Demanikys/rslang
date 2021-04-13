/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/userActions';
import './Login.scss';

const Login = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const validationsSchema = yup.object().shape({
    password: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    email: yup.string().email('Введите верный email').required('Обязательно'),
  });

  return (
    <div>
      <Formik
        initialValues={{
          password: '',
          email: '',
        }}
        validateOnBlur
        onSubmit={(values) => {
          dispatch(login(values.email, values.password));
          history.push('/');
        }}
        validationSchema={validationsSchema}
      >
        {({
          values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty,
        }) => (
          <div className="Login">
            <p className="input-field">
              <label htmlFor={<code>email</code>} />
              <br />
              <input
                placeholder="Email"
                className="input"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                autoComplete={false}
              />
            </p>
            {touched.email && errors.email && <p className="error">{errors.email}</p>}
            <p className="input-field">
              <label htmlFor={<code>secondName</code>} />
              <br />
              <input
                placeholder="Пароль"
                className="input"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                autoComplete={false}
              />
            </p>
            {touched.password && errors.password && <p className="error">{errors.password}</p>}
            <button
              disabled={!isValid || !dirty}
              onClick={handleSubmit}
              type="submit"
            >
              Войти

            </button>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Login;
