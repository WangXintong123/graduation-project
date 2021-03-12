// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection(event.collection).where(event.where).orderBy(event.type,event.order).limit(100).get()
  } catch(e) {
    console.error(e)
  }
}