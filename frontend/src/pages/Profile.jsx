import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, ChefHat, Calendar, LogOut, Edit3, Save } from 'lucide-react';
import './Profile.css';

const API_URL = '/api';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', email: '', favouriteRecipe: '' });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(stored);
    setUser(userData);
    setEditData({
      name: userData.name,
      email: userData.email,
      favouriteRecipe: userData.favouriteRecipe || '',
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setStatus(null);
    try {
      const res = await fetch(`${API_URL}/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        setEditing(false);
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (!user) return null;

  const joinDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container profile-page">
      <div className="page-header">
        <h1>My Profile</h1>
        <p style={{ color: 'var(--text-light)', marginTop: '10px' }}>Manage your account details</p>
      </div>

      {status === 'success' && (
        <div className="alert success" style={{ maxWidth: '600px', margin: '0 auto 1.5rem' }}>
          Profile updated successfully!
        </div>
      )}

      <div className="profile-card glass">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2>{user.name}</h2>
          <p className="email-text">{user.email}</p>
        </div>

        <div className="profile-details">
          {!editing ? (
            <>
              <div className="detail-item">
                <User size={20} color="var(--primary-color)" />
                <div>
                  <span className="detail-label">Full Name</span>
                  <span className="detail-value">{user.name}</span>
                </div>
              </div>

              <div className="detail-item">
                <Mail size={20} color="var(--primary-color)" />
                <div>
                  <span className="detail-label">Email Address</span>
                  <span className="detail-value">{user.email}</span>
                </div>
              </div>

              <div className="detail-item">
                <ChefHat size={20} color="var(--primary-color)" />
                <div>
                  <span className="detail-label">Favourite Recipe</span>
                  <span className="detail-value">{user.favouriteRecipe || 'Not set yet'}</span>
                </div>
              </div>

              <div className="detail-item">
                <Calendar size={20} color="var(--primary-color)" />
                <div>
                  <span className="detail-label">Member Since</span>
                  <span className="detail-value">{joinDate}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="edit-form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={editData.name} onChange={handleEditChange} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={editData.email} onChange={handleEditChange} />
              </div>
              <div className="form-group">
                <label>Favourite Recipe</label>
                <input type="text" name="favouriteRecipe" value={editData.favouriteRecipe} onChange={handleEditChange} placeholder="e.g. Chicken Biryani" />
              </div>
            </div>
          )}
        </div>

        <div className="profile-actions">
          {!editing ? (
            <>
              <button className="btn" onClick={() => setEditing(true)}>
                <Edit3 size={16} style={{ marginRight: '8px' }} /> Edit Profile
              </button>
              <button className="btn btn-outline logout-btn" onClick={handleLogout}>
                <LogOut size={16} style={{ marginRight: '8px' }} /> Logout
              </button>
            </>
          ) : (
            <>
              <button className="btn" onClick={handleSave}>
                <Save size={16} style={{ marginRight: '8px' }} /> Save Changes
              </button>
              <button className="btn btn-outline" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
