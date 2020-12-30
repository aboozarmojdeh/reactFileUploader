const express = require('express');
const fileUpload = require('express-fileupload');
const cors=require('cors');
const pool=require('./database');
const app = express();

app.use(cors());
app.use(fileUpload());


// Get all photo model
app.get('/allmodels',async (req,res)=>{
  try {
    const allModels=await pool.query('SELECT * FROM photos');
    console.log(allModels.rows)
    res.json(allModels.rows) 
  } catch (err) {
    console.error(err.message)
  }
});

// Get a photo model
app.get('/allmodels/:id',async (req,res)=>{
  try {
    const {id}=req.params;
    const allModels=await pool.query('SELECT * FROM photos WHERE photo_id=$1',[id]);
    console.log(allModels.rows[0])
    res.json(allModels.rows[0]) 
  } catch (err) {
    console.error(err.message)
  }
});

// Upload Endpoint
app.post('/uploadphotomodel', async (req, res) => {
  try {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
  
    const file = req.files.file;
    console.log('file',file.name)
  
    file.mv(`${__dirname}/../client/public/uploads/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      // res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
    const newPhoto=await pool.query('INSERT INTO photos (model_name,photo_path) VALUES ($1,$2) RETURNING *',[file.name,`/uploads/${file.name}`])
console.log('newPhoto',newPhoto.rows[0]);
res.json({ fileName: newPhoto.rows[0].model_name, filePath: newPhoto.rows[0].photo_path });

  } catch (err) {
    console.error(err.message)
  }
  
});

app.listen(5000, () => console.log('Server Started on PORT 5000'));
