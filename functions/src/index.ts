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



/// Land Sale Index

const land_sale_Index = client.initIndex('Land_sale');

exports.addToLand_for_sale_Index = functions.firestore.document('listings/{listingsId}')

    .onCreate((snapshot: { data: () => any; id: any; }) => {

        const data = snapshot.data();
        const objectID = snapshot.id;

        const type = data.type;
 
        if (type == 'land_sale') {
            return land_sale_Index.saveObject({ ...data, objectID });
        } else {
            return null
        }       

    });

exports.updateLand_sale_Index = functions.firestore.document('listings/{listingsId}')

    .onUpdate((change:any) => {
        const newData = change.after.data();
        const objectID = change.after.id;

        // ...or the previous value before this update
        const previousValue = change.before.data();

        const oldtype = previousValue.type;
        const newType = newData.type;

        if ( oldtype == 'land_sale' ) {

            if (newType == 'land_sale') {
                land_sale_Index.saveObject({ ...newData, objectID });
            }else if(newType != 'land_sale'){
                return land_sale_Index.deleteObject(objectID);
            } 
        }else if(oldtype != 'land_sale' ){
            if (newType == 'land_sale') {
                land_sale_Index.saveObject({ ...newData, objectID });
            }
        } else {
            return null
        }   
    });

exports.deleteFromLand_sale_Index = functions.firestore.document('listings/{listingsId}')

.onDelete((snapshot: { id: any; }) => 
land_sale_Index.deleteObject(snapshot.id)
);
 

///Land Sale Index




///Land Lease Index

const land_lease_Index = client.initIndex('Land_lease');

exports.addToLand_for_lease_Index = functions.firestore.document('listings/{listingsId}')

    .onCreate((snapshot: { data: () => any; id: any; }) => {

        const data = snapshot.data();
        const objectID = snapshot.id;

        const type = data.type;
 
        if (type == 'land_lease') {
            return land_lease_Index.saveObject({ ...data, objectID });
        } else {
            return null
        }       

    });

exports.updateLand_lease_Index = functions.firestore.document('listings/{listingsId}')

    .onUpdate((change:any) => {
        const newData = change.after.data();
        const objectID = change.after.id;

        // ...or the previous value before this update
        const previousValue = change.before.data();

        const oldtype = previousValue.type;
        const newType = newData.type;

        if ( oldtype == 'land_lease' ) {

            if (newType == 'land_lease') {
                land_sale_Index.saveObject({ ...newData, objectID });
            }else if(newType != 'land_lease'){
                return land_sale_Index.deleteObject(objectID);
            } 
        }else if(oldtype != 'land_lease' ){
            if (newType == 'land_lease') {
                land_sale_Index.saveObject({ ...newData, objectID });
            }
        } else {
            return null
        }   
    });

exports.deleteFromLand_lease_Index = functions.firestore.document('listings/{listingsId}')

.onDelete((snapshot: { id: any; }) => 
    land_lease_Index.deleteObject(snapshot.id)
);
 

///Land Lease Index



/// Home Sale Index

const home_sale_Index = client.initIndex('Home_sale');

exports.addToHome_for_sale_Index = functions.firestore.document('listings/{listingsId}')

    .onCreate((snapshot: { data: () => any; id: any; }) => {

        const data = snapshot.data();
        const objectID = snapshot.id;

        const type = data.type;
 
        if (type == 'home_sale') {
            return home_sale_Index.saveObject({ ...data, objectID });
        } else {
            return null
        }       

    });

exports.updateHome_for_sale_Index = functions.firestore.document('listings/{listingsId}')

    .onUpdate((change:any) => {
        const newData = change.after.data();
        const objectID = change.after.id;

        // ...or the previous value before this update
        const previousValue = change.before.data();

        const oldtype = previousValue.type;
        const newType = newData.type;

        if ( oldtype == 'home_sale' ) {

            if (newType == 'home_sale') {
                home_sale_Index.saveObject({ ...newData, objectID });
            }else if(newType != 'home_sale'){
                return home_sale_Index.deleteObject(objectID);
            } 
        }else if(oldtype != 'home_sale' ){
            if (newType == 'home_sale') {
                home_sale_Index.saveObject({ ...newData, objectID });
            }
        } else {
            return null
        }   
    });

exports.deleteFromHome_sale_Index = functions.firestore.document('listings/{listingsId}')

.onDelete((snapshot: { id: any; }) => 
    home_sale_Index.deleteObject(snapshot.id)
);
 

///Home Sale Index


/// Home Rent Index

const home_rent_Index = client.initIndex('Home_rent');

exports.addToHome_for_rent_Index = functions.firestore.document('listings/{listingsId}')

    .onCreate((snapshot: { data: () => any; id: any; }) => {

        const data = snapshot.data();
        const objectID = snapshot.id;

        const type = data.type;
 
        if (type == 'home_rent') {
            return home_rent_Index.saveObject({ ...data, objectID });
        } else {
            return null
        }       

    });

exports.updateHome_for_rent_Index = functions.firestore.document('listings/{listingsId}')

    .onUpdate((change:any) => {
        const newData = change.after.data();
        const objectID = change.after.id;

        // ...or the previous value before this update
        const previousValue = change.before.data();

        const oldtype = previousValue.type;
        const newType = newData.type;

        if ( oldtype == 'home_rent' ) {

            if (newType == 'home_rent') {
                home_rent_Index.saveObject({ ...newData, objectID });
            }else if(newType != 'home_rent'){
                return home_rent_Index.deleteObject(objectID);
            } 
        }else if(oldtype != 'home_rent' ){
            if (newType == 'home_rent') {
                home_rent_Index.saveObject({ ...newData, objectID });
            }
        } else {
            return null
        }   
    });

exports.deleteFromHome_rent_Index = functions.firestore.document('listings/{listingsId}')

.onDelete((snapshot: { id: any; }) => 
    home_rent_Index.deleteObject(snapshot.id)
);
 

///Home Rent Index



///Staycations Index

const staycations_Index = client.initIndex('Staycations');

exports.addToLand_for_lease_Index = functions.firestore.document('listings/{listingsId}')

    .onCreate((snapshot: { data: () => any; id: any; }) => {

        const data = snapshot.data();
        const objectID = snapshot.id;

        const type = data.type;
 
        if (type == 'staycations') {
            return staycations_Index.saveObject({ ...data, objectID });
        } else {
            return null
        }       

    });

exports.updateStaycations_Index = functions.firestore.document('listings/{listingsId}')

    .onUpdate((change:any) => {
        const newData = change.after.data();
        const objectID = change.after.id;

        // ...or the previous value before this update
        const previousValue = change.before.data();

        const oldtype = previousValue.type;
        const newType = newData.type;

        if ( oldtype == 'staycations' ) {

            if (newType == 'staycations') {
                staycations_Index.saveObject({ ...newData, objectID });
            }else if(newType != 'staycations'){
                return staycations_Index.deleteObject(objectID);
            } 
        }else if(oldtype != 'staycations' ){
            if (newType == 'staycations') {
                staycations_Index.saveObject({ ...newData, objectID });
            }
        } else {
            return null
        }   
    });

exports.deleteFromStaycations_Index = functions.firestore.document('listings/{listingsId}')

.onDelete((snapshot: { id: any; }) => 
    staycations_Index.deleteObject(snapshot.id)
);
 

///Staycations Index




///Event Spaces Index

const event_spaces_Index = client.initIndex('Event_spaces');

exports.addToEvent_spaces_Index = functions.firestore.document('listings/{listingsId}')

    .onCreate((snapshot: { data: () => any; id: any; }) => {

        const data = snapshot.data();
        const objectID = snapshot.id;

        const type = data.type;
 
        if (type == 'event_spaces') {
            return event_spaces_Index.saveObject({ ...data, objectID });
        } else {
            return null
        }       

    });

exports.updateEvent_spaces_Index = functions.firestore.document('listings/{listingsId}')

    .onUpdate((change:any) => {
        const newData = change.after.data();
        const objectID = change.after.id;

        // ...or the previous value before this update
        const previousValue = change.before.data();

        const oldtype = previousValue.type;
        const newType = newData.type;

        if ( oldtype == 'event_spaces' ) {

            if (newType == 'event_spaces') {
                event_spaces_Index.saveObject({ ...newData, objectID });
            }else if(newType != 'event_spaces'){
                return event_spaces_Index.deleteObject(objectID);
            } 
        }else if(oldtype != 'event_spaces' ){
            if (newType == 'event_spaces') {
                event_spaces_Index.saveObject({ ...newData, objectID });
            }
        } else {
            return null
        }   
    });

exports.deleteFromEvent_spaces_Index = functions.firestore.document('listings/{listingsId}')

.onDelete((snapshot: { id: any; }) => 
    event_spaces_Index.deleteObject(snapshot.id)
);
 

///Event Spaces Index


///Office Space Index

const office_space_Index = client.initIndex('office_space');

exports.addToOffice_Space_Index = functions.firestore.document('listings/{listingsId}')

    .onCreate((snapshot: { data: () => any; id: any; }) => {

        const data = snapshot.data();
        const objectID = snapshot.id;

        const type = data.type;
 
        if (type == 'office_space') {
            return office_space_Index.saveObject({ ...data, objectID });
        } else {
            return null
        }       

    });

exports.updateOffice_Space_Index = functions.firestore.document('listings/{listingsId}')

    .onUpdate((change:any) => {
        const newData = change.after.data();
        const objectID = change.after.id;

        // ...or the previous value before this update
        const previousValue = change.before.data();

        const oldtype = previousValue.type;
        const newType = newData.type;

        if ( oldtype == 'office_space' ) {

            if (newType == 'office_space') {
                office_space_Index.saveObject({ ...newData, objectID });
            }else if(newType != 'office_space'){
                return office_space_Index.deleteObject(objectID);
            } 
        }else if(oldtype != 'office_space' ){
            if (newType == 'office_space') {
                office_space_Index.saveObject({ ...newData, objectID });
            }
        } else {
            return null
        }   
    });

exports.deleteFromOffice_Space_Index = functions.firestore.document('listings/{listingsId}')

.onDelete((snapshot: { id: any; }) => 
    office_space_Index.deleteObject(snapshot.id)
);
 

///Office Space Index