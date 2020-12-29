const express=require('express');
const cors=require('cors');
const fileUpload = require('express-fileupload');
const app=express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(fileUpload());

// get request
app.get('/',(req,res)=>{
    console.log(req.body)
    res.json()
})

// Upload Endpoint
app.post('/uploadfile',  (req, res) => {
    try {
        if (req.files === null) {
            return res.status(400).json({ msg: 'No file uploaded' });
          }
        
          const file = req.files.file;
          console.log(req.files.file)
        
           file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
            if (err) {
              console.error(err);
              return res.status(500).send(err);
            }
        
            res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
          });
    } catch (err) {
        console.error(err.message)
    }
    
  });

app.listen(5000,()=>{
    console.log('Server is listening to PORT 5000')
})