import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';

const AdminDashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  const reviewsCollection = collection(db, 'reviews');

  const fetchReviews = async () => {
    try {
      const q = query(reviewsCollection, orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const reviewsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(reviewsList);
    } catch (err) {
      setError('Failed to fetch reviews.');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'reviews', id));
      fetchReviews();
    } catch (err) {
      setError('Failed to delete review.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', backgroundColor: '#1f1f1f', color: '#FFD700', borderRadius: '10px' }}>
      <h1>Admin Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>User Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviews.map(({ id, name, review }) => (
          <div key={id} style={{ backgroundColor: '#333', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
            <p><strong>{name}</strong></p>
            <p>{review}</p>
            <button onClick={() => handleDelete(id)} style={{ backgroundColor: '#b22222', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
