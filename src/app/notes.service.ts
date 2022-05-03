import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class NotesService {
  constructor(private http: HttpClient) {}
  baseURL = "http://localhost:8000/api";

  getNotes() {
    return this.http.get(this.baseURL + "/note");
  }

  addNote(data) {
    return this.http.post(this.baseURL + "/note", data);
  }

  deleteNote(noteId) {
    return this.http.delete(this.baseURL + "/note/" + noteId);
  }
}
