import { Button, Collapse, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import React from 'react'
import "../CSS/Home.css"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      width:"235px",
    },
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
      nested: {
        paddingLeft: theme.spacing(4),
      },
  }));
function Home() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
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
                    <Button variant="contained" style={{backgroundColor:"#4782ff",color:"white"}} className={classes.button}>Send&nbsp;&nbsp;&nbsp;<SendIcon/></Button>
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
                       
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Home
