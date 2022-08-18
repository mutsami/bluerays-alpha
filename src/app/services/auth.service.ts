import { Blog } from './../models/blog';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, switchMap, of, map, merge } from 'rxjs';
import { House } from '../models/house';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data

  blogCollection!: AngularFirestoreCollection<Blog>;
  blogs!: Observable<Blog[]>;
  blogDoc?: AngularFirestoreDocument<Blog>;

  user$: Observable<any>;
  listingCollection!: AngularFirestoreCollection<any>;
  listngs!: Observable<any[]>;
  listingsDoc?: AngularFirestoreDocument<any>;
  ts:any;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore, private router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
    ) { 

      /* Saving user data in localstorage when 
      logged in and setting up null when logged out */
    
      this.ts = firebase.firestore.Timestamp.now()
      // Get the auth state, then fetch the Firestore user document or return null
 

      this.afAuth.authState.subscribe((user) => {
        if (user) { 
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')!);
        } else {
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
        }
      });
    }

  getHouse(id: any){
    return this.afs.doc(`sale/${id}`).valueChanges()
  }

  getHouses() {
    this.listingCollection = this.afs.collection('buy', ref => ref.orderBy('listed','desc'));
    return this.listingCollection
      .snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as House;
            const id = a.payload.doc.id; 
            return { id, ...data };
        });
        })
    );
  }

 
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => { 
          this.router.navigate(['/login']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */ 
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!); 
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  GoogleAuth() { 
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        
        this.router.navigate(['login']);
      }
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['login']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      window.location.reload();
    });
  }

  getUser(id: any){
    return this.afs.doc(`users/${id}`).valueChanges()
  }

  updateUser(id: string,data: any) {
    this.afs.doc('users/' + id).update(data).then(()=>{
      window.location.reload();  
    })
  }

  createListing(listing: any){
    return this.afs.collection('listings').add(listing).then(()=>{
      window.location.reload();  
    }).catch(e=>{
      window.alert(e)
    })
  }

  getMyListings(id:any) { 
    this.listingCollection = this.afs.collection('listings', ref => ref.orderBy('uploaded','desc').where('uploader_id','==',id));
    return this.listingCollection
      .snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }

  getListing(id:any){ 
    return this.afs.doc(`listings/${id}`).valueChanges()
  }

  saveFavListing(id:any){
    
    return this.afs.collection('users/' + this.userData.uid + '/saved').doc(id).set({id:id,fav:true});
  }

  getFavListing(){
    return this.afs.collection('users/' + this.userData.uid + '/saved').valueChanges()
  }

  getRecentListings(){
    this.listingCollection = this.afs.collection('listings', ref => ref.orderBy('uploaded','desc').limit(5));
    return this.listingCollection
      .snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }

  getListings() {
    this.listingCollection = this.afs.collection('listings', ref => ref.orderBy('uploaded','desc'));
    return this.listingCollection
      .snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }

  getLandSaleListings() {
    this.listingCollection = this.afs.collection('listings', ref => ref.orderBy('uploaded','desc').where('type','==','land_sale'));
    return this.listingCollection
      .snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }

  getLandLeaseListings() {
    this.listingCollection = this.afs.collection('listings', ref => ref.orderBy('uploaded','desc').where('type','==','land_lease'));
    return this.listingCollection
      .snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }
  getEventSpacesListings() {
    this.listingCollection = this.afs.collection('listings', ref => ref.orderBy('uploaded','desc').where('type','==','event_spaces'));
    return this.listingCollection
      .snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }

  getHomeSaleListings() {
    this.listingCollection = this.afs.collection('listings', ref => ref.orderBy('uploaded','desc').where('type','==','home_sale'));
    return this.listingCollection
      .snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }

  getHomeRentListings() {
    this.listingCollection = this.afs.collection('listings', ref => ref.orderBy('uploaded','desc').where('type','==','home_rent'));
    return this.listingCollection
      .snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }

  
  getVillasListings() {
    this.listingCollection = this.afs.collection('listings', ref => ref.orderBy('uploaded','desc').where('type','==','villas'));
    return this.listingCollection
      .snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }
  getApartmentsListings() {
    this.listingCollection = this.afs.collection('listings', ref => ref.orderBy('uploaded','desc').where('type','==','apartments'));
    return this.listingCollection
      .snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }
  getBeachHouseListings() {
    this.listingCollection = this.afs.collection('listings', ref => ref.orderBy('uploaded','desc').where('type','==','beach-house'));
    return this.listingCollection
      .snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }
  getDuplexListings() {
    this.listingCollection = this.afs.collection('listings', ref => ref.orderBy('uploaded','desc').where('type','==','duplex'));
    return this.listingCollection
      .snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }

  getUploaderID(id: any){
    return this.afs.doc(`users/${id}`).valueChanges()
  }

  
  getBlog(id: any){
    return this.afs.doc(`blogs/${id}`).valueChanges()
  }

  getBlogs() {
    this.blogCollection = this.afs.collection('blogs', ref => ref.orderBy('uploaded','desc'));
    return this.blogCollection
      .snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as Blog;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }
  getFirstBlogs() {
    this.blogCollection = this.afs.collection('blogs', ref => ref.orderBy('uploaded','asc').limit(2));
    return this.blogCollection
      .snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as Blog;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }

  updateBlog(id: string,blog: any) {
    this.afs.doc('blogs/' + id).update(blog).then(()=>{
      this.router.navigate(['dashboard/blog']).then(()=>{ 
          // this.notifyService.showSuccess("The blog has been edited succefully.", "Saved!!")
      })

    })
  }

  createBlog(blog: Blog){
    return this.afs.collection('blogs').add(blog)
  }

deleteBlog(blog_id: string){
  this.afs.doc('blogs/' + blog_id).delete();
}



  
}
