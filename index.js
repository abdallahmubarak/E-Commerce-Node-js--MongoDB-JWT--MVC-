const express =require('express')
const path =require('path')
const cors =require('cors')

require('dotenv').config()
require('./config/db')

const app =express()

app.use(cors())
app.use(express.static(path.join(__dirname,'../static')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const userRoutes =require('./routes/user.routes')
const productRoutes =require('./routes/product.routes')
const adminRoutes =require('./routes/admin.routes')
const categoryRoutes =require('./routes/category.routes')
const subCategoryRoutes =require('./routes/subCategory.routes')
const order =require('./routes/order.routes')


app.use('/api/user',userRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/product',productRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/subCategory',subCategoryRoutes)
app.use('/api/order',order)


app.listen(
    process.env.PORT,
    ()=>console.log(`connect to ${process.env.PORT}`)
)