import { Component, OnInit } from "@angular/core";

import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { NotesService } from "../notes.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.css"],
})
export class NotesComponent implements OnInit {
  notes: any = [];
  noteForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private noteService: NotesService,
    private title: Title
  ) {}
  ngOnInit() {
    this.title.setTitle("Notes | Angular-NoteApp");
    this.noteForm = this.formBuilder.group({
      title: new FormControl(),
      detail: new FormControl(),
    });
    this.getNotes();
  }

  // save new Note
  saveMessage() {
    let title = this.noteForm.get("title");
    let detail = this.noteForm.get("detail");

    if (
      title.value &&
      title.value.trim() &&
      detail.value &&
      detail.value.trim()
    ) {
      this.noteService.addNote(this.noteForm.value).subscribe((result) => {
        title.setValue("");
        detail.setValue("");
        this.getNotes();
      });
    } else {
      alert("Could not Add Empty Message");
    }
  }

  // get all the Notes
  getNotes() {
    this.noteService.getNotes().subscribe((result: any) => {
      this.notes = result.data;
    });
  }

  // delete the Note
  deleteNote(noteId) {
    this.noteService.deleteNote(noteId).subscribe((result) => {
      this.getNotes();
    });
  }
}
