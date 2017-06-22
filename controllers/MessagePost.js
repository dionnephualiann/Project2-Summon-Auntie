// // Message controller
// const uuidV4 = require('uuid/v4');
//
// let messageList = [];
//
// /*
//  *  Return all the Messages
//  */
// exports.list = () => {
//     return messageList;
// }
// /*
//  *  Create Message
//  */
// exports.create = (message) => {
//     message.id = uuidV4();
//     messageList.push(messgae);
//
//     return message;
// }
//
// /*
//  *  Update Message
//  */
// exports.update = ( newMessage ) => {
//
//   messageList.forEach((message, index)=>{
//     if(message.id == newMessage.id ){
//       messageList[index] = newMessage;
//     }
//   });
//   return newMessage;
// }
