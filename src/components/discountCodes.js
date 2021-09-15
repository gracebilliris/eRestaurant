import React, { Component } from "react";
import CodeDataService from "../services/code-service";
import { Link, Switch, Route } from "react-router-dom";
import { Grid, ListItem, Button } from "@material-ui/core";
import CreateDiscountCode from "./createDiscountCodes";
import EditDiscountCodes from "./editDiscountCodes";

class ViewCodes extends Component {
  constructor(props) {
    super(props);
    this.retrieveCodes = this.retrieveCodes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCode = this.setActiveCode.bind(this);
    
    this.state = {
      codes: [],
      currentCode: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    const URL = String(this.props.match.path);
    const name = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    const code = { code: name}
    this.retrieveCodes();
  }

  retrieveCodes() {
    CodeDataService.getAllCodes()
      .then(response => {
        this.setState({
          codes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCodes();
    this.setState({
      currentCode: null,
      currentIndex: -1
    });
  }

  setActiveCode(code, index) {
    this.setState({
      currentCode: code,
      currentIndex: index
    });
  }

  render() {
    const { codes, currentCode, currentIndex } = this.state;

    return(
      
      <div style={{fontFamily: "Times New Roman", textAlign: "center", "width":"80%", "marginLeft": "130px"}}>
        <hr className="new5"></hr>
        <h3>Discount Codes</h3>
        <Grid container>
          <Grid item md={4}>
            <h2>Codes List</h2>
            <div className="list-group">
              {codes && codes.map((code, index) => (
                <ListItem style={{}} selected={index === currentIndex} onClick={() => this.setActiveCode(code, index)} divider button style={{padding: "20px"}} key={index}> {code.name} </ListItem>
              ))}
            </div>
            <br/>
            <Button><Link style={{WebkitTextFillColor: "black"}} to={"/codescreate"}>Create a Code</Link></Button>
            <Switch>
              <Route exact path={"/codescreate"} component={CreateDiscountCode}/>
            </Switch>
          </Grid>
          <Grid item md={8}>
            {currentCode ? (
              <div className="beige-border">
                <br/>
                <h3>{currentCode.name} Code</h3>
                <div>
                  <label><strong>Code:</strong></label>{" "}{currentCode.name}
                </div>
                <div>
                  <label><strong>Description:</strong></label>{" "}{currentCode.description}
                </div>
                <br/>
                <Link style={{WebkitTextFillColor: "black"}} to={"/codes/" + currentCode._id}>Edit</Link>
                <Switch>
                  <Route exact path={"/codes/" + currentCode._id} component={EditDiscountCodes}/>
                </Switch>
              </div>
             ) : (
              <div style={{display: "block", paddingTop: "10px", paddingBottom: "75px", marginLeft:"100px"}}>
                <br />
                <p style={{marginLeft:"100px", marginTop: "100px"}}><i>Please click on a Discount Code...</i></p>
                <div style={{float: "left", width: "100%"}}>
              </div>  
              </div>
              
            )}
            </Grid>
        </Grid>
        <br/> 
        <hr className="new5"></hr>
      </div>
    );
  }
}

export default ViewCodes