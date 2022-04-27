const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;

const client = algoliasearch(APP_ID, ADMIN_KEY);

/// Cloud Functions

/// Listings Index

const index = client.initIndex('listings');

exports.addToIndex = functions.firestore.document('listings/{listingsId}')

    .onCreate((snapshot: { data: () => any; id: any; }) => {

        const data = snapshot.data();
        const objectID = snapshot.id;

        return index.saveObject({ ...data, objectID });

    });

exports.updateIndex = functions.firestore.document('listings/{listingsId}')

    .onUpdate((change: { after: { data: () => any; id: any; }; }) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return index.saveObject({ ...newData, objectID });
});

exports.deleteFromIndex = functions.firestore.document('listings/{listingsId}')

    .onDelete((snapshot: { id: any; }) => 
        index.deleteObject(snapshot.id)
    );


/// Listings Index



/// Users Index

const usersIndex = client.initIndex('users');

exports.addToUserIndex = functions.firestore.document('users/{usersId}')

    .onCreate((snapshot: { data: () => any; id: any; }) => {

        const data = snapshot.data();
        const objectID = snapshot.id;

        return usersIndex.saveObject({ ...data, objectID });

    });

exports.updateUserIndex = functions.firestore.document('users/{usersId}')

    .onUpdate((change: { after: { data: () => any; id: any; }; }) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return usersIndex.saveObject({ ...newData, objectID });
});

exports.deleteFromUserIndex = functions.firestore.document('users/{usersId}')

    .onDelete((snapshot: { id: any; }) => 
    usersIndex.deleteObject(snapshot.id)
    );


/// Users Index



/// Commercial Index

const commercialIndex = client.initIndex('commercial');

exports.addToCommercialIndex = functions.firestore.document('listings/{listingsId}')

    .onCreate((snapshot: { data: () => any; id: any; }) => {

        const data = snapshot.data();
        const objectID = snapshot.id;

        const type = data.type;
 
        if (type == 'commercial') {
            return commercialIndex.saveObject({ ...data, objectID });
        } else {
            return null
        }       

    });

exports.updatecommercialIndex = functions.firestore.document('listings/{listingsId}')

    .onUpdate((change:any) => {
        const newData = change.after.data();
        const objectID = change.after.id;

        // ...or the previous value before this update
        const previousValue = change.before.data();

        const oldtype = previousValue.type;
        const newType = newData.type;

        if ( oldtype == 'commercial' ) {

            if (newType == 'commercial') {
                commercialIndex.saveObject({ ...newData, objectID });
            }else if(newType != 'commercial'){
                return commercialIndex.deleteObject(objectID);
            } 
        }else if(oldtype != 'commercial' ){
            if (newType == 'commercial') {
                commercialIndex.saveObject({ ...newData, objectID });
            }
        } else {
            return null
        }   
    });

exports.deleteFromCommercialIndex = functions.firestore.document('listings/{listingsId}')

.onDelete((snapshot: { id: any; }) => 
commercialIndex.deleteObject(snapshot.id)
);
 

/// Commercial Index



/// Residential Index

const residentialIndex = client.initIndex('residential');

exports.addToResidentialIndex = functions.firestore.document('listings/{listingsId}')

    .onCreate((snapshot: { data: () => any; id: any; }) => {

        const data = snapshot.data();
        const objectID = snapshot.id;

        const type = data.type;
 
        if (type == 'residential') {
            return residentialIndex.saveObject({ ...data, objectID });
        } else {
            return null
        }       

    });

exports.updateResidentialIndex = functions.firestore.document('listings/{listingsId}')

    .onUpdate((change:any) => {
        const newData = change.after.data();
        const objectID = change.after.id;

        // ...or the previous value before this update
        const previousValue = change.before.data();

        const oldtype = previousValue.type;
        const newType = newData.type;

        if ( oldtype == 'residential' ) {

            if (newType == 'residential') {
                residentialIndex.saveObject({ ...newData, objectID });
            }else if(newType != 'residential'){
                return residentialIndex.deleteObject(objectID);
            } 
        }else if(oldtype != 'residential' ){
            if (newType == 'residential') {
                residentialIndex.saveObject({ ...newData, objectID });
            }
        } else {
            return null
        }   
    });

exports.deleteFromResidentialIndex = functions.firestore.document('listings/{listingsId}')

.onDelete((snapshot: { id: any; }) => 
residentialIndex.deleteObject(snapshot.id)
);
 

/// Residential Index





/// Villas Index

const villasIndex = client.initIndex('villas');

exports.addToVillasIndex = functions.firestore.document('listings/{listingsId}')

    .onCreate((snapshot: { data: () => any; id: any; }) => {

        const data = snapshot.data();
        const objectID = snapshot.id;

        const type = data.type;
 
        if (type == 'villas') {
            return villasIndex.saveObject({ ...data, objectID });
        } else {
            return null
        }       

    });

exports.updateVillasIndex = functions.firestore.document('listings/{listingsId}')

    .onUpdate((change:any) => {
        const newData = change.after.data();
        const objectID = change.after.id;

        // ...or the previous value before this update
        const previousValue = change.before.data();

        const oldtype = previousValue.type;
        const newType = newData.type;

        if ( oldtype == 'villas' ) {

            if (newType == 'villas') {
                villasIndex.saveObject({ ...newData, objectID });
            }else if(newType != 'villas'){
                return villasIndex.deleteObject(objectID);
            } 
        }else if(oldtype != 'villas' ){
            if (newType == 'villas') {
                villasIndex.saveObject({ ...newData, objectID });
            }
        } else {
            return null
        }   
    });

exports.deleteFromVillasIndex = functions.firestore.document('listings/{listingsId}')

.onDelete((snapshot: { id: any; }) => 
villasIndex.deleteObject(snapshot.id)
);
 

/// Villas Index




/// Apartments Index

const apartmentsIndex = client.initIndex('apartments');

exports.addToApartmentsIndex = functions.firestore.document('listings/{listingsId}')

    .onCreate((snapshot: { data: () => any; id: any; }) => {

        const data = snapshot.data();
        const objectID = snapshot.id;

        const type = data.type;
 
        if (type == 'apartments') {
            return apartmentsIndex.saveObject({ ...data, objectID });
        } else {
            return null
        }       

    });

exports.updateApartmentsIndex = functions.firestore.document('listings/{listingsId}')

    .onUpdate((change:any) => {
        const newData = change.after.data();
        const objectID = change.after.id;

        // ...or the previous value before this update
        const previousValue = change.before.data();

        const oldtype = previousValue.type;
        const newType = newData.type;

        if ( oldtype == 'apartments' ) {

            if (newType == 'apartments') {
                apartmentsIndex.saveObject({ ...newData, objectID });
            }else if(newType != 'apartments'){
                return apartmentsIndex.deleteObject(objectID);
            } 
        }else if(oldtype != 'apartments' ){
            if (newType == 'apartments') {
                apartmentsIndex.saveObject({ ...newData, objectID });
            }
        } else {
            return null
        }   
    });

exports.deleteFromApartmentsIndex = functions.firestore.document('listings/{listingsId}')

.onDelete((snapshot: { id: any; }) => 
apartmentsIndex.deleteObject(snapshot.id)
);
 

/// Apartments Index



/// Beach house Index

const beachHouseIndex = client.initIndex('beach-house');

exports.addToBeachHouseIndex = functions.firestore.document('listings/{listingsId}')

    .onCreate((snapshot: { data: () => any; id: any; }) => {

        const data = snapshot.data();
        const objectID = snapshot.id;

        const type = data.type;
 
        if (type == 'beach-house') {
            return beachHouseIndex.saveObject({ ...data, objectID });
        } else {
            return null
        }       

    });

exports.updateBeachHouseIndex = functions.firestore.document('listings/{listingsId}')

    .onUpdate((change:any) => {
        const newData = change.after.data();
        const objectID = change.after.id;

        // ...or the previous value before this update
        const previousValue = change.before.data();

        const oldtype = previousValue.type;
        const newType = newData.type;

        if ( oldtype == 'beach-house' ) {

            if (newType == 'beach-house') {
                beachHouseIndex.saveObject({ ...newData, objectID });
            }else if(newType != 'beach-house'){
                return beachHouseIndex.deleteObject(objectID);
            } 
        }else if(oldtype != 'beach-house' ){
            if (newType == 'beach-house') {
                beachHouseIndex.saveObject({ ...newData, objectID });
            }
        } else {
            return null
        }   
    });

exports.deleteFromBeachHouseIndex = functions.firestore.document('listings/{listingsId}')

.onDelete((snapshot: { id: any; }) => 
    beachHouseIndex.deleteObject(snapshot.id)
);
 

/// Beach house Index




/// Duplex Index

const duplexIndex = client.initIndex('duplex');

exports.addToDuplexIndex = functions.firestore.document('listings/{listingsId}')

    .onCreate((snapshot: { data: () => any; id: any; }) => {

        const data = snapshot.data();
        const objectID = snapshot.id;

        const type = data.type;
 
        if (type == 'duplex') {
            return duplexIndex.saveObject({ ...data, objectID });
        } else {
            return null
        }       

    });

exports.updateDuplexIndex = functions.firestore.document('listings/{listingsId}')

    .onUpdate((change:any) => {
        const newData = change.after.data();
        const objectID = change.after.id;

        // ...or the previous value before this update
        const previousValue = change.before.data();

        const oldtype = previousValue.type;
        const newType = newData.type;

        if ( oldtype == 'duplex' ) {

            if (newType == 'duplex') {
                duplexIndex.saveObject({ ...newData, objectID });
            }else if(newType != 'duplex'){
                return duplexIndex.deleteObject(objectID);
            } 
        }else if(oldtype != 'duplex' ){
            if (newType == 'duplex') {
                duplexIndex.saveObject({ ...newData, objectID });
            }
        } else {
            return null
        }   
    });

exports.deleteFromDuplexIndex = functions.firestore.document('listings/{listingsId}')

.onDelete((snapshot: { id: any; }) => 
    duplexIndex.deleteObject(snapshot.id)
);
 

/// Duplex Index