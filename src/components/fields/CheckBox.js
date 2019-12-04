import React, { Component } from 'react'

export class checkbox extends Component {
  render () {
    return (
      <>
        <input
          {...this.props.fieldSettingsFromJSON}
          {...this.props.formikFieldProps}
        /> {this.props.fieldSettingsFromJSON.label}
      </>
    )
  }
}
