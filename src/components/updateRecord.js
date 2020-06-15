

import React, { Component } from 'react';
import Home from './Home';



import config from '../azureCosmosDBConfig/config';
import {CosmosClient} from '@azure/cosmos';
const endpoint = config.endpoint
const key = config.key
const databaseId = config.database.id
const containerId = config.container.id
const partitionKey = { kind: 'Hash', paths: ['/Country'] }

const client = new CosmosClient({ endpoint, key })

export class UpdateRecord extends Component {
 

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


async  queryContainerasPerId(Id) {

debugger;
  // query to return all children in a family
  // Including the partition key value of lastName in the WHERE filter results in a more efficient query
  const querySpec = {
    query: 'SELECT VALUE r FROM root r WHERE r.id = @Id',
    parameters: [
      {
        name: '@Id',
        value: Id
      }
    ]
  }
let secrList=[];
  const { resources: results } = await client
    .database(databaseId)
    .container(containerId)
    .items.query(querySpec)
    .fetchAll()
  for (var queryResult of results) {
     secrList.push(queryResult);
  }
  debugger;
  let result=secrList[0];

   this.setState({ id: result.id,
        Country: result.Country,
        ISIN: result.ISIN,
        VALOR: result.VALOR,
        CUSIP: result.CUSIP,
        DESCRIPTION: result.DESCRIPTION,
        SETLLEMENTSTYLE: result.SETLLEMENTSTYLE,
        TYPEODSECURITY: result.TYPEODSECURITY,
        ISSUEDATE: result.ISSUEDATE,
        MATURITYDATE:result.MATURITYDATE})
   
}

 componentDidMount(){
debugger;
     let itemId=this.props.location.search.split('=')    
    this.queryContainerasPerId(itemId[1]);

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
  .then(() =>hm.replaceFamilyItem( { id: _this.state.id,
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
      <h1>Update Record</h1>

      <p>Enter ID:</p>
      <input
      name='id'
      value={this.state.id}
        type='text'
        onChange={this.myChangeHandler}
        disabled
      />

      <p>Enter Country:</p>
      <input
      name='Country'
       value={this.state.Country}
        type='text'
        onChange={this.myChangeHandler}
        disabled
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
        onClick={()=>this.gotoHomeClick()}
    
        type='button'
      />
      </form>
    );
  }
}

