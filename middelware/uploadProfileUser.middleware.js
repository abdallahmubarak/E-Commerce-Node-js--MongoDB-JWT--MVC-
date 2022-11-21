const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "static/img_profile")
    },
    filename:function(req, file, cb){
        const newName = Date.now()+path.extname(file.originalname)
        cb(null, newName)
    }
})
////////////////////////////////////////////
const upload = multer({
    storage,
    limits:{ fileSize: 1000000000 },
    fileFilter: function(req, file, cb){
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
          ) {
            cb(null, true);
          } else {
            cb(null, false);
          }
    }
})
module.exports = upload