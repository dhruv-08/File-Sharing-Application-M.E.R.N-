import Axios from 'axios';
import React, { useState } from 'react'
import Icon from '@material-ui/icons/Send';
import "../App.css";
import LockOpenIcon from '@material-ui/icons/LockOpen';
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
            if(res.data.status==='true'){
                history.replace("/home",null);
            }
            else{
                history.replace("/checkout",null);
            }
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
        style={{textAlign:"center"}}
               open={true}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description">
               <DialogTitle id="alert-dialog-title"><h1>Sign-Up Successfully</h1></DialogTitle>
               <DialogContent>
               <DialogContentText id="alert-dialog-description">
               <img src="https://thumbs.gfycat.com/QuaintLikelyFlyingfish-size_restricted.gif" alt="success" style={{width:"250px",height:"200px"}}/>
               </DialogContentText>
               </DialogContent>
           </Dialog>}
       {sign===true &&<Dialog
               style={{textAlign:"center"}}
               open={true}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description">
               <DialogTitle id="alert-dialog-title"><h1>Already Registered</h1></DialogTitle>
               <DialogContent>
               <DialogContentText id="alert-dialog-description">
               <img src="https://www.pngitem.com/pimgs/m/215-2158015_animated-cross-mark-gif-hd-png-download.png" alt="error" style={{width:"200px",height:"150px"}}/>
               </DialogContentText>
               </DialogContent>
           </Dialog>}
        {open===true &&<Dialog
               open={true}
               style={{textAlign:"center"}}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description">
               <DialogTitle id="alert-dialog-title">Invalid username or password</DialogTitle>
               <DialogContent>
               <DialogContentText id="alert-dialog-description">
               <img src="https://www.pngitem.com/pimgs/m/215-2158015_animated-cross-mark-gif-hd-png-download.png" alt="error" style={{width:"200px",height:"150px"}}/>
               </DialogContentText>
               </DialogContent>
           </Dialog>}
           <Grid item xs></Grid>
           {/* style={{backgroundImage:`url(${process.env.PUBLIC_URL + `/back.jpg`})`,height:"102.5vh",boxShadow:" inset 700px 0px 200px -8px #111"}} */}
               <header className="banner" style={{backgroundImage:`url(${process.env.PUBLIC_URL + `/backback.gif`})`,height:"102.5vh",backgroundPosition:"center",backgroundSize:"1300px 700px",boxShadow:"inset 200px 270px 250px #111, inset -320px -270px 250px #111",backgroundRepeat:"no-repeat"}}>
               <Grid container spacing={5} style={{paddingTop:"8%"}}>
               <Grid item xs={4}></Grid>
                   <Grid item xs={2} >
                   <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                   <form noValidate autoComplete="off" onSubmit={(e)=>(handleLogin(e))} style={{paddingTop:"15%",paddingLeft:"20%",boxShadow:"0px 10px 30px -5px rgba(0, 0, 0, 0.5)",width:"450px",height:"400px",borderRadius:"15px",backgroundColor:"white",color:"black"}}>
                       <h1 className="log">Log-In <LockOpenIcon style={{fontSize:"25px"}}/></h1><br/>
                       <TextField id="outlined-basic" label="Username*" variant="outlined" value={loguser} name="username" onChange={(e)=>setloguser(e.target.value)} style={{width:"400px"}}/><br/><br/>
                       <FormControl variant="outlined">
                       <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
                       <OutlinedInput
                           id="outlined-adornment-password"
                           type={values.showPassword ? 'text' : 'password'}
                           value={logpass} name="password" onChange={(e)=>setlogpass(e.target.value)} style={{width:"400px"}}
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
                       </Button><span style={{color:"red",paddingLeft:"35%"}} onClick={()=>setisFlipped(!isFlipped)}>Not Registered Yet?</span></div>
                       </form>
               <form noValidate autoComplete="off" onSubmit={(e)=>handleSignup(e)} style={{paddingTop:"15%",paddingLeft:"20%",boxShadow:"0px 10px 30px -5px rgba(0, 0, 0, 0.5)",width:"450px",height:"400px",borderRadius:"15px",backgroundColor:"white",color:"black"}}>
                   <h1 className="sign" style={{color:"black"}}>Sign-Up <ExitToAppIcon style={{fontSize:"25px",color:"black"}}/></h1><br/>
               <TextField id="outlined-basic" label="Username*" variant="outlined" value={user} name="username" onChange={(e)=>setuser(e.target.value)} style={{width:"400px"}}/><br/><br/>
               <FormControl variant="outlined">
                       <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
                       <OutlinedInput
                           id="outlined-adornment-password"
                           type={values1.showPassword1 ? 'text' : 'password'}
                           value={pass} name="password" onChange={(e)=>setpass(e.target.value)} style={{width:"400px"}}
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
               <span style={{color:"red",paddingLeft:"35%"}} onClick={()=>setisFlipped(!isFlipped)}>Already Registered?</span></div>
               </form></ReactCardFlip></Grid>
               <Grid item xs={6}></Grid>
           </Grid>
           </header>
           {/* {chec==true && <Main/>} */}
           
   </div>
)
}

export default Login
