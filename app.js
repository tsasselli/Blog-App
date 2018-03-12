var bodyParser = require("body-parser"),
mongoose = require("mongoose"),
express = require("express"),
app = express();

mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var blogSchema = new mongoose.Schema ({
    title: String, 
    image: String, 
    body: String, 
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "testBlog", 
//     image: "https://images.unsplash.com/photo-1444124818704-4d89a495bbae?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a128b113cb6090ba5d87ee29fc3a7869&auto=format&fit=crop&w=800&q=60",
//     body: "This is a BLOG Post!!"
// });

// RESTful Routes

//INDEX Route
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("error finding blogs");
        } else {
                res.render("index", {blogs: blogs});
        }
    })
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
    //create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    })
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Blog server has started");
})