const express = require('express');
const { exec } = require('child_process');

const app = express();

app.get("/", (req, res) => {
//  const path = req.query.path || '.';
//  const options = req.query.options || '';
  
  const id = req.query.id;
  const password = req.query.password;
  const displayname = req.query.displayname;


  console.log(`id:  ${id}`);
  console.log(`password:  ${password}`);
  console.log(`displayname:  ${displayname}`);
  
//  console.log(`path:  ${path}`);
//  console.log(`options:  ${options}`);

//  const command = `ls ${options} ${path}`;

  const zcommand = `zmprov ca ${id}@idall.pro ${password} displayName ${displayname}`  
  console.log(`zcommand: ${zcommand}`);

  const command = 'sudo su - zimbra -c "'  + zcommand + '"'

  console.log(command);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      //console.error(exec error: ${error});
      console.log(`stderr: ${stderr}`);
      return res.status(500).send(`Error executing command: ${error}`);
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
   
    res.send(id + " Successfully Created");	  
    //res.send(stdout);
  });
});

app.listen(22080, () => {
  console.log('Server listening on port 22080...');
});
