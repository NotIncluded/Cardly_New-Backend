const express = require('express');
const router = express.Router();
const { supabase } = require('../supabaseClient');
const { v4: uuidv4 } = require('uuid');

// GET all records
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('Records').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// GET a single record by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('Records').select('*').eq('Record_ID', id).single();
  if (error) return res.status(404).json({ error });
  res.json(data);
});

// POST create a new record
router.post('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { Title, Description, Category, Status } = req.body;
  
    if (!id) return res.status(400).json({ error: 'User_ID is missing in the URL' });
  
    const Record_ID = uuidv4();
  
    console.log('🧾 Insert Values:', { Record_ID, User_ID: id, Title, Description, Category, Status });
  
    const { data, error } = await supabase.from('Records').insert([
      {
        Record_ID,
        User_ID: id,
        Title,
        Description,
        Category,
        Status
      }
    ]);
  
    if (error) {
      console.error('❌ Supabase Error:', error);
      return res.status(400).json({ error: error.message });
    }
  
    res.status(201).json(data);
  });

// DELETE a record
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('Records').delete().eq('Record_ID', id);
  if (error) return res.status(400).json({ error });
  res.status(204).send();
});

module.exports = router;
