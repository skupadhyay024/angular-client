import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../../shared/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html'
})
export class StudentListComponent implements OnInit {
  students: Array<any> = [];
  errorMessage: any;
  currentId: number = 0;

  serarchText: string ='';

  constructor( private _studentService : StudentService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if(this._activatedRoute.snapshot.params["id"])
      this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
    this.getStudents();
  }

  getStudents(){
    this._studentService.getStudents().subscribe(
        data => this.students = data,
        error => { debugger;
          this.errorMessage = error
        }
    )
  }

  add(){
    this._router.navigate(['students/add']);
  }
  edit(id){
    this._router.navigate(['students/edit/' + id])
  }
  // delete(id){
  //   var ans = confirm("Do you want to delete customer with Id: " + id);
  //   if(ans){
  //     this._studentService.deleteCustomer(id)
  //         .subscribe(  data=> {
  //           var index = this.students.findIndex(x=>x.id == id);
  //           this.students.splice(index, 1);
  //         }, error=> this.errorMessage = error )
  //   }
  // }
}
