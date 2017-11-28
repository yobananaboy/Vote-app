import React, { Component } from 'react';

class DeleteModal extends Component{
  render(){
    return(
    <div className="modal fade" id="delete-poll-modal" tabIndex="-1" role="dialog" aria-labelledby="delete-poll-modal-label" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="delete-poll-modal-label">Delete poll?</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-footer">
              <input type="submit" className="btn btn-danger" data-dismiss="modal" value="Yes" onClick={this.props.onClick} />
              <button type="button" className="btn btn-primary" data-dismiss="modal">No</button>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default DeleteModal;