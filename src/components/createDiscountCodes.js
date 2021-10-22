import React from "react";
import CodeDataService from "../services/code-service";
import { Button, Grid, Input } from "@material-ui/core"

class CreateDiscountCodes extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeSymbol = this.onChangeSymbol.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveCode = this.saveCode.bind(this);

    this.state = {
      id: null,
      amount: "",
      description: "",
      symbol: ""
    };
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    });
  }

  onChangeSymbol(e) {
    this.setState({
      symbol: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveCode() {
    var codeName = this.state.amount + this.state.symbol + "OFF";

    var data = {
      name: codeName,
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
      <div style={{ textAlign: "center", maxWidth: '100%', fontFamily: "Times New Roman" }} className="form">
        <hr className="new5"></hr>
        <h3 style={{ color: "light grey" }}>Create Discount Code</h3>
        <div>
          <div>
            <Grid container>
              <Grid item md={5}>
                <label htmlFor="name">Enter Amount</label>
                <Input style={{fontFamily: "Times New Roman"}} aria-label="amount" role="textbox" type="text" className="form-control" name="amount" onChange={this.onChangeAmount} required />
              </Grid>
              <Grid item md={5}>
                <label htmlFor="name">Pick either $ or %</label>
                <div style={{ marginLeft: "-70px" }}>
                  <input style={{fontFamily: "Times New Roman"}} aria-label="$" type="radio" value="$" name="symbol" onClick={this.onChangeSymbol} />
                  <label style={{ marginLeft: "30px", transform: "translateY(-43px)" }}>$</label>
                </div>
                <div style={{ marginLeft: "50px", transform: "translateY(-62.5px)" }}>
                  <input style={{fontFamily: "Times New Roman"}} aria-label="%" type="radio" value="%" name="symbol" onClick={this.onChangeSymbol} />
                  <label style={{ marginLeft: "30px", transform: "translateY(-43px)" }}>%</label>
                </div>
              </Grid>
            </Grid>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Input style={{fontFamily: "Times New Roman"}} aria-label="description" role="textbox" type="description" className="form-control" name="descripiton" onChange={this.onChangeDescription} required />
          </div>
          <br />
          <Button style={{ backgroundColor: "#d3d3af", borderColor: "#d3d3af", WebkitTextFillColor: "white" }} size="small" variant="contained" onClick={this.saveCode}>Create</Button>
          <hr className="new5"></hr>
        </div>
      </div>
    );
  }
}

export default CreateDiscountCodes