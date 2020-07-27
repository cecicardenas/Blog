const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Un blog1​ o bitácora2​ es un sitio web que incluye, a modo de diario personal de su autor o autores, contenidos de su interés, que suelen estar actualizados con frecuencia y a menudo son comentados por los lectores. Sirve como publicación en línea de historias con una periodicidad muy alta, que son presentadas en orden cronológico inverso, es decir, lo más reciente que se ha publicado es lo primero que aparece en la pantalla. Antes era frecuente que los blogs mostraran una lista de enlaces a otros blogs u otras páginas para ampliar información, citar fuentes o hacer notar que se continúa con un tema que empezó otro blog.";
const aboutContent = "Puedes ordenar los archivos y carpetas en esta vista por Nombre (Name), Tamaño (Size), Última modificación (Last Modified), Tipo (Type) y Permisos (Permissions), pulsando en el título de esa columna.";
const contactContent = "Todos los archivos que borres a través del administrador de archivos de cPanel te ofrece la posibilidad de enviar a la papelera o eliminar definitivamente seleccionando «Evite la basura y elimine permanentemente los archivos»:";


const app = express();

app.set('view engine', "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    homeStartingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res){
  res.render("contact", {
    contactContent: contactContent
  });
});


app.get("/compose", function(req, res){
  res.render("compose", {
    //contactContent: contactContent

  });
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content:req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});


app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
