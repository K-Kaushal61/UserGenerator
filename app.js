import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import userModel from './models/user.js'; 
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){
    res.render("index");
});

app.get('/read', async function(req, res){
    let users = await userModel.find();
    res.render("read", {users});
});

app.get('/edit/:userid', async function(req, res){
    let user = await userModel.findOne({_id: req.params.userid});
    res.render("edit", {user});
});

app.post('/update/:userid', async function(req, res){
    let {name, email, image} = req.body;
    let user = await userModel.findOneAndUpdate({_id: req.params.userid}, {name, email, image}, {new: true});
    res.redirect("/read")
});

app.post('/create', async function(req, res){
    let {name, email, image} = req.body;
    let createdUser = await userModel.create({
        name,
        email,
        image 
    });
    
    res.redirect('/read');
});

app.get('/delete/:id', async function(req, res){
    let users = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
}); 

export default app;
