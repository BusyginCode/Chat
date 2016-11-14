import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import * as loaderActions from 'redux/modules/loader';
import { deleteAuthToken, deleteAuthStoreToken } from 'redux/modules/auth';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router'
import { PassPollDialog } from 'containers'

@connect(state => ({ token: state.auth.token, login: state.auth.login }),
  { deleteAuthStoreToken, ...loaderActions  }
)
export default class Header extends Component {

  constructor() {
    super()
    this.state = {
      passPoll: null
    }
  }

  renderLinks() {
    const styles = require('./headerStyles.js')
    return (
      this.props.token ? 
        <ul className="menu">
          <li style={ styles.link }>
            <Link to="/my" onClick={() => this.props.startLoad()}>Опросы </Link>
          </li>
          <li style={ styles.link }>
            <Link to="/classes" onClick={() => this.props.startLoad()}>Классы</Link>
          </li>
          <li onClick={() => { this.props.deleteAuthStoreToken(); browserHistory.replace('/'); } } style={{ cursor: 'pointer' }}>
            <a>Выход</a>
          </li>
        </ul>
      : <ul className="menu">
          <li style={ styles.link }>
            <Link to="/">Главная </Link>
          </li>
          <li style={ styles.link }>
            <a onClick={() => this.setState({ passPoll: true })}>Пройти опрос</a>
          </li>
          <li style={ styles.link }>
            <Link to="/signIn">Войти</Link>
          </li>
          <li style={ styles.link }>
            <Link to="/signUp">Зарегистрироваться</Link>
          </li>
        </ul>
    )
  }

  render() {
  	const styles = require('./headerStyles.js')
    return (
      <nav style={ styles.headerContainer } className="header bg-header transparent-dark" data-pages="header" data-pages-header="autoresize" data-pages-resize-classname="dark">
        <div className="container relative">
          <div className="pull-left">
            <div className="header-inner">
              <Link to='/'><h1 style={ styles.headerTitle }>Социометр</h1></Link>
              {
                this.props.token ? 
                  <h3 style={{ float: 'left', lineHeight: 68 + 'px', marginLeft: 13 + 'px'}}>{ this.props.login }</h3>
                : null
              }
            </div>
          </div>
           
          <div className="pull-right">
            <div className="header-inner">
              <a href="#" className="search-toggle visible-sm-inline visible-xs-inline p-r-10" data-toggle="search"><i className="fs-14 pg-search"></i></a>
              <div className="visible-sm-inline visible-xs-inline menu-toggler pull-right p-l-10" data-pages="header-toggle" data-pages-element="#header">
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
              </div>
            </div>
          </div>
           
           
          <div className="menu-content mobile-dark pull-right clearfix" data-pages-direction="slideRight" id="header">
            <div className="pull-right">
              <a href="#" className="padding-10 visible-xs-inline visible-sm-inline pull-right m-t-10 m-b-10 m-r-10" data-pages="header-toggle" data-pages-element="#header">
                <i className=" pg-close_line"></i>
              </a>
            </div>
            <div className="header-inner">
              {
                this.renderLinks()
              }
              <a href="#" className="search-toggle hidden-xs hidden-sm" data-toggle="search"><i className="fs-14 pg-search"></i></a>
              <div className="font-arial m-l-35 m-r-35 m-b-20 visible-sm visible-xs m-t-20">
                <p className="fs-11 no-margin small-text p-b-20">Exclusive only at ,Themeforest. See Standard licenses &amp; Extended licenses
                </p>
                <p className="fs-11 small-text muted">Copyright © 2014 REVOX</p>
              </div>
            </div>
          </div>
        </div>
        {
          this.state.passPoll ?
            <PassPollDialog 
              modalOpen={this.state.passPoll}
              closePassPollDialog={() => this.setState({ passPoll: false })}
            />
          : null
        }
      </nav>
    );
  }
}

// <div style={ styles.headerContainer }>
//         <Link to="/" style={ styles.headerTitleLink }><h1 style={ styles.headerTitle }>Sociometr</h1></Link>
//         {
//           !this.props.token ?
//             <div style={ styles.linksContainer }>
//               <Link to="/signIn"><FlatButton backgroundColor="white" label="Sign In"></FlatButton></Link>
//               <Link to="/signUp" style={ styles.signButton } ><FlatButton backgroundColor="white" label="Sign Up"></FlatButton></Link>
//             </div>
//           : <div style={ styles.linksContainer }>
//               <FlatButton onClick={() => deleteAuthToken()} backgroundColor="white" label="Log Out"></FlatButton>
//             </div>
//         }
//       </div>