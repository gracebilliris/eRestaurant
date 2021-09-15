import React from "react";
import CodeDataService from "../services/code-service";
import { Button, TextField } from "@material-ui/core"

class CreateDiscountCodes extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveCode = this.saveCode.bind(this);
    
    this.state = {
      id: null,
      name: "",
      description: ""
    };
  }
  
  onChangeName(e){
    this.setState({
        name: e.target.value
    });
  }

  onChangeDescription(e){
    this.setState({
        description: e.target.value
    });
  }

  saveCode(){
    var data = {
        name: this.state.name,
        description: this.state.description
    };

    CodeDataService.create(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                name: response.data.name,
                description: response.data.description,
            });
            this.props.history.push('/codes')
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
  }
  
  render() {
    return (
      <div style={{textAlign: "center", maxWidth: '100%', fontFamily: "Times New Roman"}} className="form">
        <hr className="new5"></hr>
        <h3 style={{color: "light grey"}}>Create Discount Code</h3>
        <div>
            <div>
                <label htmlFor="name">Code Name</label>
                <TextField type="text" className="form-control" name="name" onChange={this.onChangeName} required/>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <TextField type="description" className="form-control" name="descripiton" onChange={this.onChangeDescription} required/>
            </div>
            <br/>
            <Button style={{backgroundColor: "#d3d3af", borderColor: "#d3d3af", WebkitTextFillColor: "white"}}  size="small" variant="contained" onClick={this.saveCode}>Create</Button>
            <hr className="new5"></hr>
            </div>
        </div>
    );
  }
}

export default CreateDiscountCodes