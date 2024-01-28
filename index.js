import express from "express"
import env from "./config/env.config.js"
import productServer from "./router/productRouter.js"
import categoryServer from "./router/categoryRouter.js"
import CarouselImagesRouter from "./router/create_carousel_images_Router.js"
import cors from "cors"
import adminServer from "./router/admin_router.js"
import caruselServer from "./router/caruselRouter.js"

const port = env.PORT

const appServer = express()

appServer.use(express.json())
appServer.use(cors())
appServer.use('/products', productServer)
appServer.use('/categorys', categoryServer)
appServer.use('/carusel', caruselServer)
appServer.use('/create-carousel-images', CarouselImagesRouter)
appServer.use('/admin', adminServer)

appServer.listen(port, () => console.log(`Server Run port ${port} server`))
