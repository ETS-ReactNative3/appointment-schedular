import { createSelector } from 'reselect'

const dataSelector = (state) => state.dataReducer

export const Loading = createSelector(
  [dataSelector],
  (dataReducer) => dataReducer.loading
)
export const Success = createSelector(
  [dataSelector],
  (dataReducer) => dataReducer.success
)
export const appointmentsSelector = createSelector(
  [dataSelector],
  (dataReducer) => dataReducer.appointments
)
