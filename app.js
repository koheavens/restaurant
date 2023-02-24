// express
const express = require('express')
const app = express()
const port = 3000

// handlebars
const { engine } = require('express-handlebars')
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// static file
app.use(express.static('public'))
// 載入成功可讀取public檔案
// http://localhost:3000/javascripts/bootstrap.js

// load JSON file
const restaurantList = require('./restaurant.json')

// route
app.get('/', (req, res) => {
  // 利用陣列資料傳到handlebars render出畫面
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(
    (item) => item.id.toString() === req.params.id
  )

  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  // console.log(req.query)
  //keyword 來自於input name
  const keyword = req.query.keyword.toLowerCase().trim()

  // filter() + includes()
  let filteredRestaurant = restaurantList.results.filter((item) => {
    const name = item.name.toLowerCase()
    const nameEn = item.name_en.toLowerCase()
    const category = item.category
    return name.includes(keyword) || category.includes(keyword)
  })

  if (filteredRestaurant.length === 0) {
    filteredRestaurant = false
  }
  // console.log(filteredRestaurant)
  res.render('index', {
    restaurants: filteredRestaurant,
    keyword,
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
