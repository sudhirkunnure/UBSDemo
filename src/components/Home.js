import React, { Component } from 'react';
import Cosmos from '../azureCosmosDBConfig/Cosmos';
import config from '../azureCosmosDBConfig/config';
import {CosmosClient} from '@azure/cosmos';
const endpoint = config.endpoint
const key = config.key
const databaseId = config.database.id
const containerId = config.container.id
const partitionKey = { kind: 'Hash', paths: ['/Country'] }

const client = new CosmosClient({ endpoint, key })


export default class Home extends Component {
  displayName = Home.name

constructor(props){
  super();
  this.state={secList:[]};




}

async  createDatabase() {
  const { database } = await client.databases.createIfNotExists({
    id: databaseId
  })
  console.log(`Created database:\n${database.id}\n`)
}

/**
 * Read the database definition
 */
async  readDatabase() {
  const { resource: databaseDefinition } = await client
    .database(databaseId)
    .read()
  console.log(`Reading database:\n${databaseDefinition.id}\n`)
}

/**
 * Create the container if it does not exist
 */
async  createContainer() {
  const { container } = await client
    .database(databaseId)
    .containers.createIfNotExists(
      { id: containerId, partitionKey },
      { offerThroughput: 400 }
    )
  console.log(`Created container:\n${config.container.id}\n`)
}

/**
 * Read the container definition
 */
async  readContainer() {
  const { resource: containerDefinition } = await client
    .database(databaseId)
    .container(containerId)
    .read()
  console.log(`Reading container:\n${containerDefinition.id}\n`)
}

/**
 * Scale a container
 * You can scale the throughput (RU/s) of your container up and down to meet the needs of the workload. Learn more: https://aka.ms/cosmos-request-units
 */
async  scaleContainer() {
  const { resource: containerDefinition } = await client
    .database(databaseId)
    .container(containerId)
    .read()
  const {resources: offers} = await client.offers.readAll().fetchAll();
  
  const newRups = 500;
  for (var offer of offers) {
    if (containerDefinition._rid !== offer.offerResourceId)
    {
        continue;
    }
    offer.content.offerThroughput = newRups;
    const offerToReplace = client.offer(offer.id);
    await offerToReplace.replace(offer);
    console.log(`Updated offer to ${newRups} RU/s\n`);
    break;
  }
}

/**
 * Create family item if it does not exist
 */
async  createFamilyItem(itemBody) {
  const { item } = await client
    .database(databaseId)
    .container(containerId)
    .items.upsert(itemBody)
  console.log(`Created family item with id:\n${itemBody.id}\n`)
}

/**
 * Query the container using SQL
 */




async  queryContainer() {
  console.log(`Querying container:\n${config.container.id}`)

  // query to return all children in a family
  // Including the partition key value of lastName in the WHERE filter results in a more efficient query
  const querySpec = {
    query: 'SELECT VALUE r FROM root r',
    // // parameters: [
    // //   {
    // //     name: '@lastName',
    // //     value: 'Andersen'
    // //   }
    // ]
  }

let secrList=[];
  const { resources: results } = await client
    .database(databaseId)
    .container(containerId)
    .items.query(querySpec)
    .fetchAll()
  for (var queryResult of results) {
   // let resultString = JSON.stringify(queryResult)
    secrList.push(queryResult);
  }

  this.setState({secList:secrList});
}

/**
 * Replace the item by ID.
 */
async  replaceFamilyItem(itemBody) {


  const { item } = await client
    .database(databaseId)
    .container(containerId)
    .item(itemBody.id, itemBody.Country)
    .replace(itemBody)
}

/**
 * Delete the item by ID.
 */
async  deleteFamilyItem(itemBody,itemeID) {

  if(itemeID){
let  itemID=itemeID;
let  country=itemBody.Country;
  await client
    .database(databaseId)
    .container(containerId)
    .item(itemID, country)
    .delete(itemBody)
  console.log(`Deleted item:\n${itemID}\n`)
  }
}

/**
 * Cleanup the database and collection on completion
 */
async  cleanup() {
  await client.database(databaseId).delete()
}

/**
 * Exit the app with a prompt
 * @param {string} message - The message to display
 */
//  exit(message) {
//   console.log(message)
//   console.log('Press any key to exit')
//   process.stdin.setRawMode(true)
//   process.stdin.resume()
//   process.stdin.on('data', process.exit.bind(process, 0))
// }

componentDidMount(){
  debugger;
this.createDatabase()
.then(() => this.readDatabase())
  .then(() => this.createContainer())
  .then(() => this.readContainer())
  .then(() => this.scaleContainer())
 .then(() => this.createFamilyItem(config.items[0]))
 .then(() => this.createFamilyItem(config.items[1]))
 .then(() => this.createFamilyItem(config.items[2]))
 // .then(() => this.createFamilyItem(config.items.Wakefield))
  .then(() => this.queryContainer())
//  .then(() => this.replaceFamilyItem(config.items.Andersen))
//  .then(() => this.queryContainer())
 // .then(() => this.deleteFamilyItem(config.items[0]))
  // .then(() => {
  //   this.exit(`Completed successfully`)
  // })
  // .catch(error => {
  //   this.exit(`Completed with error ${JSON.stringify(error)}`)
  // })
}
  DeleteHandler = (event) => {
      debugger;
    let delObj=  this.state.secList.filter(obj=>obj.id===event);
    this.deleteFamilyItem(delObj[0],event).then(()=>this.queryContainer());
  }

    gotoEdit=(itemId) => {
        debugger;
         this.props.history.push('/updateRecord?id='+itemId);
   
  }

  render() {
    return (
      <div>
        <h1>Sanction Securities</h1>

         <table className='table'>
        <thead>
          <tr>
          
           <th>ID</th>
            <th>Country</th>
            <th>ISIN</th>
            <th>VALOR</th>
            <th>CUSIP</th>
            <th>DESCRIPTION</th>
            <th>SETLLEMENTSTYLE</th>
            <th>TYPEODSECURITY</th>
            <th>ISSUEDATE</th>
            <th>MATURITYDATE</th>
            <th>Delete</th>
            <th>Edit</th>
                </tr>
        </thead>
        <tbody>
           {this.state.secList && this.state.secList.map(item=>

            <tr>
               <td>{item.id}</td>
              <td>{item.Country}</td>
                <td>{item.ISIN}</td>
              <td>{item.VALOR}</td>
               <td>{item.CUSIP}</td>
              <td>{item.DESCRIPTION}</td>
                <td>{item.SETLLEMENTSTYLE}</td>
              <td>{item.TYPEODSECURITY}</td>
               <td>{item.ISSUEDATE}</td>
              <td>{item.MATURITYDATE}</td>
                 <td> <input
        value="Delete"
        type='button'
        onClick ={() => this.DeleteHandler(item.id) }
      /></td>
              <td> <input
        value="Edit"
        type='button'
        onClick={()=>this.gotoEdit(item.id)}
      /></td>
                
            </tr>
           )}
        </tbody>
      </table>
          </div>
    );
  }
}
