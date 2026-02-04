.

🛒 E-commerce Backend API

A scalable and lightweight E-commerce backend built using Node.js, Express, and MongoDB, featuring product management, image uploads, filtering, search, and pagination.

🚀 Tech Stack

Node.js – JavaScript runtime
Express.js – Backend framework
MongoDB – Database
Mongoose – MongoDB ODM
Cloudinary – Image & poster storage
nanoid – Short & unique product IDs
dotenv – Environment variable management
express-fileupload – File upload handling
cors-connection backend with frontend

APIs Overview

1️⃣ POST UPLOAD PRODUCT
ROUTE-baseurl/api/v1/products/add

2️⃣ Get All Products And Get Filtered Product
ROUTE- baseurl/api/v1/products?page=page&category=category&q=query

3️⃣ Get Single Product
ROUTE- baseurl/api/v1/products/productId

4️⃣ Get Releated Products
ROUTE- baseurl/api/products/releted?category=category

-ALL GET APIs RETURN DATA-

product's  -objectArray
pageNo  -number
totalPage  -number
perPageProducts  -number
totalproducts  -number 
