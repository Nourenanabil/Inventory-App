import { Router , Request , Response} from "express";
import express from "express";

import bodyParser from "body-parser"

import { User , Iuser } from "./models/user";
import {Category} from "./models/categories";
import {Item} from "./models/items";
import {Order} from "./models/orders";
import {OrderItems} from "./models/orderItems";
import {Vendor} from "./models/vendors";


import  categoryRouter from "./routers/categories";
import  * as bcrypt from "bcryptjs";

import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSMongoose from "@adminjs/mongoose";



AdminJS.registerAdapter(AdminJSMongoose)

const app = express()



require('./db/mongoose')

const canModify = ({ currentAdmin  }) => {

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
    { resource: Item , options:{
        actions: {
            edit: { isAccessible: canModify },
            delete: { isAccessible: canModify },
        }
    } },
    {
        resource: Order, options: {
            navigation: false,
            
        }
    },
    { resource: OrderItems },
    { resource: Vendor }],
    rootPath: '/admin',
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(categoryRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => {

    console.log("the server is running on port : " + port)
})