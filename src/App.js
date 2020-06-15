import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import  Home  from './components/Home';
import { FetchData } from './components/FetchData';
import { AddRecord } from './components/AddRecord';
import { UpdateRecord } from './components/updateRecord';
import { Search } from './components/Search';
import { Authorize } from './components/Authorize';
import { Audit } from './components/Audit';
export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
         <Route exact path='/home' component={Home} />
        <Route path='/addrecord' component={AddRecord} />
          <Route path='/updateRecord' component={UpdateRecord} />
        <Route path='/fetchdata' component={FetchData} />
        <Route path='/authorize' component={Authorize} />
        <Route path='/search' component={Search} />
        <Route path='/audit' component={Audit} />
       
      </Layout>
    );
  }
}
