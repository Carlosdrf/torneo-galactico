import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  getResources(entity: string): string | null {
    return localStorage.getItem(entity);
  }

  upsertResource(entity: string, data: string): void {
    localStorage.setItem(entity, data);
  }
}
