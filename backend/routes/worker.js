const router = require('express').Router();
const Worker = require('../models/Worker');

// Add Worker Profile
router.post('/add', async (req, res) => {
  try {
    const worker = new Worker(req.body);
    await worker.save();
    res.json({ msg: 'Worker profile added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add worker', details: err.message });
  }
});

// Search Workers
router.get('/search', async (req, res) => {
  try {
    const { location, skill } = req.query;
    const workers = await Worker.find({
      location: new RegExp(location, 'i'),
      skills: { $in: [skill] }
    });
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: 'Search failed', details: err.message });
  }
});

module.exports = router;
