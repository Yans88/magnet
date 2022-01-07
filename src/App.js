import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/styles/rsuite-default.css';

import { Login, Main, PageLoading, Register } from './Template';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './router/ProtectedRoute';
import PublicRoute from './router/PublicRoute';


const Home = React.lazy(() => import('./features/Beranda'));
const Personal = React.lazy(() => import('./features/Personal'));
const KetentuanTrading = React.lazy(() => import('./features/KetentuanTrading'));
const ProfilePerusahaan = React.lazy(() => import('./features/ProfilePerusahaan'));
const Pernyataan = React.lazy(() => import('./features/Pernyataan'));
const TypeAccount = React.lazy(() => import('./features/TypeAccount'));
const Setting = React.lazy(() => import('./features/Personal/Setting'));
const HubungiKami = React.lazy(() => import('./features/HubungiKami'));
const Unduh = React.lazy(() => import('./features/Unduh'));
const Setoran = React.lazy(() => import('./features/Setoran'));
const RejectDoc = React.lazy(() => import('./features/RejectDocument'));
const Penarikan = React.lazy(() => import('./features/Penarikan'));
const Autochartist = React.lazy(() => import('./features/Autochartist'));
const AkunBank = React.lazy(() => import('./features/AkunBank'));
const Transfer = React.lazy(() => import('./features/Transfer'));

const getBasename = path => path.substr(0, path.lastIndexOf('/'));

function App({ main }) {

  return (
    <div className="App">
      <Router basename={getBasename(window.location.pathname)}>
        <Switch>
          <PublicRoute exact path="/login">
            <Login />
          </PublicRoute>

          <PublicRoute exact path="/register">
            <Register />
          </PublicRoute>


          <ProtectedRoute path="/">
            <Main>
              <React.Suspense fallback={<PageLoading />}>
                <Route exact path="/" component={Home} />
                <Route exact path="/personal" component={Personal} />
                <Route exact path="/trading_rules" component={KetentuanTrading} />
                <Route exact path="/company_profile" component={ProfilePerusahaan} />
                <Route exact path="/decleration" component={Pernyataan} />
                <Route exact path="/account-type" component={TypeAccount} />
                <Route exact path="/downloads" component={Unduh} />
                <Route exact path="/contact" component={HubungiKami} />
                <Route exact path="/deposit" component={Setoran} />
                <Route exact path="/setting" component={Setting} />
                <Route exact path="/rej-doc" component={RejectDoc} />
                <Route exact path="/withdrawal" component={Penarikan} />
                <Route exact path="/autochartist" component={Autochartist} />
                <Route exact path="/bank-accounts" component={AkunBank} />
                <Route exact path="/internal-transfer" component={Transfer} />
              </React.Suspense>
            </Main>
          </ProtectedRoute>
        </Switch>
      </Router>

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    main: state.main.currentUser
  }
}

export default connect(mapStateToProps)(App);