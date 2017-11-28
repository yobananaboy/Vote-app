import React from 'react';

function NewItemInput(props) {
  return(
      <div className="form-group row">
          <div className="col-12 col-md-10">
            <input type="text" className="newItemInput form-control" id={props.id} onChange={props.updateVoteItem} value={props.newItem} />
          </div>
          <div className="col-12 col-md-2">
            <button className="btn btn-primary newItemInputBtn" id={props.id} onClick={props.addVoteItem}>Add</button>
          </div>
      </div>
  );
}

export default NewItemInput;