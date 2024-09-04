import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile data
        const profileResponse = await fetch('http://localhost:5000/api/user/profile');
        if (!profileResponse.ok) throw new Error('Failed to fetch profile data');
        const profileData = await profileResponse.json();
        setProfile(profileData);

        // Fetch orders data
        const ordersResponse = await fetch('http://localhost:5000/api/user/orders');
        if (!ordersResponse.ok) throw new Error('Failed to fetch orders data');
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!profile) return <p>No profile data available</p>;

  const handleEditClick = () => setIsEditing(!isEditing);

  const handleSaveClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (!response.ok) throw new Error('Failed to update profile');
      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={profile.avatar || 'https://via.placeholder.com/100'}
            alt="User Avatar"
            className="w-24 h-24 rounded-full"
          />
          <div className="flex-1">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="text-2xl font-semibold w-full border p-2 rounded-md"
                />
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="text-gray-600 w-full border p-2 rounded-md mt-1"
                />
              </>
            ) : (
              <>
                <h1 className="text-2xl font-semibold">{profile.name}</h1>
                <p className="text-gray-600">{profile.email}</p>
              </>
            )}
            <button
              onClick={handleEditClick}
              className="text-blue-500 underline mt-2 block"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            {isEditing && (
              <button
                onClick={handleSaveClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-xl font-semibold mb-4">Order History</h2>
          <ul>
            {orders.length === 0 ? (
              <li>No orders found.</li>
            ) : (
              orders.map((order) => (
                <li key={order.id} className="border-b py-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Order #{order.id}</span>
                    <span className="text-gray-600">{order.date}</span>
                  </div>
                  <p className="text-gray-600">Total: {order.total}</p>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-2">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
