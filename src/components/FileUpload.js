import Axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import "../CSS/fileUpload.css"
function FileUpload() {
  const { register, handleSubmit } = useForm()
  const [file, setfile] = useState(null)

  const onSubmit = async () => {
    const formData = new FormData()
    formData.append("myfile",file )

   await Axios.post("/upload",formData)
   .then(res=>{
       console.log(res);
   })
    console.log(formData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label for="fileUpload">Upload file</label><br/>
      <input ref={register} type="file" onChange={(e)=>setfile(e.target.files[0])} name="myfile" />
      <button>Submit</button>
    </form>
  );
}
export default FileUpload
