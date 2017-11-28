import React, { Component } from 'react';

class PollModal extends Component{
  render(){
    var listitems = this.props.pollItems.map((item, index) => {
      return <li key={index} id={index} className="list-group-item">{item}<button id={index} className="btn btn-danger list-delete-button" onClick={this.props.onClick}>Delete</button></li>;
    });
    var addItem = "";
    if(this.props.pollItems.length < 10) {
      addItem = <form className="add-list-item" onSubmit={this.props.addToList}>
                  <div className="form-group row">
                    <label htmlFor="newItem" className="col-12 col-form-label">New vote item</label>
                    <div className="col-12 col-md-10">
                      <input type="text" className="form-control" id="newItem" onChange={this.props.onChange} value={this.props.newListItem} />
                    </div>
                    <div className="col-12 col-md-2">
                      <button className="btn btn-primary" id="newItemBtn" type="submit">Add</button>
                    </div>
                  </div>
              </form>;
    }
    return(
    <div className="modal fade" id="new-poll-modal" tabIndex="-1" role="dialog" aria-labelledby="new-poll-modal-label" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="new-poll-modal-label">Add new poll</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
              <div className="form-group">
                  <label htmlFor="pollName">Poll title</label>
                  <input type="text" className="form-control" id="pollName" aria-describedby="pollNameHelp" onChange={this.props.onChange} value={this.props.newCategoryTitle} />
                  <small id="pollNameHelp" className="form-text text-muted">Suggest a name for a new poll. E.g. 'Are cats better than dogs?'</small>
              </div>
              <div className="form-group">
                <ul className="list-group">
                  {listitems}
                </ul>
              </div>
              {addItem}
            <div className="modal-footer">
                <input type="submit" className="btn btn-primary" data-dismiss="modal" value="Add poll" onClick={this.props.savePoll} />
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.props.clearInput}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

          /*<div className="form-group">
            <label for="modalGroupInput">Recipe</label>
            <input type="text" className="form-control" id="recipeTitle" placeholder={this.props.recipePlaceholder} value={this.props.recipeValue} onChange={this.props.onChange} />
          </div>
          <div class="form-group">
              <label for="modalGroupInput2">Ingredients</label>
              <input type="text" className="form-control" id="ingredients" placeholder={this.props.ingredientsPlaceholder} value={this.props.ingredientsValue} onChange={this.props.onChange} />
          </div>
          <div className="modal-footer">
                <input type="submit" className="btn btn-primary" value="Save" />
                <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
        </div>*/


export default PollModal;