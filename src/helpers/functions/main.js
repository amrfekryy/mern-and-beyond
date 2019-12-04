import { filter, size } from 'lodash'

export const filtering = (settings, dataToBeFiltered, state, props) => {
  return filter(dataToBeFiltered, settings.params)
}

export const counting = (settings, filteredData, state, props) => {
  return size(filteredData)
}
