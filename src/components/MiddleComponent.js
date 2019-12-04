import React, { Component } from 'react'
import { get } from 'lodash'
import * as FieldComponents from './fields'
import { Field } from 'formik'

class MiddleComponent extends Component {
  render () {
    return (
      <>
        <Field name={this.props.fieldSettingsFromJSON.name}>
          {({ field }) => {
            // console.log(`Formik Field Props (${this.props.fieldSettingsFromJSON.type}): `, field)
            const FieldComponent = get(FieldComponents, this.props.fieldSettingsFromJSON.type, FieldComponents.text)
            return (
              <FieldComponent
                fieldSettingsFromJSON={this.props.fieldSettingsFromJSON}
                formikFieldProps={field}
                selectOptions={this.props.selectOptions}
              />
            )
          }}
        </Field>
      </>
    )
  }
}

export default MiddleComponent
