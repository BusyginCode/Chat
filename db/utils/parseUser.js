export default (user) => ({
  id: user._id,
  email: user.email,
  login: user.login,
})