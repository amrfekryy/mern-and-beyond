import { filter, size } from 'lodash'

export const filtering = (plan, dataToBeFiltered, state, props) => {
  return filter(dataToBeFiltered, plan.params)
}

export const counting = (plan, filteredData, state, props) => {
  return size(filteredData)
}
