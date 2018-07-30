import React, { Component } from 'react';
import SubComponent from '../common/SubComponent'
import AttributeForm from '../attributes/AttributeForm'
import axios from "axios";
import $ from 'jquery';

class Attributes extends SubComponent {
    constructor(props) {
        super(props);
        this.state = {
             attributes: [],
             attributeToEdit: {
                 id: null,
                 name: "",
                 values: []
             }
         }
        this.onAttributeAdded = this.onAttributeAdded.bind(this);
      }

    onAttributeAdded(attribute){
        var attributeToUpdate = this.state.attributes.find(function(attr){attr.id === attribute.id});
        if (!attributeToUpdate){
            this.state.attributes.push(attribute);
        } else {
            this.state.attributes[this.state.attributes.indexOf(attributeToUpdate)] = attribute;
        }
        this.state.attributeToEdit = {
            id: null,
            name: "",
            values: []
        }
        $("#editAttribute").modal('toggle');
        const newState = Object.assign({}, this.state);
        this.setState(newState);
    }

    componentDidMount() {
        super.componentDidMount();
        axios
          .get("/api/" + this.props.match.params.project +  "/attribute")
          .then(response => {
            const newState = Object.assign({}, this.state, {
              attributes: response.data
            });
            this.setState(newState);
          })
          .catch(error => console.log(error));
     }


    render() {
        return (
          <div>
            <ul>{
                this.state.attributes.map(function(attribute){
                    return <li>{attribute.name}</li>;
                })
            }</ul>

            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#editAttribute">
              Add
            </button>
            <div className="modal fade" id="editAttribute" tabindex="-1" role="dialog" aria-labelledby="editAttributeLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="editAttributeLabel">Attribute</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <AttributeForm project={this.props.match.params.project}
                                    attribute={this.state.attributeToEdit}
                                    onAttributeAdded={this.onAttributeAdded}/>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        );
    }

}

export default Attributes;
