import { TextField } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import "../CSS/fileUpload.css"
function FileUpload() {
  const { register, handleSubmit } = useForm()
  const [file, setfile] = useState(null)
  const [user, setuser] = useState('');
  const [data, setdata] = useState(null);
  useEffect(() => {
    async function fun(){
      await Axios.get("/list")
      .then(res=>{
        console.log("hello")
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
    }
    console.log("hel")
    fun();
  }, [])
  const onSubmit = async () => {
    const formData = new FormData()
    formData.append("myfile",file )

   await Axios.post("/upload",formData)
   .then(res=>{
     setdata(res.data);
     Axios.post("/send",{from:user,x:res.data})
     .then(res=>{
       console.log(res);
     })
   })
   console.log(formData);
    
      
    // }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Upload file</label><br/>
      <input ref={register} type="file" onChange={(e)=>setfile(e.target.files[0])} name="myfile" />
      <TextField id="outlined-basic" label="Send To" variant="outlined" value={user} name="username" onChange={(e)=>setuser(e.target.value)} style={{width:"400px"}}/><br/><br/>
      <button>Submit</button>
    </form>
  );
}
export default FileUpload
