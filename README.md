npm i для скачивания node_modules 
npm i -g dbmate скачать обязательно

dbmate up если не работает то npx dbmate up

npm run dev старт проекта 


api  post localhost:3006/auth/signup/  для регистраций
api  post localhost:3006/auth/login/  войти
api  post localhost:3006/auth/refresh/  подтвердить личность
api  post localhost:3006/auth/logout/  выйти
api  get localhost:3006/auth/  пользователи
api  get localhost:3006/auth/:id  пользовател
api  update localhost:3006/auth/update/:id  обновить
api  delete localhost:3006/auth/delete/:id  удалить

//test user
{
    "email": "Alisher@gmail.com",
    "password": "246810A",
    "phone": "888888888",
    "user_name": "Alisher"
}
//



api  post localhost:3006/products/  добавить продукт
api  get localhost:3006/products/:id  продукт
api  get localhost:3006/products/  продукты
api  update localhost:3006/products/:id  обновить
api  delete localhost:3006/products/:id  удалить

//test products
{
    "description": "samsung",
    "price": 5000000,
    "title": "title asl adla slad"
}
//



// добавить изображение продукта в базу данных !!
api  post localhost:3006/images/  добавить изображение
api  get localhost:3006/images/:id  изображение
api  get localhost:3006/images/  изображений
api  update localhost:3006/images/:id  обновить
api  delete localhost:3006/images/:id  удалить

//test image
{
    "img": string,
    "product_id": number
}
//



// добавить изображение продукта file !!
api  post localhost:3006/create-product-images/  добавить изображение
api  get localhost:3006/create-product-images/  извлечь изображение



// добавить изображение карусель file !!
api  post localhost:3006/create-carousel-images/  добавить изображение
api  get localhost:3006/create-carousel-images/  извлечь изображение



api  post localhost:3006/carusel/  добавить изображение
api  get localhost:3006/carusel/:id  изображение
api  get localhost:3006/carusel/  изображений
api  update localhost:3006/carusel/:id  обновить
api  delete localhost:3006/carusel/:id  удалить

//test carusel
{
  "img": string,
  "link": string
}
//



api  post localhost:3006/carts/  добавить изображение
api  get localhost:3006/carts/:id  изображение
api  get localhost:3006/carts/  изображений
api  update localhost:3006/carts/:id  обновить
api  delete localhost:3006/carts/:id  удалить

//test carts
{
    "user_id": number,
    "product_id": number,
    "count": number
}
//



api  post localhost:3006/categorys/  добавить изображение
api  get localhost:3006/categorys/:id  изображение
api  get localhost:3006/categorys/  изображений
api  update localhost:3006/categorys/:id  обновить
api  delete localhost:3006/categorys/:id  удалить

//test categorys
{
    "name": string,
    "parant_id": number
}
//



api  post localhost:3006/categorys-products/  добавить изображение
api  get localhost:3006/categorys-products/  изображений
api  update localhost:3006/categorys-products/  обновить
api  delete localhost:3006/categorys-products/  удалить

//test categorys-products
{
    "product_id": number,
    "category_id": number
}
//
