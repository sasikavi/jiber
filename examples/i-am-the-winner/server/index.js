const rejibe = require('rejibe-server')

// Whenever someone dispatches 'WIN', they become they new winner!
const winner = (state, action) => {
  switch (action.type) {
    case 'WIN':
      return action.$userId
    default:
      return state
  }
}

// Log in with any userId you want. Wow! Such secure!
const guestLogin = async (credential) => {
  return {userId: credential}
}

// Pass our custom app logic to rejibe
const store = rejibe.createStore({
  reducer: winner,
  onLogin: guestLogin
})

// Start listening for incomming connections
store.start()

// If the server gets this far, then we're doing something right
console.log('I am the Winner is running!')