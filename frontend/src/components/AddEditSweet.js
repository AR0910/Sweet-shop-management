import React, {useState, useEffect} from 'react';
import API from '../api';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddEditSweet({edit}) {
  const [form, setForm] = useState({name:'', category:'', price:'', quantity:0, description:''});
  const navigate = useNavigate();
  const params = useParams();

  useEffect(()=>{
    if (edit && params.id) {
      API.get(`sweets/${params.id}/`).then(res => setForm(res.data)).catch(()=>alert("Cannot fetch sweet"));
    }
  }, [edit, params.id]);

  const submit = async e => {
    e.preventDefault();
    try {
      if (edit) {
        await API.put(`sweets/${params.id}/`, form);
        alert('Updated');
      } else {
        await API.post('sweets/', form);
        alert('Added');
      }
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data || 'Error saving');
    }
  };

  return (
    <div className="col-md-6 mx-auto">
      <h3>{edit ? 'Edit Sweet' : 'Add Sweet'}</h3>
      <form onSubmit={submit}>
        <input className="form-control my-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input className="form-control my-2" placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
        <input className="form-control my-2" placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/>
        <input className="form-control my-2" placeholder="Quantity" value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})}/>
        <textarea className="form-control my-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}></textarea>
        <button className="btn btn-primary" type="submit">{edit ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}
