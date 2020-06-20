import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private iconPath: string = environment.ICON_URL;
  private iconAppend: string = environment.ICON_APPEND;

  constructor(private http: HttpClient) {}

  public getIcon(iconId: string): Observable<Blob> {
    return this.http.get(this.iconPath + iconId + this.iconAppend, {
      responseType: 'blob'
    });
  }
}
