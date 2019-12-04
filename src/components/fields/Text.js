import React, { Component } from 'react'
// import { Input } from 'antd'

export class text extends Component {
  render () {
    return (
      <input
        {...this.props.fieldSettingsFromJSON}
        {...this.props.formikFieldProps}
      />
    )
  }
}
