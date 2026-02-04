function createLookUpObject(arrayOfObjs, newObjKey, newObjValue) {
  const lookUpObject = {};

  for (let i = 0; i < arrayOfObjs.length; i++) {
    const keyToAdd = arrayOfObjs[i][newObjKey];
    const valToAdd = arrayOfObjs[i][newObjValue];

    lookUpObject[keyToAdd] = valToAdd;
  }
  return lookUpObject;
}

module.exports = createLookUpObject;
