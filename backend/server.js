const express = require('express');
const cors = require('cors');
const { admin, db } = require('./firebaseAdmin');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Coffee Horizon Backend is running');
});

// Get all reviews
app.get('/reviews', async (req, res) => {
  try {
    const reviewsSnapshot = await db.collection('reviews').orderBy('timestamp', 'desc').get();
    const reviews = reviewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Add a new review
app.post('/reviews', async (req, res) => {
  try {
    const { name, review } = req.body;
    if (!name || !review) {
      return res.status(400).json({ error: 'Name and review are required' });
    }
    const newReview = {
      name,
      review,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    };
    const docRef = await db.collection('reviews').add(newReview);
    res.status(201).json({ id: docRef.id, ...newReview });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add review' });
  }
});

// Delete a review by ID
app.delete('/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('reviews').doc(id).delete();
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

const express = require('express');
const cors = require('cors');
const { admin, db } = require('./firebaseAdmin');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Coffee Horizon Backend is running');
});

// Get all reviews
app.get('/reviews', async (req, res) => {
  try {
    const reviewsSnapshot = await db.collection('reviews').orderBy('timestamp', 'desc').get();
    const reviews = reviewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Add a new review
app.post('/reviews', async (req, res) => {
  try {
    const { name, review } = req.body;
    if (!name || !review) {
      return res.status(400).json({ error: 'Name and review are required' });
    }
    const newReview = {
      name,
      review,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    };
    const docRef = await db.collection('reviews').add(newReview);
    res.status(201).json({ id: docRef.id, ...newReview });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add review' });
  }
});

// Delete a review by ID
app.delete('/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('reviews').doc(id).delete();
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// Get all customizations
app.get('/customizations', async (req, res) => {
  try {
    const customizationsSnapshot = await db.collection('customizations').orderBy('timestamp', 'desc').get();
    const customizations = customizationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(customizations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customizations' });
  }
});

// Add a new customization
app.post('/customizations', async (req, res) => {
  try {
    const { coffeeType, milkType, sugarLevel, size, extras } = req.body;
    if (!coffeeType || !milkType || sugarLevel === undefined || !size) {
      return res.status(400).json({ error: 'Missing required customization fields' });
    }
    const newCustomization = {
      coffeeType,
      milkType,
      sugarLevel,
      size,
      extras: extras || [],
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    };
    const docRef = await db.collection('customizations').add(newCustomization);
    res.status(201).json({ id: docRef.id, ...newCustomization });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add customization' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
