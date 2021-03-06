// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection(event.collection).aggregate().lookup({
      from:event.from,
      localField: event.localField,
      foreignField: event.foreignField,
      as: event.as
    })
    .match(event.match)
    .sort(event.sort)
    .end()
  } catch (e) {
    console.error(e)
  }

}