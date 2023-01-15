const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const { Router } = require("express");
const { json } = require("body-parser");
const encoder = bodyParser.urlencoded();




const app = express();
app.use("/assets" ,express.static("assets"));
app.use("/js" ,express.static("js"));
app.use("/styles" ,express.static("styles"));
app.use("/cadastro" ,express.static("cadastro"));
app.use("/produtos" ,express.static("produtos"));


const connection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "",
    database: "nodejs"
});


//cadastrar e login//
connection.connect(function(error){
    if(error) throw error 
    else console.log("conectado com sucesso")
});

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",encoder,function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username,password],function(error,results,fields){
        if(results.length > 0){
            res.redirect("/welcome");
        }else{
            res.redirect("/");
        }
        res.end();
    })
})

app.post("/cadastro",encoder,function(req,res){
    connection.query("INSERT INTO loginuser (user_name,user_pass) VALUES ('"+req.body.user_name+"','"+req.body.password+"')",function(err, result)
    {                                                      
        if (err)
           throw err;
           res.redirect("/cadastro")
      });
      });

app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "/welcome.html")

})

app.get("/produtos",function(req,res){
    res.sendFile(__dirname + "/produtos.html")
})

app.get("/cadastro",function(req,res){
    res.sendFile(__dirname + "/cadastro.html")
})
//cadastrar e login /acima/


// Rotas da API
app.get("/api/cardapio", (req, res) => {
    connection.query("SELECT * FROM prato ORDER BY data DESC;", (error, results, fields) => {
        if(error){
            res.send(error)
        }
        if(results) {
            res.send(results);
        }
    })
    
  })

  
app.post("/api/cardapio/create", encoder, (req, res) => {
    connection.query(
        `INSERT INTO prato (id, nome, descricao, preco, imagem, data)
         VALUES (NULL, '${req.body.nome}', '${req.body.descricao}', ${req.body.preco}, '${req.body.imagem}', CURRENT_TIMESTAMP);`,

         (err, result, fields) => {
            if (result) {
                console.log(result)
                res.redirect("/produtos")
            }
            else if (err) {
                console.log(err)
            }
         }
    )
})

app.delete('/deletar/:id',(req,res) => {
    connection.query("DELETE FROM prato WHERE id = ?" + req.params.id,
    res.render("/deletar")

)})
    



app.listen(8000);
