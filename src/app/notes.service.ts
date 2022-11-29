import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class NotesService {
  constructor(private http: HttpClient) {}
  baseURL = environment.apiUrl;

  getNotes() {
    return this.http.get(this.baseURL + "note");
  }

  addNote(data) {
    return this.http.post(this.baseURL + "note", data);
  }

  deleteNote(noteId) {
    return this.http.delete(this.baseURL + "note/" + noteId);
  }
}
