export const SET_ACTIVITIES = 'SET_ACTIVITIES'
export const ADD_ACTIVITY = 'ADD_ACTIVITY'
export const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY'
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY'

const initialState = {
  activities: [],
}

export function activityReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_ACTIVITIES:
      return { ...state, activities: action.activities }
    case ADD_ACTIVITY:
      return { ...state, activities: [action.activity, ...state.activities] }
    case REMOVE_ACTIVITY:
      return { ...state, activities: state.activities.filter((activity) => activity._id !== action.activityId) }
    case UPDATE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.map((activity) => (activity._id === action.activity._id ? action.activity : activity)),
      }
    default:
      return state
  }
}
