import express from 'express'
const app = express();

const port = 3000;
app.use(express.json())

let teaData =[];
let nextId=1;

app.post("/tea",(req,res)=>{
    const {name, price} = req.body
    const newTea = {id:nextId++,name , price};
    teaData.push(newTea);
    res.status(201).send(newTea);
})

app.get("/tea",(req,res)=>{
    res.status(200).send(teaData);
})



app.get("/tea/:id",(req,res)=>{
    const tea = teaData.find(t=>t.id===parseInt(req.params.id));
    if(!tea){
        res.status(404).send("not found");
    }
    else{
        res.status(200).send(tea);
    }

})


app.put("/tea/:id",(req,res)=>{
   const tea = teaData.find(t => t.id === parseInt(req.params.id))

   if(!tea)
   {
    return res.status(404).send("tea not found")
   }
   else{
        const {name , price} = req.body;
        tea.name = name;
        tea.price = price;
        return res.status(200).send(tea);
        
   }
})


app.delete('/tea/:id',(req,res)=>{
    const index = teaData.findIndex(t=>t.id === parseInt(req.params.id));
    if(index ===-1){
        res.status(404).send("teri maa ki chut thik sa bhej tea ko ");
    }
    teaData.splice(index,1)
    return res.status(200).send("deleted the tea");
})

app.listen(port , ()=>{
    console.log(`Listening on port ${port}`);
})