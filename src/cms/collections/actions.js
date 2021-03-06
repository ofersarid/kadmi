import App from '/src/cms/app/index';
import uuidv4 from 'uuid/v4';
import isEmpty from 'lodash/isEmpty';
import Activity from '/src/cms/activity/index';
import { entityById } from './selectors';

const deleteFile = (path, firebase) => {
  if (!path) return;
  const storageRef = firebase.storage().ref();
  const oldImageRef = storageRef.child(path);
  return oldImageRef.delete();
};

const uploadFile = (file, fileName, firebase, dispatch) => {
  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child(fileName);
  // upload new image
  const task = imageRef.put(file);
  task.on('state_changed', snapshot => {
    dispatch(Activity.actions.uploadStatus(snapshot, fileName));
  }, () => {
    // Handle unsuccessful uploads
  });
  return task.then(snapshot => {
    return snapshot.ref.getDownloadURL();
  });
};

const update = (entity, id, collection, firestore, firebase, dispatch) => {
  const uploads = [];
  const files = Object.keys(entity).reduce((_files, key) => {
    if (entity[key] instanceof File) {
      const extension = entity[key].name.match(/\.[0-9a-z]+$/i)[0];
      const newName = `${uuidv4()}${extension}`;
      _files.push({
        key,
        name: newName,
        file: entity[key],
        promise: uploads.push(uploadFile(entity[key], newName, firebase, dispatch)),
      });
    }
    return _files;
  }, []);
  if (!isEmpty(files)) {
    /* Set activity - uploadingFiles to true */
    dispatch(Activity.actions.uploadingFiles());

    return Promise.all(uploads).then(urls => {
      urls.forEach((url, index) => {
        entity[files[index].key] = url;
        deleteFile(entity[`${files[index].key}-storageLocation`], firebase);
        entity[`${files[index].key}-storageLocation`] = files[index].name;
      });

      /* Set activity - uploadingFiles to false */
      dispatch(Activity.actions.uploadComplete());

      return id !== 'add' ? firestore.collection(collection).doc(id).set(entity) : firestore.collection(collection).add(entity);
    });
  }
  return id !== 'add' ? firestore.collection(collection).doc(id).set(entity) : firestore.collection(collection).add(entity);
};

export const updateEntity = (entity, id, collection) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    return update(entity, id, collection, firestore, firebase, dispatch);
  };
};

export const deleteEntities = collection => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const ids = App.selectors.markedForDelete(getState()).toJS();
    const batch = firestore.batch();
    ids.forEach(id => {
      batch.delete(firestore.collection(collection).doc(id));
      const entity = entityById(id, collection, getState());
      // delete old image
      if (entity.imageStorageLocation) {
        deleteFile(entity.imageStorageLocation, firebase);
      }
      if (entity.pdfStorageLocation) {
        deleteFile(entity.pdfStorageLocation, firebase);
      }
    });
    return batch.commit();
  };
};
