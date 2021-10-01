import React, { Component } from "react";
import CodeDataService from "../services/code-service";
import { Button, TextField } from "@material-ui/core"
import { Link, Switch, Route } from "react-router-dom";
import ViewDiscountCodes from "../components/discountCodes";

class EditDiscountCodes extends Component {
  constructor(props) {
    super(props);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.getCode = this.getCode.bind(this);
      this.updateCode = this.updateCode.bind(this);
      this.deleteCode = this.deleteCode.bind(this);

      this.state = {
        currentCode: {
            id: null,
            name: "",
            description: ""
        },
        message: ""
      };
    }

    componentDidMount() {
        const URL = String(this.props.location.pathname);
        const codeId = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
        this.getCode(codeId);
    }

    onChangeDescription(e) {
        const description = e.target.value;
        this.setState(function (prevState) {
            return {
                currentCode: {
                    ...prevState.currentCode,
                    description: description
                }
            };
        });
    }

    getCode(id) {
        CodeDataService.get(id)
        .then(response => {
            this.setState({
                currentCode: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    updateCode() {
        CodeDataService.update(
            this.state.currentCode
        )
        .then(response => {
            console.log(response.data);
            this.setState({
                message: "The code was updated successfully!"
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    deleteCode() {
        const codeId = this.state.currentCode._id;
        CodeDataService.delete(codeId)
            .then(response => {
                this.props.history.push('/codes')
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentCode } = this.state;

        return (
            <div>
                {currentCode ? (
                <div style={{fontFamily: "Times New Roman", textAlign: "center"}}>
                <hr className="new5"></hr>
                <h3>{currentCode.name} Code</h3>
                <form>
                    <div>
                        <label htmlFor="username">Code Name</label>
                        <TextField type="text" className="form-control" name="username" value={currentCode.name} disabled/>
                    </div>
                    <div>
                        <label htmlFor="description">Code Description</label>
                        <TextField type="textarea" className="form-control" name="description" onChange={this.onChangeDescription} value={currentCode.description}/>
                    </div>
                    <br/>
                    <div>
                        <Button onClick={this.deleteCode}> Delete</Button>
                        <Button type="submit" onClick={this.updateCode}> Update </Button>
                    </div>
                    <br/>
                    <div style={{display: 'inline-block'}}>
                        <Link style={{WebkitTextFillColor: "black"}} to={"/codes"}>Go Back?</Link>
                        <Switch>
                            <Route exact path={"/codes" } component={ViewDiscountCodes}/>
                        </Switch>
                    </div>
                </form>
                <hr className="new5"></hr>
                <p>{this.state.message}</p>
                </div>
                ) : (
                <div>
                    <br />
                    <p>Please click on a Code...</p>
                </div>
            )}
        </div>
        );
    }
}

export default EditDiscountCodes
