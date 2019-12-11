export const funcSettings = (taskID) => ({
  key: 'filtering',
  path: 'subTasksReducer.data',
  params: { taskID: taskID },
  then: {
    key: 'counting',
    key_count: '',
    start: 0
  }
})
