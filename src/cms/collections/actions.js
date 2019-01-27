import App from '/src/cms/app/index';
import uuidv4 from 'uuid/v4';
import isEmpty from 'lodash/isEmpty';
import Activity from '/src/cms/activity/index';
import { eventById } from './selectors';

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

const update = (event, id, collection, firestore, firebase, dispatch) => {
  const uploads = [];
  const files = Object.keys(event).reduce((_files, key) => {
    if (event[key] instanceof File) {
      const extension = event[key].name.match(/\.[0-9a-z]+$/i)[0];
      const newName = `${uuidv4()}${extension}`;
      _files.push({
        key,
        name: newName,
        file: event[key],
        promise: uploads.push(uploadFile(event[key], newName, firebase, dispatch)),
      });
    }
    return _files;
  }, []);
  if (!isEmpty(files)) {
    /* Set activity - uploadingFiles to true */
    dispatch(Activity.actions.uploadingFiles());

    return Promise.all(uploads).then(urls => {
      urls.forEach((url, index) => {
        event[files[index].key] = url;
        deleteFile(event[`${files[index].key}-storageLocation`], firebase);
        event[`${files[index].key}-storageLocation`] = files[index].name;
      });

      /* Set activity - uploadingFiles to false */
      dispatch(Activity.actions.uploadComplete());

      return id !== 'add' ? firestore.collection(collection).doc(id).set(event) : firestore.collection(collection).add(event);
    });
  }
  return id !== 'add' ? firestore.collection(collection).doc(id).set(event) : firestore.collection(collection).add(event);
};

export const updateEntity = (event, id, collection) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    return update(event, id, collection, firestore, firebase, dispatch);
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
      const event = eventById(id, collection, getState());
      // delete old image
      if (event.imageStorageLocation) {
        deleteFile(event.imageStorageLocation, firebase);
      }
      if (event.pdfStorageLocation) {
        deleteFile(event.pdfStorageLocation, firebase);
      }
    });
    return batch.commit();
  };
};
