var formidable = require('formidable');
var mv = require('mv')


function uplodImage(req,newImagePath, newImageName,oldpath){
    var form = new formidable.IncomingForm();
    form.parse(
        function (err, fields, files) 
        {
            var oldpath = files.nobtgyaImage.path;
            var newpath = newImagePath + newImageName;
            console.log(newpath);
            mv(oldpath, newpath, function (err) 
            {
                if (err) throw err;
                console.log('File uploaded and moved!');
                res.end();
            });
        })
}

module.exports = uplodImage
