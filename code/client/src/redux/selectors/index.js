export const getNotificationsSelector = (state) => {
   return state.notifications;
}

// @index('../reducers/**/*.js', f => `export * from '${f.path}'`)
export * from '../reducers/games'
export * from '../reducers/index'
export * from '../reducers/shop'
export * from '../reducers/user'
// @endindex