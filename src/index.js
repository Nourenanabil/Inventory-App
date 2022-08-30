const express = require('express')

const User = require('./models/user')
const Category = require('./models/categories')
const Item = require('./models/items')
const Order = require('./models/orders')
const OrderItems = require('./models/orderItems')
const Vendor = require('./models/vendors')

const bcrypt = require('bcryptjs')
const categoryRoutes = require('./routers/categories')

const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')

AdminJS.registerAdapter(AdminJSMongoose)

const app = express()

require('./db/mongoose')

const canModify = ({ currentAdmin }) => {

    return currentAdmin && (
        currentAdmin.role === 'admin'
    )
}


const adminJs = new AdminJS({
    resources: [{
        resource: User, options: {

            properties: {

                encryptedPassword: {
                    isVisible: false,
                },
                password: {

                    type: 'string',
                    isVisible: {

                        list: false, edit: true, filter: false, show: false,
                    },
                },
            },
            actions: {

                new: {

                    before: async (request) => {

                        if (request.payload.password) {

                            request.payload = {
                                ...request.payload,
                                encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                                password: undefined,
                            }
                        }
                        return request
                    },
                }
            }
        }
    },
    {
        resource: Category,
    },
    { resource: Item },
    {
        resource: Order, options: {
            navigation: false,
            actions: {
                edit: { isAccessible: canModify },
                delete: { isAccessible: canModify },
            }
        }
    },
    { resource: OrderItems },
    { resource: Vendor }],
    rootPath: '/',
})


const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {

    authenticate: async (email, password) => {

        const user = await User.findOne({ email })
        if (user) {

            const matched = await bcrypt.compare(password, user.encryptedPassword)
            if (matched) {

                return user
            }
        }
        return false
    },
    cookiePassword: 'secret-password',
})

app.use(adminJs.options.rootPath, router)


app.use(express.json())
app.use(categoryRoutes)

const port = process.env.PORT || 3000;

app.listen(port, () => {

    console.log("the server is running on port : " + port)
})