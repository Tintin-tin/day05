#! /usr/bin/env node

const connection=require('./bin/index')

const Koa = require('koa')

const static = require('koa-static')

const router=require('koa-router')()

const bodyparser= require('koa-bodyparser')

const path = require('path')

const query = require('./query.js')

let app = new Koa()

app.use(static(path.join(__dirname,'bin')));

app.use(bodyparser());

app.use(router.routes())



app.use(router.allowedMethods())




router.get('/api/userlist',async (ctx)=>{
   let list = await query('select * from day4');
   console.log(list);
   
    ctx.body={
        code:1,
        dist:list
    }
})

// router.post('/api/add',(ctx)=>{
//     console.log(ctx.request.body);
//     ctx.body = {
//         code:1,
//         msg:'好！'
//     }
// })

app.listen(9000,()=>{
    console.log("服务器启动成功");
})