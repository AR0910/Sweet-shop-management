import { useEffect, useState } from 'react';
import API from '../api';
import AddEditSweet from './AddEditSweet';
import SweetItem from './SweetItem';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  // ✅ Fetch user info + load sweets
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('auth/me/');
        setIsAdmin(res.data.is_staff || res.data.is_superuser);
      } catch (err) {
        console.error('Error fetching user info:', err);
        setIsAdmin(false);
      }
    };
    fetchUser();
    load();
  }, []);

  // ✅ Load all sweets
  const load = async () => {
    try {
      const res = await API.get('sweets/');
      setSweets(res.data);
    } catch (err) {
      console.error(err);
      alert('Error loading sweets');
    }
  };

  // ✅ Search sweets
  const search = async (e) => {
    e && e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (category) params.append('category', category);
    if (minPrice) params.append('min_price', minPrice);
    if (maxPrice) params.append('max_price', maxPrice);
    try {
      const res = await API.get('sweets/search/?' + params.toString());
      setSweets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Purchase sweet
  const handlePurchase = async (s) => {
    try {
      await API.post(`sweets/${s.id}/purchase/`, { amount: 1 });
      load();
      alert('Purchased successfully');
    } catch (err) {
      alert(err.response?.data?.detail || 'Purchase failed');
    }
  };

  // ✅ Edit sweet
  const handleEdit = (s) => {
    navigate(`/sweets/edit/${s.id}`);
  };

  // ✅ Delete sweet (admin only)
  const handleDelete = async (s) => {
    if (!window.confirm('Delete this sweet?')) return;
    try {
      await API.delete(`sweets/${s.id}/`);
      load();
      alert('Deleted');
    } catch (err) {
      alert(err.response?.data?.detail || 'Delete failed (admin only)');
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3 align-items-center">
        <h3>Available Sweets</h3>
        <div>
          {/* ✅ Add button visible only for admins */}
          {isAdmin && (
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => navigate('/sweets/add')}
            >
              Add Sweet
            </button>
          )}
          <button className="btn btn-outline-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* ✅ Search and filter form */}
      <form className="row g-2 mb-3" onSubmit={search}>
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Search name/desc"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary me-2" type="submit">
            Search
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => {
              setQuery('');
              setCategory('');
              setMinPrice('');
              setMaxPrice('');
              load();
            }}
          >
            Reset
          </button>
        </div>
      </form>

      {/* ✅ Sweets list */}
      {sweets.length === 0 && (
        <div className="alert alert-info">No sweets available.</div>
      )}

      {sweets.map((s) => (
        <SweetItem
          key={s.id}
          s={s}
          onPurchase={handlePurchase}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isAdmin={isAdmin} // ✅ pass real admin status
        />
      ))}
    </div>
  );
}
