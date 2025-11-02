import React, {useEffect, useState} from 'react';
import API from '../api';

export default function AdminPanel(){
  const [sweets, setSweets] = useState([]);

  useEffect(()=> { load(); }, []);
  const load = async ()=> {
    const res = await API.get('sweets/'); setSweets(res.data);
  };

  const restock = async (id) => {
    const amount = parseInt(prompt("Enter amount to restock:", "10"));
    if (!amount) return;
    try {
      await API.post(`sweets/${id}/restock/`, {amount});
      alert("Restocked");
      load();
    } catch (err) {
      alert(err.response?.data?.detail || 'Restock failed (admin only)');
    }
  };

  return (
    <div>
      <h3>Admin Panel</h3>
      {sweets.map(s => (
        <div key={s.id} className="card mb-2">
          <div className="card-body">
            <h5>{s.name}</h5>
            <div>Qty: {s.quantity}</div>
            <button className="btn btn-primary mt-2" onClick={()=>restock(s.id)}>Restock</button>
          </div>
        </div>
      ))}
    </div>
  );
}
