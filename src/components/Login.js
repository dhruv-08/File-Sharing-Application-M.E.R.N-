import Axios from 'axios';
import React, { useState } from 'react'
import Icon from '@material-ui/icons/Send';
import "../App.css";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ReactCardFlip from 'react-card-flip';
import { Button, Dialog,DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import {useHistory } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@material-ui/icons';
function Login() {
    const history = useHistory()
    const [loguser, setloguser] = useState("");
    const [logpass, setlogpass] = useState("");
    const [logemail, setlogemail] = useState("");
    const [user, setuser] = useState("");
    const [pass, setpass] = useState("");
    const [em, setem] = useState("");
    const [open, setOpen] = useState(false);
    const [success, setsuccess] = useState(false);
    const [sign, setsign] = useState(false);
    const [isFlipped, setisFlipped] = useState(false)
    const [values, setValues] = React.useState({
        showPassword: false,
      });
      const [values1, setValues1] = React.useState({
        showPassword1: false,
      });
    const handleClickOpen = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
          }, 2000);
    };

    const handleSuc = () => {
        setsuccess(true);
        setTimeout(() => {
            setsuccess(false);
          }, 2000);
    };
    const handlesign = () => {
        setsign(true);
        setTimeout(() => {
            setsign(false);
          }, 2000);
    };
    function handleSignup(e){
        e.preventDefault();
        Axios.post("/signup",{username:user,password:pass})
        .then(res=>{
            setuser("");
            setpass("");
            setem("");
            handleSuc();
        }).catch((res)=>{
            setuser("");
            setpass("");
            setem("");
            handlesign();
        });
    }
    const handleClickShowPassword1 = () => {
        setValues1({ ...values1, showPassword1: !values1.showPassword1 });
      };
      const handleMouseDownPassword1 = (event) => {
        event.preventDefault();
      };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    async function handleLogin(e){
        e.preventDefault();
        
        await Axios.post("/login",{username:loguser,password:logpass})
        .then((res)=>{
            setlogpass("");
            setloguser("");
            setlogemail("");
            console.log(res.data.status);
            history.replace("/home",null);
        })
        .catch((res)=>{
            setlogpass("");
        setloguser("");
        setlogemail("");
        handleClickOpen();
        });
    }
    return (
        <div className="App" style={{overflow:"hidden"}}>
        {success===true && <Dialog
                    style={{color:"black"}}
                    open={true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title" style={{backgroundColor:"black"}}><span style={{color:"white"}}>Sign-up Successfully</span></DialogTitle>
                    <DialogContent style={{backgroundColor:"black",textAlign:"center"}}>
                    <DialogContentText id="alert-dialog-description">
                    <DoneIcon style={{color:"white"}}/>
                    </DialogContentText>
                    </DialogContent>
                </Dialog>}
           {sign===true && <Dialog
                    style={{color:"black"}}
                    open={true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title" style={{backgroundColor:"black"}}><span style={{color:"white"}}>Already Registered</span></DialogTitle>
                    <DialogContent style={{backgroundColor:"black",textAlign:"center"}}>
                    <DialogContentText id="alert-dialog-description">
                    <CloseIcon style={{color:"white"}}/>
                    </DialogContentText>
                    </DialogContent>
                </Dialog>}
           {open===true && <Dialog
                    style={{color:"black"}}
                    open={true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title" style={{backgroundColor:"black"}}><span style={{color:"white"}}>Invalid username or password</span></DialogTitle>
                    <DialogContent style={{backgroundColor:"black",textAlign:"center"}}>
                    <DialogContentText id="alert-dialog-description">
                    <CloseIcon style={{color:"white"}}/>
                    </DialogContentText>
                    </DialogContent>
                </Dialog>}
           {/* style={{backgroundImage:`url(${process.env.PUBLIC_URL + `/back.jpg`})`,height:"102.5vh",boxShadow:" inset 700px 0px 200px -8px #111"}} */}
               <header className="banner" style={{backgroundColor:"brown",overflow:"hidden",height:"100vh",backgroundPosition:"center",backgroundSize:"1300px 700px",backgroundRepeat:"no-repeat"}}>
               <Grid container spacing={1} >
               <Grid item xs={1}></Grid>
                   <Grid item xs={2} style={{paddingTop:"12%"}}>
                   <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                   <form noValidate autoComplete="off" onSubmit={(e)=>(handleLogin(e))} style={{paddingTop:"8%",paddingLeft:"20%",boxShadow:"0px 5px 20px -5px rgba(0, 0, 0, 0.5)",width:"350px",height:"350px",borderRadius:"15px",backgroundColor:"white",color:"black"}}>
                       <h1 className="log"><span className="dark">Log</span>-In<LockOpenIcon style={{fontSize:"25px"}}/></h1><br/>
                       <TextField id="outlined-basic" label="Username*" variant="outlined" value={loguser} name="username" onChange={(e)=>setloguser(e.target.value)} style={{width:"300px"}}/><br/><br/>
                       <FormControl variant="outlined">
                       <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
                       <OutlinedInput
                           id="outlined-adornment-password"
                           type={values.showPassword ? 'text' : 'password'}
                           value={logpass} name="password" onChange={(e)=>setlogpass(e.target.value)} style={{width:"300px"}}
                           endAdornment={
                           <InputAdornment position="end">
                               <IconButton
                               aria-label="toggle password visibility"
                               onClick={handleClickShowPassword}
                               onMouseDown={handleMouseDownPassword}
                               edge="end"
                               >
                               {values.showPassword ? <Visibility /> : <VisibilityOff />}
                               </IconButton>
                           </InputAdornment>
                           }
                           labelWidth={70}
                       />
                       </FormControl><br/><br/>
                       <div style={{textAlign:"justify"}}>
                       <Button disabled={!loguser || !logpass} type="submit" variant="contained" color="primary" >LogIn<Icon style={{paddingLeft:"2%"}}/>
                       </Button><span style={{color:"red",paddingLeft:"15%"}} onClick={()=>setisFlipped(!isFlipped)}>Not Registered Yet?</span></div>
                       </form>
               <form noValidate autoComplete="off" onSubmit={(e)=>handleSignup(e)} style={{paddingTop:"8%",paddingLeft:"20%",width:"350px",height:"350px",borderRadius:"15px",boxShadow:"0px 5px 20px -5px rgba(0, 0, 0, 0.5)",backgroundColor:"white",color:"black"}}>
                   <h1 className="sign" style={{color:"black"}}><span className="dark">Sign</span>-Up<ExitToAppIcon style={{fontSize:"25px",color:"black"}}/></h1><br/>
               <TextField id="outlined-basic" label="Username*" variant="outlined" value={user} name="username" onChange={(e)=>setuser(e.target.value)} style={{width:"300px"}}/><br/><br/>
               <FormControl variant="outlined">
                       <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
                       <OutlinedInput
                           id="outlined-adornment-password"
                           type={values1.showPassword1 ? 'text' : 'password'}
                           value={pass} name="password" onChange={(e)=>setpass(e.target.value)} style={{width:"300px"}}
                           endAdornment={
                           <InputAdornment position="end">
                               <IconButton
                               aria-label="toggle password visibility"
                               onClick={handleClickShowPassword1}
                               onMouseDown={handleMouseDownPassword1}
                               edge="end"
                               >
                               {values1.showPassword1? <Visibility /> : <VisibilityOff />}
                               </IconButton>
                           </InputAdornment>
                           }
                           labelWidth={70}
                       />
                       </FormControl><br/><br/>
                       <div style={{textAlign:"justify"}}>
               <Button disabled={!user || !pass} type="submit" variant="contained" color="primary" >SignUp<Icon style={{padding:"2%"}}/></Button>
               <span style={{color:"red",paddingLeft:"15%"}} onClick={()=>setisFlipped(!isFlipped)}>Already Registered?</span></div>
               </form></ReactCardFlip></Grid>
               <Grid item xs={3}></Grid>
               <Grid item xs={6}><div><h1 style={{color:"white",fontSize:"70px",width:"500px",paddingTop:"20%"}}>Simplest And Fastest Way to Transfer Files</h1></div></Grid>
               
           </Grid>
           {/* <span> */}
               
               {/* </span> */}
           </header>
           {/* {chec==true && <Main/>} */}
           
   </div>
)
}

export default Login
