var fs = require('fs');
fs.readFile('helloworld.js' , 'utf-8', function(err,data){
    if(err)
        {
            console.log(err);
        }else{
            console.log(data);
        }

});