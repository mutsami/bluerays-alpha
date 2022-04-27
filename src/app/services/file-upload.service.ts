import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize, map } from 'rxjs';
import { FileUpload } from '../models/file-upload';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService { 
  
  user:any;
  userData:any;

  uploadsCollection!: AngularFirestoreCollection<any>;
  uploads!: Observable<any[]>;
  uploadDoc?: AngularFirestoreDocument<any>;
  basePath:any;
  constructor(private db: AngularFirestore, private storage: AngularFireStorage,private auth:AuthService) { 
      
    this.userData = localStorage.getItem('user');
    this.user = JSON.parse(this.userData);
    this.basePath = '/' + this.user.uid + '/gallery_uploads'; 

  }

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name + '_' + fileUpload.file.lastModified;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }
  public saveFileData(fileUpload: FileUpload) { 
    const data = { 
      name: fileUpload.name, 
      url: fileUpload.url,
      type:fileUpload.file.type,
      uploaded: this.auth.ts
    };
    return this.db.collection( `file_uploads/` + this.user.uid +  `/gallery` ).add(data).then(e=>{
      return e.id;
    });
  }
  getFiles(): any { 
    this.uploadsCollection = this.db.collection( `file_uploads/` + this.user.uid +  `/gallery`, ref => ref.orderBy('uploaded','desc'));
    return this.uploadsCollection.snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
      });
      })
  );
  }
  deleteFile(fileUpload: FileUpload): void { 
    this.deleteFileDatabase(fileUpload.id)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }
  private deleteFileDatabase(key: string): Promise<void> { 
    return  this.db.doc( `file_uploads/` + this.user.uid +  `/gallery/` + key).delete();
  }
  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
