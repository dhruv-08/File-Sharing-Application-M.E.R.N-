import { Button, Collapse, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import "../CSS/Home.css"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import SearchBar from "material-ui-search-bar";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import FlipMove from 'react-flip-move';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Axios from 'axios';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      width:"235px",
      height:"50px"
    },
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
      nested: {
        paddingLeft: theme.spacing(4),
      },
      table: {
        maxWidth:1200,
      },
  }));
function Home() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [data, setdata] = useState([])
    const [send, setsend] = useState([])
    const [userdata, setuserdata] = useState('')
    const [f, setf] = useState([]);
    const [fil, setfil] = useState([]);
    const [recent, setrecent] = useState([])
    const [check, setcheck] = useState(false);
    const [search, setsearch] = useState('');
    const [value, setvalue] = useState('');
    const [tot, settot] = useState([])
    const [ar, setar] = useState([])
    const [ar1, setar1] = useState([])
  const handleShow = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    setOpen(!open);
  };
  const handlesearch=()=>{
    var full=fil.filter(menu=>{
        var t=(menu.filename);
        return (t.toLowerCase().includes(value));
    });
    if(value!==""){
        console.log("hel")
    var arr=[],arr1=[];
    for(var i=0;i<full.length;i++){
        if(fil.includes(full[i])){
            arr.push(ar[i]);
            arr1.push(ar1[i]);
        }
    }
        setdata(arr);
        setsend(arr1);
    }
    setf(full);
    setdata(ar);
    setsend(ar1);
}
  function handleRemove(idx,id){
    var array=f;
    var sendArray=send;
      array.splice(idx,1);
      sendArray.splice(idx,1);
      var d=data;
      d.splice(idx,1);
      setdata(d);
      console.log(sendArray);
      console.log(array);
      Axios.post("/remove",{a:array,ide:id,b:sendArray},{timeout:2000})
      .then(res=>{
          console.log(res);
      }).catch(err=>{
          console.log("Done!!");
      })
      setcheck(!check);
  }
  useEffect(() => {
    async function fun(){
      await Axios.get("/list")
      .then(res=>{
          setuserdata(res.data[0].sendername.username);
          setdata(res.data[0].sendhistory);
          setsend(res.data[0].sendername.sender)
          setf(res.data[0].sendername.history);
          setfil(res.data[0].sendername.history);
          setar1(res.data[0].sendername.sender);
          setar(res.data[0].sendhistory);
          setrecent(res.data[0].sendername.history.slice(0,5));
        settot(res);
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
    }
    fun();
  }, [check])
    return (
        <div>
            <div>
                <Grid container className="mainLeft">
                    <Grid item xs={2} className="Left" style={{backgroundColor:"#f7f9fa"}}> 
                    <div className="logo">
                        <Grid container>
                            <Grid item xs={1} style={{paddingTop:"7%"}}>
                                <ArrowBackIosIcon style={{paddingTop:"100%",paddingLeft:"60%",fontSize:"15px",color:"grey"}}/>
                            </Grid>
                            <Grid item xs={3}>
                            <img className="img-logo" src={process.env.PUBLIC_URL + '/logo.png'}/>
                            </Grid>
                            <Grid item xs={8} style={{paddingTop:"13%"}}>
                            <span style={{paddingLeft:"15%"}}>Hey! {userdata}</span>
                            </Grid>
                        </Grid>
                    </div><br/>
                    <Button variant="contained" style={{backgroundColor:"#4782ff",color:"white"}} className={classes.button}><span style={{fontSize:"17px"}}>Send</span>&nbsp;&nbsp;&nbsp;<SendIcon/></Button>
                    <br/>
                    <div style={{}}>
                    <h1 style={{fontWeight:"normal",fontSize:"25px",paddingLeft:"12%"}}>Recent</h1>
                    <div style={{paddingLeft:"5%"}}>
                    <List>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                        <InsertDriveFileIcon style={{color:"grey"}} />
                        </ListItemIcon>
                        <ListItemText primary="My Files" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <FlipMove>
                            {recent.map((m,idx)=>
                                <a style={{textDecoration:"none",color:"black"}} href={data[idx]} download><ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                    <InsertDriveFileIcon style={{color:"grey"}} />
                                    </ListItemIcon>
                                    <ListItemText>{recent[idx].filename}</ListItemText>
                                </ListItem></a>
                            )}
                            </FlipMove>
                        </List>
                    </Collapse>
                    </List></div>
                    </div>
                    </Grid>
                    
                    <Grid item xs={10} className="Right">
                        <div style={{paddingLeft:"2%",paddingTop:"2%"}}>
                            <Grid container>
                                <Grid item xs={11}>
                                <SearchBar onChange={(v) =>setvalue(v)} onRequestSearch={() => handlesearch()} style={{maxWidth: 1150}}/>
                                </Grid>
                                <Grid item xs={1}>
                                <AccountCircleIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleShow} style={{paddingTop:"5%",paddingLeft:"30%",fontSize:"40px"}}/>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <Link to="/" style={{textDecoration:"none",color:"black"}}><MenuItem onClick={handleClose}>Logout</MenuItem></Link>
                                </Menu>
                                </Grid>
                            </Grid><br/>
                        {/* <h1 style={{fontWeight:"normal",fontSize:"25px"}}>Quick Access</h1>
                            <div className="row_row">
                                <div className="row_item"><span className="text"><InsertDriveFileIcon style={{color:"grey",fontSize:"60px"}} /></span></div>
                                <div className="row_item"><span className="text"><InsertDriveFileIcon style={{color:"grey",fontSize:"60px"}} /></span></div>
                                <div className="row_item"><span className="text"><InsertDriveFileIcon style={{color:"grey",fontSize:"60px"}} /></span></div>  
                                <div className="row_item"><span className="text"><InsertDriveFileIcon style={{color:"grey",fontSize:"60px"}} /></span></div>
                                <div className="row_item"><span className="text"><InsertDriveFileIcon style={{color:"grey",fontSize:"60px"}} /></span></div>
                            </div> */}
                            <div >
                            <h1 style={{fontWeight:"normal",fontSize:"25px"}}>Files</h1>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell  style={{fontWeight:"bold"}}>Name</TableCell>
                                        <TableCell  style={{fontWeight:"bold"}} align="right">Sender</TableCell>
                                        <TableCell  style={{fontWeight:"bold"}} align="right">Download</TableCell>
                                        <TableCell  style={{fontWeight:"bold"}} align="right">Remove</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody className="tablebody">
                                    <FlipMove>
                                    {f.map((row,idx) => (
                                        <TableRow key={idx}>
                                        <TableCell component="th" scope="row">
                                            {f[idx].filename}
                                        </TableCell>
                                        <TableCell align="right">{send[idx]}</TableCell>
                                        <TableCell align="right"><a href={data[idx]} style={{textDecoration:"none",color:"black"}} download><CloudDownloadIcon style={{fontSize:"40px"}}/></a></TableCell>
                                        <TableCell align="right"><CloseIcon onClick={()=>handleRemove(idx,f[idx].id)}/></TableCell>
                                        </TableRow>
                                    ))}
                                    </FlipMove>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Home
