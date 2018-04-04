import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import {connect} from 'react-redux';
import Image from '../imgs/background3.jpg';
import Hidden from 'material-ui/Hidden';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    background: 'url('+Image+')',
    backgroundSize: '100%',
    backgroundColor: "black",
    width: '100%',
    height: '1200px',
    top: '10px',
    position: 'relative',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      backgroundSize: 'cover', 
      height: '351px',
      top: "-4px"
    },
    
  },
  logoImage: {
    width: "35%",
    
  },
  slogan: {
    color: "white",
    backgroundColor: "rgba(77, 77, 78, 0.38)",
    top: '180px',
    width: '60%',
    position: 'relative',
    flexDirection: "column",
    marginTop: "5px",        
    marginBottom: "5px", 
   alignItems: "center",
   display: "flex",
  
    [theme.breakpoints.down('md')]: {
      display: "flex",
      top: '53px',
      flexDirection: "column",
      alignItems: "center",
     justifyContent: "center",       
     
    },
  },

  mainButton: {
    width:"80%",
    height: "80px",
    [theme.breakpoints.down('md')]: {
      height: "50px",
       
     
    },
  }
 
});

class AppBanner extends React.Component {


  render() {
    const { classes, dispatch } = this.props;
   
    return (
      <div className={classes.root}>
            <div className={classes.slogan}>
                <Hidden mdDown>
                <h2>万人车汇</h2>
                </Hidden>
                <h4>注重服务车主生活</h4>
               
                <Button variant="raised" size="large" color="secondary"  component={Link} to="/open-collective" className={classes.mainButton}>
                  
                    <Hidden mdUp>
                    <Typography
                      variant="title"
                      color="inherit"
                    
                    >
                     立即加入
                    
                    </Typography>
                    </Hidden>
                    <Hidden mdDown>
                    <Typography
                      variant="display1"
                      color="inherit"
                    
                    >
                     立即加入
                    
                    </Typography>
                    </Hidden>
        
              </Button>
                
            </div>
      </div>
    );
  }
}

AppBanner.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapUserState(state){
    return {
        user: state.AppUser
    }
}

export default connect(mapUserState)(withStyles(styles)(AppBanner));