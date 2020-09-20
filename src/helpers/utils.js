import React from 'react';

const collectionMaker = (jsonObject) => {
  const collectionArray = [];
  Object.keys(jsonObject).forEach((objectId) => {
    const collection = jsonObject[objectId];
    collection.id = objectId;
    collectionArray.push(collection);
  });

  return collectionArray;
};

const optionsMaker = (inputArray) => inputArray.map((t, i, arr) => <option key={t.id} value={t.id}>{arr[i].name}</option>);

export default { collectionMaker, optionsMaker };
