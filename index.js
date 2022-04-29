const express=require("express");
const cors=require("cors");
const app=express();

const mongoose=require("mongoose");
const {MONGO_DB_CONFIG}=require("./config/app.config");
const errors=require("./midlleware/error");
mongoose.Promise=global.Promise;
mongoose.connect(MONGO_DB_CONFIG.DB,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Datebase Connected");
},
(error)=>{
    console.log("Datebase Can`t be Connected"+error);
}
);
app.use(cors());
app.use(express.json());
app.use('/uploads',express.static('uploads'));
app.use('/api',require("./route/app.route"));
app.use(errors.errorHandler);
app.listen(process.env.PORT||4000,function(){
    console.log("Ready to Go");
});
