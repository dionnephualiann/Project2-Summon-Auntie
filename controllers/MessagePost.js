// Message controller


/*
 *  Return all the candy
 */
exports.list = () => {
    return store;



/*
 *  Create Message ( Crud )
 */
exports.create = (candy) => {
    candy.id = uuidV4();
    candy.price = parseFloat(candy.price);
    store.push(candy);

    return candy;
}



/*
 *  Update candy ( crUd )
 */
exports.update = ( newCandy ) => {

  store.forEach((candy, index)=>{
    if(candy.id == newCandy.id ){
      store[index] = newCandy;
      store[index].price = parseFloat(newCandy.price);
    }
  });

  return newCandy;
}
