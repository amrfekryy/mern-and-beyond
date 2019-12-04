export const funcSettings = (taskID) => ({
  path: 'subTasksReducer.data',
  key: 'filtering',
  params: { taskID: taskID },
  then: {
    key: 'counting',
    key_count: '',
    start: 0
  }
})
