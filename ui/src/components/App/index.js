import React, { Component } from 'react';
import NavBar from 'components/NavBar';
import { withRouter, Redirect, Switch, Route } from 'react-router-dom';
import HotkeyHelp from 'components/HotkeyHelp';
import isHotkey from 'is-hotkey';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toggleHelp, toggleZen } from 'store/modules/hotKeys';

// Pages
import HomePage from 'pages/HomePage';
import WikiPage from 'pages/WikiPage';
import NewWikiPage from 'pages/NewWikiPage';
import EditWikiPage from 'pages/EditWikiPage';
import SettingsPage from 'pages/SettingsPage';
import SearchPage from 'pages/SearchPage';
import ExplorePage from 'pages/ExplorePage';

const Wrapper = styled.div`
  position: relative;
`;

const isZenMode = isHotkey('mod+z');
const isHelpMode = isHotkey('mod+/');

class App extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleZen);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleZen);
  }

  handleZen = e => {
    if (isZenMode(e)) {
      this.props.toggleZen();
    }
    if (isHelpMode(e)) {
      this.props.toggleHelp();
    }
  };

  render() {
    return (
      <Wrapper>
        <NavBar />
        <Switch>
          <Route exact path="/wiki" component={HomePage} />
          <Route path="/wiki/explore" component={ExplorePage} />
          <Route path="/wiki/settings" component={SettingsPage} />
          <Route path="/wiki/new/:page*" component={NewWikiPage} />
          <Route path="/wiki/edit/:page*" component={EditWikiPage} />
          <Route path="/wiki/:page*" component={WikiPage} />
          <Route path="/search" component={SearchPage} />
          <Redirect to="/wiki" />
        </Switch>
        <HotkeyHelp />
      </Wrapper>
    );
  }
}

export default withRouter(connect(undefined, { toggleHelp, toggleZen })(App));
