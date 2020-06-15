import React, { Component } from 'react';
import Home from './Home';
export class AddRecord extends Component {
 

constructor(props) {
    super(props);
      
    this.state = { id: '',
        Country: '',
        ISIN: '',
        VALOR: '',
        CUSIP: '',
        DESCRIPTION: '',
        SETLLEMENTSTYLE: '',
        TYPEODSECURITY: '',
        ISSUEDATE: '',
        MATURITYDATE: ''
 };
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    debugger;
    let _this=this;
    var hm=new Home();
    hm.createDatabase()
.then(() => hm.readDatabase())
  .then(() => hm.createContainer())
  .then(() => hm.readContainer())
  .then(() => hm.scaleContainer())
  .then(() =>hm.createFamilyItem( { id: _this.state.id,
        Country: _this.state.Country,
        ISIN: _this.state.ISIN,
        VALOR: _this.state.VALOR,
        CUSIP: _this.state.CUSIP,
        DESCRIPTION: _this.state.DESCRIPTION,
        SETLLEMENTSTYLE: _this.state.SETLLEMENTSTYLE,
        TYPEODSECURITY: _this.state.TYPEODSECURITY,
        ISSUEDATE: _this.state.ISSUEDATE,
        MATURITYDATE:_this.state.MATURITYDATE
})).
then(()=>
_this.setState({ id: '',
        Country: '',
        ISIN: '',
        VALOR: '',
        CUSIP: '',
        DESCRIPTION: '',
        SETLLEMENTSTYLE: '',
        TYPEODSECURITY: '',
        ISSUEDATE: '',
        MATURITYDATE: ''
}));


    alert("You are summitted " + _this.state.id);

     
  }
  myChangeHandler = (event) => {
      debugger;
       this.setState({
    ... this.state,
    [event.target.name]:  event.target.value
  });
   
  }
     gotoHomeClick=(event) => {
        debugger;
         this.props.history.push('/home');
   
  }
  
  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
      <h1>Add New Record</h1>

      <p>Enter ID:</p>
      <input
      name='id'
      value={this.state.id}
        type='text'
        onChange={this.myChangeHandler}
      />

      <p>Enter Country:</p>
      <input
      name='Country'
       value={this.state.Country}
        type='text'
        onChange={this.myChangeHandler}
      />
      <p>Enter ISIN:</p>
      <input
      name='ISIN'
         value={this.state.ISIN}
        type='text'
        onChange={this.myChangeHandler}
      />
      <p>Enter VALOR:</p>
      <input
       name='VALOR'
         value={this.state.VALOR}
        type='text'
        onChange={this.myChangeHandler}
      />
      <p>Enter CUSIP:</p>
      <input
       name='CUSIP'
        type='text'
         value={this.state.CUSIP}
        onChange={this.myChangeHandler}
      />
      <p>Enter DESCRIPTION:</p>
      <input
       name='DESCRIPTION'
        type='text'
           value={this.state.DESCRIPTION}
        onChange={this.myChangeHandler}
      />
      <p>Enter SETLLEMENT STYLE:</p>
      <input
      name='SETLLEMENTSTYLE'
        type='text'
              value={this.state.SETLLEMENTSTYLE}
        onChange={this.myChangeHandler}
      />
      <p>Enter TYPE of SECURITY:</p>
      <input
      name='TYPEODSECURITY'
        value={this.state.TYPEODSECURITY}
        type='text'
        onChange={this.myChangeHandler}
      />
      <p>Enter ISSUE DATE:</p>
      <input
      name='ISSUEDATE'
        type='text'
         value={this.state.ISSUEDATE}
        onChange={this.myChangeHandler}
      />
       <p>Enter MATURITY DATE:</p>
      <input
      name='MATURITYDATE'
           value={this.state.MATURITYDATE}
        type='text'
        onChange={this.myChangeHandler}
      />
      <hr></hr>
      <input
        type='submit'
      />

        <input
        value="Cancel"
        type='button'
         onClick={()=>this.gotoHomeClick()}
      />
      </form>
    );
  }
}

