import React, { Component } from 'react'

export class textarea extends Component {
  render () {
    return (
      <textarea
        {...this.props.fieldSettingsFromJSON}
        {...this.props.formikFieldProps}
      />
    )
  }
}
