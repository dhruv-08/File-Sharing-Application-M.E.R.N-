import { Button, TextField } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import "../CSS/fileUpload.css"
function FileUpload() {
  const { register, handleSubmit } = useForm()
  const [filetransfer, setfiletransfer] = useState(null)
  const [usertext, setusertext] = useState('');
  const [formval, setformval] = useState(null);
  const onSubmit = async () => {
    const formData = new FormData()
    formData.append("myfile",filetransfer )

   await Axios.post("/upload",formData)
   .then(res=>{
     setformval(res.data);
     Axios.post("/send",{from:usertext,x:res.data})
     .then(res=>{
       console.log(res);
     })
   })
  }
  return (
    <div style={{position:"absolute",paddingTop:"10%"}}>
    <form onSubmit={handleSubmit(onSubmit)} style={{position:"relative",paddingLeft:"12%",left:"100%"}}>
    <label style={{fontSize:"70px",position:"relative",paddingLeft:"17%"}}>Transfer</label><br/>
      <input ref={register} type="file" onChange={(e)=>setfiletransfer(e.target.files[0])} name="myfile" /><br/>
      <TextField id="outlined-basic" label="Send To" variant="outlined" value={usertext} name="username" onChange={(e)=>setusertext(e.target.value)} style={{width:"400px"}}/><br/><br/>
      <Button style={{width:"400px"}} type="submit" variant="contained" color="primary">Transfer</Button>
    </form>
    </div>
  );
}
export default FileUpload
