// @flow
import 'isomorphic-fetch'
import React from 'react'

import Copy from './Copy'
import Nav from './Nav'
import PersonalInfo from './PersonalInfo'
import Footer from './Footer'

import type { Session } from '../../src/session'
import { login, popupLogin, logout, currentSession } from '../../src/'

export default class App extends React.Component<Object, Object> {
  state: { session: ?Session } = { session: null }

  constructor(props: {}) {
    super(props)
    currentSession().then(session => this.setState({ session }))
  }

  async login() {
    const session = await login({ loginUi: process.env.LOGIN_UI })
    this.setState({ session })
  }

  async loginPopup() {
    const session = await popupLogin({ loginUi: process.env.LOGIN_UI })
    this.setState({ session })
  }

  async logout() {
    await logout()
    this.setState({ session: null })
  }

  render() {
    const loggedIn = this.state.session !== null
    return (
      <div>
        <Nav
          loggedIn={loggedIn}
          onClickLogIn={() => this.login()}
          onClickLogInPopup={() => this.loginPopup()}
          onClickLogOut={() => this.logout()}
        />
        <Copy loggedIn={loggedIn} />
        <PersonalInfo session={this.state.session} />
        <Footer />
      </div>
    )
  }
}