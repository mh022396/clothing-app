
import { initializeApp } from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithEmailAndPassword, 
    signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword,
    signOut, onAuthStateChanged} 
    from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPP2ZlXudZLZviWePtHw2hodYw5LoCt94",
    authDomain: "crwn-clothing-db-c1bcf.firebaseapp.com",
    projectId: "crwn-clothing-db-c1bcf",
    storageBucket: "crwn-clothing-db-c1bcf.appspot.com",
    messagingSenderId: "172863361786",
    appId: "1:172863361786:web:5bceee1c2c36bfbec2ef43"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

//set provider to google (could be other like fb, github or custom provider)
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account',
});

//get our authenticator (in firebase) entire app
export const auth = getAuth();

//store function to create sign in pop up for google users (authenticated user stored in firebase)
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
//store function to create sign in redirect for google users (authenticated user stored in firebase)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
//store function to create user email and password on firebase (authenticated user stored in firebase)
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

//store function to 
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

//get our database
export const db = getFirestore();

//Create new document in user collection (firebase storage)
export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if(!userAuth) return;
    //get or create reference in database (based on users collection and userid)
    const userDocRef = doc(db, 'users', userAuth.uid); //database, collection, id(doc)
    //get the actual data
    const userSnapshot = await getDoc(userDocRef);
    //if no data exists, create it (user -> id: {displayName, email, time created}) (collection -> doc: {data})
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createAt = new Date();
        try {
            //create new data: get reference in database and pass data to store
            await setDoc(userDocRef, {displayName, email, createAt, ...additionalInfo}); 
        } catch (error) {
            console.log('Error creating user ', error.message);
        }
    }
    //data already or now exists, return
    return userDocRef;
}

//sign out current auth user (auth keeping track of user)
export const signOutUser = async () => await signOut(auth);

//When auth state changes (user or user == null) callback function is invoked
//Unsub function is returned from onAuthStateChanged()
//Unsub this function when component is not mounted or object/data not in scope
export const onAuthStateChangedListener = (callback) => {
    if(!callback) return;
    onAuthStateChanged(auth, callback);//auth will be passed to the callback as a parameter
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionReference = collection(db, collectionKey);//get the reference to the identified collection
    const batch = writeBatch(db); //enables writing methods before sending to db

    objectsToAdd.forEach((object) => {
        const docReference = doc(collectionReference, object.title.toLowerCase()); //reference to doc in specified collection (create doc temp if doc doesnt exist)
        batch.set(docReference, object)//in the doc specified, set value
    });

    await batch.commit(); //wait for batch to finish 
    console.log('done');
}

export const getCategoriesAndDocuments = async () => {
    const collectionReference = collection(db, 'categories'); //get 'categories' collection reference
    const q = query(collectionReference);

    const querySnapShot = await getDocs(q); //will get all docs in collectionReference
    return querySnapShot.docs.map(docSnapshot => docSnapshot.data());
}

// export const getCategoriesAndDocuments = async () => {
//     const collectionReference = collection(db, 'categories'); //get 'categories' collection reference
//     const q = query(collectionReference);

//     const querySnapShot = await getDocs(q); //will get all docs in collectionReference

//     const categoryMap = querySnapShot.docs.reduce((acc, docSnapshot) => {//for each doc
//         const {title, items} = docSnapshot.data(); 
//         acc[title.toLowerCase()] = items; //looping through the snap shot will add to object: {title: items->(id, imageUrl, name, price)}
//         return acc;
//     }, {});

//     return categoryMap;// {title-1: items-1, title-2: items-2, ...}
// }