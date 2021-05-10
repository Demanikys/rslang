/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useHistory } from 'react-router-dom';
import './Registration.scss';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import { registration } from '../../actions/userActions';

const Registration = () => {
  const history = useHistory();

  const validationsSchema = yup.object().shape({
    name: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    password: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    email: yup.string().email('Введите верный email').required('Обязательно'),
  });

  return (
    <div>
      <Formik
        initialValues={{
          password: '',
          email: '',
          name: '',
        }}
        validateOnBlur
        onSubmit={(values) => {
          registration(values.email, values.password, values.name);
          history.push('/login');
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
            <p className="input-field">
              <label htmlFor={<code>email</code>} />
              <br />
              <input
                placeholder="Имя"
                className="input"
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                autoComplete={false}
              />
            </p>
            {touched.name && errors.name && <p className="error">{errors.name}</p>}
            <Button
              disabled={!isValid || !dirty}
              onClick={handleSubmit}
              type="submit"
            >
              Регистрация
            </Button>
          </div>
        )}
      </Formik>
    </div>
  );

  // return (
  //   <div className="Registration">
  //     <form>
  //       <div className="input-field">
  //         <input
  //           placeholder="Your name (necessarily)"
  //           type="text"
  //           value={name}
  //           onChange={(e) => setName(e.target.value)}
  //         />
  //         <label htmlFor="email" />
  //       </div>

  //       <div className="input-field">
  //         <input
  //           placeholder="Email (necessarily)"
  //           type="email"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //         />
  //         <label htmlFor="email" />
  //       </div>

  //       <div className="input-field">
  //         <input
  //           label="password"
  //           placeholder="Password (necessarily)"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //         />
  //         <label htmlFor="email" />
  //       </div>

  //       <button
  //         type="button"
  //         onClick={(e) => {
  //           if (name.length) {
  //             e.preventDefault();
  //             registration(email, password, name);
  //             setName('');
  //             setEmail('');
  //             setPassword('');
  //             history.push('/login');
  //           }
  //         }}
  //       >
  //         Register
  //       </button>
  //     </form>
  //   </div>
  // );
};

export default Registration;
