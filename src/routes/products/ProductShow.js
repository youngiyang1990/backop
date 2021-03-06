import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {connect} from 'react-redux';

import ProductCarousel from '../../components/products/carousel';
import ProductTabs from '../../components/products/tabs';
import Grid from 'material-ui/Grid';
import { loadOneProduct, loadOneProductByRolename } from '../../actions/products';
import LoadingItem from '../../components/public/LoadingItem'
import Paper from 'material-ui/Paper';
import { setAppLayout } from '../../actions/app';
import Snackbar from 'material-ui/Snackbar';

import ProductBottomBar from '../../components/products/ProductBottomBar';



const styles = theme => ({
    root: {
      margin: theme.spacing.unit * 2,
    },
    productItem: {
        position: "relative",
        width: "23%",
        textAlign: "center",
        [theme.breakpoints.down('md')]: {
            position: "relative",
            width: "45%",
            
          },
        
    },
    productItems:{
        width: "80%",
        position: "relative",
        top: "20px",
        marginBottom: "3%"
    }
  });
 class ProductShow extends Component {
    constructor(props){
        super(props);
        this.state ={
            snackOpen: false,
            snackContent: ""
        }
    }
    handleSnackClose = () => {
        this.setState({ snackOpen: false });
      };
    componentWillReceiveProps(nextProps){
        const { dispatch, match } = nextProps;
        if(nextProps.match.params.id && !match.params.rolename){
            if(this.props.match.params.id !== match.params.id){
                dispatch(loadOneProduct(match.params.id));
            }
        }

        if(nextProps.match.params.rolename && !match.params.id){
            if(this.props.match.params.rolename !== match.params.rolename){
                dispatch(loadOneProductByRolename(match.params.rolename));
                if(match.params.productname){
                    this.setState({
                        snackOpen: true,
                        snackContent: ""+match.params.productname+"，请先购买此商品"
                    })
                }
                
            }
        }
        
        
    }
    componentDidMount(){
        
        const { dispatch, match, history } = this.props;
        
        if(match.params.id && !match.params.rolename){
            dispatch(loadOneProduct(match.params.id));
            
        }
        if(match.params.rolename && !match.params.id){
            dispatch(loadOneProductByRolename(match.params.rolename));
            
        }
        

        dispatch(setAppLayout(
            {
                isBack: true, 
                backTo: "/", 
                title: "产品介绍", 
                hasCart: true, 
                hasBottomNav: false, 
                hasGeoLoc: false,
                hasEditor: false, 
                hasSearch: false,
            }
        ));
        
    }

    render() {
        const { snackOpen, snackContent} =this.state;
        const {classes, appInfo, productShow, match, history} = this.props;
        if(appInfo.error){
            if(appInfo.reason===404 || appInfo.reason===500){
                return (
                    <Grid  container
                    direction="column"
                    justify="space-between"
                    alignContent="center" 
                    alignItems="center"
                    style={{backgroundColor: "white"}}>
                        <h2>服务器错误{appInfo.reason}，马上联系管理员</h2>
                        <h4>Simon 18820965455</h4>
                    </Grid>
                )
            }
            if(appInfo.reason=== "PRODUCT NOT FOUND"){
                return (
                    <Grid  container
                    direction="column"
                    justify="space-between"
                    alignContent="center" 
                    alignItems="center"
                    style={{backgroundColor: "white"}}>
                        <h2>此商品已经下架，敬请期待</h2>
                    </Grid>
                )
            }
        }
        if(productShow.loading){
            return (
                <Grid  container
                direction="column"
                justify="space-between"
                alignContent="center" 
                alignItems="center"
                style={{backgroundColor: "white"}}>
                    <LoadingItem />
                </Grid>
               
            )
        }
        
        return (
            <Grid  container
                direction="column"
                justify="space-between"
                alignContent="center" 
                alignItems="center"
                style={{backgroundColor: "white"}}>
               <ProductCarousel imgs={productShow.product.images}/>
    
                    <Grid container
                        spacing={8}
                        alignItems="center" 
                        alignContent="center"
                        direction="row"
                        justify="space-between"
                        className={classes.productItems}
                    >   
                    <Paper style={{width: "100%", textAlign: "center", padding: 4, margin: 5}}>
                         <div style={{width: "100%", textAlign: "center"}}>{productShow.product.name_zh}</div>
                        <div style={{width: "100%", textAlign: "center", fontWeight: "bolder"}}>{"¥"+productShow.product.endPrice/100}</div>
                        <div style={{width: "100%", textAlign: "center"}} >{productShow.product.brief}</div>
                    </Paper>
                        
                        <div className={classes.productItem} >分享: {"¥"+productShow.product.agencyLevelPrices[0]/100}</div>
                        <div className={classes.productItem} >配送方式: 到店自提（滴滴车主俱乐部）</div>
                        <div className={classes.productItem} >库存: 47</div>
                    </Grid>
                    <div style={{width: "100%"}}>
                       <ProductTabs des={productShow.product.description}/>
                    </div>
                    <br/>
                    
                    <br/>
                    <br/><br/>
                    <br/>
                    <br/><br/>
                    <br/>
                    <br/>
                    <Snackbar
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            open={snackOpen}
                            onClose={this.handleSnackClose}
                            SnackbarContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span style={{width: "40%"}} id="message-id">{snackContent}</span>} 
                            
                        />
                        <div style={{width: "100%"}}>
                    <ProductBottomBar product={productShow.product} history={history} url={match.url}/>
                    </div>
        </Grid>

        );
    }
}

ProductShow.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  function mapToState(state){
      return {
          productShow: state.ProductShow,
          appInfo: state.AppInfo
      }
  }


export default connect(mapToState)(withStyles(styles)(ProductShow)); 