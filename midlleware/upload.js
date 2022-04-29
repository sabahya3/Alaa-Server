const multer=require("multer");
const path=require("path");

const storage= multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,"./uploads");
    },
    filename:function(req,file,cb)
    {
        cb(null,Date.now()+"-"+file.originalname);
    }
});

const fileFilter=(req,file,callback)=>
{
const vaildexts=[".png",".jpg",".jpeg"];
if(!vaildexts.includes(path.extname(file.originalname)))
{
    return callback(new Error("Only .png, .jpg & .jpeg format allowed"))
}
const fileSize=parseInt(req.headers["content-length"]);
if(fileSize>1048576)
{
    return callback(new Error("file size is Big"));

}
callback(null,true);
};
let upload =multer({

storage:storage,
fileFilter:fileFilter,
fileSize:1048576,//10mb
});
module.exports=upload.single("productImage")