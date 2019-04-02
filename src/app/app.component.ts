import { Component, OnInit } from '@angular/core';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  newListName = '';
  isdelete = false;
  updatedName = '';
  listArray = [
  ];

  ngOnInit(): void {
    this.http.get('http://localhost:4500/api/checklist').subscribe((response: any) => {
      this.listArray = response;
    });
  }

  constructor(private http: HttpClient) {

  }

  createNewList(event: any) {
    this.newListName = (<HTMLInputElement>event.target).value;
  }

  onCreateList() {
    if (this.newListName != '' && this.newListName.length>2) {
      let listObj = {};
      listObj["id"] = this.listArray.length;
      listObj["name"] = this.newListName;;
      this.listArray.push(listObj);
      this.http.post('http://localhost:4500/api/checklist', {
        name: this.newListName
      }).subscribe((response) => {
        console.log(response);
      });

      this.newListName = '';
    }
  }

  deleteList(listId: any, list: any) {
    this.listArray.splice(this.listArray.indexOf(list), 1);
    this.http.delete('http://localhost:4500/api/checklist/' + listId).subscribe(response => {
      console.log(response);
      err => console.error(err)
    });
  }

  enableDelete() {
    this.isdelete = true;
  }

  updateListName(event: any, listId: any) {
    this.updatedName = (<HTMLInputElement>event.target).value;
    let element = event.srcElement.nextElementSibling;

    if (element == null) {
      return;
    }
    else {
      element.focus();
    }

    if (this.updatedName != '') {
      this.http.put('http://localhost:4500/api/checklist/' + listId, {
        name: this.updatedName
      }).subscribe((response) => {
        console.log(response);
      });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listArray, event.previousIndex, event.currentIndex);
  }
}
