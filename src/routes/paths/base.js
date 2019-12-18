/*
a request to server_url/api/ returns a list of available rotes and their parameters
*/
module.exports = (router) => {
  router.route('/')
    .get((req, res) => {
      const routes = router.stack.map((route) => (route.route.path))
      res.send(routes)
    })
}
