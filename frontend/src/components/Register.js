import React, {useState} from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({username:'', email:'', password:''});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('auth/register/', form);
      alert('Registered — please log in');
      navigate('/');
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    }
  };

  return (
    <div className="col-md-6 mx-auto">
      <h3>Register</h3>
      {error && <div className="alert alert-danger">{JSON.stringify(error)}</div>}
      <form onSubmit={submit}>
        <input className="form-control my-2" placeholder="Username" value={form.username} onChange={e=>setForm({...form,username:e.target.value})}/>
        <input className="form-control my-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        <input className="form-control my-2" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
        <button className="btn btn-primary" type="submit">Register</button>
      </form>
    </div>
  );
}
