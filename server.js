const { planarium } = require('neonplanaria')
const bitquery = require('bitquery')
planarium.start({
  name: "Weather SV DEMO",
  port: 3000,
  onstart: async () => {
    let db = await bitquery.init({ url: "mongodb://localhost:27017", address: "weather" });
    return { db: db };
  },
  onquery: (e) => {
    let code = Buffer.from(e.query, 'base64').toString()
    let req = JSON.parse(code)
    if (req.q && req.q.find) {
      e.core.db.read("weather", req).then((result) => { e.res.json(result) })
    } else {
      e.res.json([])
    }
  }
})
