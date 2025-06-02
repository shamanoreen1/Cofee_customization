import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

const Feedback = () => {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!name || !review) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      await addDoc(reviewsCollection, {
        name,
        review,
        timestamp: new Date()
      });
      setSuccess('Review submitted successfully!');
      setName('');
      setReview('');
      fetchReviews();
    } catch (err) {
      setError('Failed to submit review.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', backgroundColor: '#1f1f1f', color: '#FFD700', borderRadius: '10px' }}>
      <h1>Feedback and Reviews</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </label>
        <label>
          Review:
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            style={{ width: '100%', height: '100px', marginBottom: '10px' }}
          />
        </label>
        <button type="submit">Submit Review</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'lightgreen' }}>{success}</p>}
      <hr />
      <h2>Submitted Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map(({ id, name, review }) => (
          <div key={id} style={{ backgroundColor: '#333', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
            <p><strong>{name}</strong></p>
            <p>{review}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Feedback;
