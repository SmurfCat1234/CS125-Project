import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface UserProfile {
  name: string;
  email: string;
  username: string;
  birthdate: Date;
  bio: string;
  gender?: string; // Optional fields
  preferredSleepTime?: string;
  preferredWakeUpTime?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _storage: Storage | null = null;
  private initPromise: Promise<void>; // Store the init promise

 constructor(private storage: Storage) {
    this.initPromise = this.init(); // Call init and store the promise
  }

  private async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  private async ensureInitialized() {
    await this.initPromise; // Await the stored init promise
  }
  async setUserProfile(userProfile: UserProfile) {
    await this.ensureInitialized(); // Ensure storage is initialized
    const storageProfile = { ...userProfile, birthdate: userProfile.birthdate.toISOString() };
    await this._storage?.set('userProfile', storageProfile);
  }

  async getUserProfile(): Promise<UserProfile | null> {
    await this.ensureInitialized(); // Ensure storage is initialized
    const storageProfile = await this._storage?.get('userProfile');
    if (storageProfile) {
      return { ...storageProfile, birthdate: new Date(storageProfile.birthdate) };
    }
    return null;
  }
  
  async isFirstTimeUser(): Promise<boolean> {
    await this.ensureInitialized(); // Ensure storage is initialized
    const userProfile = await this.getUserProfile();
    return userProfile === null;
  }

  async clearUserProfile() {
    await this.ensureInitialized();
    await this._storage?.remove('userProfile');
  }
  
}
