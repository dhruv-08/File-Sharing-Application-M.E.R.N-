import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import DoneIcon from '@material-ui/icons/Done';
import "../CSS/fileUpload.css"
function FileUpload() {
  const { register, handleSubmit } = useForm()
  const [filetransfer, setfiletransfer] = useState(null)
  const [usertext, setusertext] = useState('');
  const [success, setsuccess] = useState(false);
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
   setsuccess(true);
   setTimeout(() => {
       setsuccess(false);
     }, 2000);
  }
  return (
    <div style={{position:"absolute",paddingTop:"10%"}}>
    <form onSubmit={handleSubmit(onSubmit)} style={{position:"relative",paddingLeft:"12%",left:"100%"}}>
    <label style={{fontSize:"70px",position:"relative",paddingLeft:"17%"}}>Transfer</label><br/>
      <input ref={register} type="file" onChange={(e)=>setfiletransfer(e.target.files[0])} name="myfile" /><br/>
      <TextField id="outlined-basic" label="Send To" variant="outlined" value={usertext} name="username" onChange={(e)=>setusertext(e.target.value)} style={{width:"400px"}}/><br/><br/>
      <Button style={{width:"400px"}} type="submit" variant="contained" color="primary">Transfer</Button>
    </form>
    {success===true && <Dialog
                    style={{color:"black"}}
                    open={true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title" style={{backgroundColor:"black"}}><span style={{color:"white"}}>Transfer Successfully</span></DialogTitle>
                    <DialogContent style={{backgroundColor:"black",textAlign:"center"}}>
                    <DialogContentText id="alert-dialog-description">
                    <DoneIcon style={{color:"white"}}/>
                    </DialogContentText>
                    </DialogContent>
                </Dialog>}
    </div>
  );
}
export default FileUpload
