import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [dataField, setDataField] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setDataField({ ...dataField, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const result = await axios.post('/api/auth/login', dataField);

    console.log(dataField, result);
  };

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <input
          type='email'
          name='email'
          placeholder='Correo'
          onChange={handleChange}
          value={dataField.email}
        />
        <input
          type='password'
          name='password'
          placeholder='Contraseña'
          onChange={handleChange}
          value={dataField.password}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
export default Login;
