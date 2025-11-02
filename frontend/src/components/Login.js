import React, {useState} from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({username:'', password:''});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('auth/login/', form);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      // optionally decode to check if admin — but backend uses is_staff
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data || 'Login failed');
    }
  };

  return (
    <div className="col-md-6 mx-auto">
      <h3>Login</h3>
      {error && <div className="alert alert-danger">{JSON.stringify(error)}</div>}
      <form onSubmit={submit}>
        <input className="form-control my-2" placeholder="Username" value={form.username} onChange={e=>setForm({...form,username:e.target.value})}/>
        <input className="form-control my-2" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
        <button className="btn btn-primary" type="submit">Login</button>
        <Link className="btn btn-link" to="/register">Register</Link>
      </form>
    </div>
  );
}
