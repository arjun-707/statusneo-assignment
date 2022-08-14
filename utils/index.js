
const sendResponse = (res, code, message, data = null) => res.status(code).send({
  data,
  message
})

module.exports = {
  sendResponse
}