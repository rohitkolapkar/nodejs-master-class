const Joi=require('joi');
const express=require('express');
const app=express();

const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
  ];
  
app.use(express.json());

app.get('/api/genres',(req,res)=>{
    res.send(genres);
});

app.post('/api/genres',(req,res)=>{
const {error}=validateGenres(req.body);
if(error) return res.status(400).send(error.details[0].message);

const genre={
    id:genres.length+1,
    name:req.body.name
}
genres.push(genre);
res.send(genre);

});

app.put('/api/genres/:id',(req,res)=>{
    const genre=genres.find(g=>g.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send('genre with the given id is not found');

    const {error}=validateGenres(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genre.name=req.body.name;
    res.send(genre);

});

app.delete('/api/genres/:id',(req,res)=>{
    const genre=genres.find(g=>g.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send('genre with the given id is not found');  

    const index=genres.indexOf(genre);
    genres.splice(index,1);

    res.send(genre);

});

app.get('/api/genres/:id',(req,res)=>{
    const genre=genres.find(g=>g.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send('genre with the given id is not found');

    res.send(genre);
});

function validateGenres(genres){
    const schema={
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genres,schema);
}

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`Server is listening on port: ${port}`));
