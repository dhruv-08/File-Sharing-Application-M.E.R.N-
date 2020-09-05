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
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Axios from 'axios';
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
    const [f, setf] = useState([]);
  const handleShow = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    setOpen(!open);
  };
  function handleRemove(idx,id){
    var array=f;
    var sendArray=send;
      array.splice(idx,1);
      sendArray.splice(idx,1);
      console.log(sendArray);
      console.log(array);
      Axios.post("/remove",{a:array,ide:id,b:sendArray})
      .then(res=>{
          console.log(res);
      }).catch(err=>{
          console.log(err);
      })
  }
  useEffect(() => {
    async function fun(){
      await Axios.get("/list")
      .then(res=>{
          setdata(res.data.sendhis);
          
          setsend(res.data.user.sender)
          setf(res.data.user.history);
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
    }
    fun();
  }, [])
    return (
        <div>
            <div>
                <Grid container className="mainLeft">
                    <Grid item xs={2} className="Left"> 
                    <div className="logo">
                        <Grid container>
                            <Grid item xs={1} style={{paddingTop:"7%"}}>
                                <ArrowBackIosIcon style={{paddingTop:"100%",paddingLeft:"60%",fontSize:"15px",color:"grey"}}/>
                            </Grid>
                            <Grid item xs={9}>
                            <img className="img-logo" src={process.env.PUBLIC_URL + '/logo.png'}/>
                            </Grid>
                        </Grid>
                    </div><br/>
                    <Button variant="contained" style={{backgroundColor:"#4782ff",color:"white"}} className={classes.button}><span style={{fontSize:"17px"}}>Send</span>&nbsp;&nbsp;&nbsp;<SendIcon/></Button>
                    <br/>
                    <div style={{}}>
                    <h1 style={{fontWeight:"normal",fontSize:"25px",paddingLeft:"12%"}}>Files</h1>
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
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <InsertDriveFileIcon style={{color:"grey"}} />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>
                        </List>
                    </Collapse>
                    </List></div>
                    </div>
                    </Grid>
                    
                    <Grid item xs={10} className="Right">
                        <div style={{paddingLeft:"2%",paddingTop:"2%"}}>
                            <Grid container>
                                <Grid item xs={11}>
                                <SearchBar onChange={() => console.log('onChange')} onRequestSearch={() => console.log('onRequestSearch')} style={{maxWidth: 1150}}/>
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
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                                </Menu>
                                </Grid>
                            </Grid><br/>
                        <h1 style={{fontWeight:"normal",fontSize:"25px"}}>Quick Access</h1>
                            <div className="row_row">
                                <div className="row_item"><span className="text"><InsertDriveFileIcon style={{color:"grey",fontSize:"60px"}} /></span></div>
                                <div className="row_item"><span className="text"><InsertDriveFileIcon style={{color:"grey",fontSize:"60px"}} /></span></div>
                                <div className="row_item"><span className="text"><InsertDriveFileIcon style={{color:"grey",fontSize:"60px"}} /></span></div>  
                                <div className="row_item"><span className="text"><InsertDriveFileIcon style={{color:"grey",fontSize:"60px"}} /></span></div>
                                <div className="row_item"><span className="text"><InsertDriveFileIcon style={{color:"grey",fontSize:"60px"}} /></span></div>
                            </div>
                            <div style={{paddingTop:"225px"}}>
                            <h1 style={{fontWeight:"normal",fontSize:"25px"}}>Recent</h1>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Sender</TableCell>
                                        <TableCell align="right">Download</TableCell>
                                        <TableCell align="right">Remove</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
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
