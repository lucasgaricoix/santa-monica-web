import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FormPage from './pages/form/FormPage';
import ViewPage from './pages/home/ViewPage';
import Header from './pages/home/Header';

const App: React.FC = () => {
  return (
    <>
    <Header />
      <Switch>
        <Route exact path="/" component={ViewPage} />
        <Route path="/form" component={FormPage} />
      </Switch>
    </>
  );
}

export default App;
