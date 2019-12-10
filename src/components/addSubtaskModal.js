import React from 'react'
import { Modal, Button } from 'antd'
import { Formik, Form } from 'formik'
import { map } from 'lodash'
import * as subtaskFormJSON from '../subtaskForm.json'
import MiddleComponent from './MiddleComponent'
import { connect } from 'react-redux'
import { setSubTasks } from '../actions'
import { ultimateMapDispatchToProps } from '../helpers/map_dispatch'

// import { addSubTaskToGun, syncFromGunToRedux_subTasks } from '../gunHandlers'
import { addToGun, syncFromGunToRedux } from '../gunHandlers'

class AddSubtaskModal extends React.Component {
  constructor (props) {
    super(props)
    syncFromGunToRedux('subTasks', props.setData)
    this.state = { visible: false }
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };

  onFormSubmit = (values) => {
    console.log('Values submitted from subtasks form: ', values)
    // // dispatch 'setSubTasks' action
    // this.props.setData('subTasks', {...values})
    
    addToGun('subTasks', {...values})
    
    this.setState({
      visible: false,
    })
  }

  renderForm = (FormikProps) => {
    return (
      <Form id='myForm'>
        <br />

        { // create form dynamically using fileds.json and MiddleComponent
          map(subtaskFormJSON.default, (fieldSettingsFromJSON, index) => {
            return (
              <>
                <MiddleComponent key={index}
                  // optionsFor='tasks'
                  selectOptions={this.props.tasks}
                  fieldSettingsFromJSON={{...fieldSettingsFromJSON}}
                /><br /><br />
              </>
            )
          })
        }
        <button type="submit">Add subTask</button>
      </Form>
    )
  }


  render() {
    return (
      <>
        <button type="primary" onClick={this.showModal}>
          Add subTask
        </button>
        <Modal
          title="Add Subtask"
          visible={this.state.visible}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Formik
            initialValues={{
              subtask: '',
              taskID: ''
            }}
            onSubmit={this.onFormSubmit}
          >
            {this.renderForm}
          </Formik>
        </Modal>
      </>
    );
  }
}

// map props to data from redux state
const mapStateToProps = (state) => {
  return {
    users: state.usersReducer.data,
    tasks: state.tasksReducer.data
  }
}

// // map props to action-dispatching functions
// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch_setSubTasks: (data) => dispatch(setSubTasks(data))
//   }
// }

// pass mapped props to App upon export
export default connect(
  mapStateToProps,
  ultimateMapDispatchToProps
)(AddSubtaskModal)
