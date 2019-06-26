import { Component } from '@angular/core'
import { StudentService } from '../../shared/student.service'
import { IStudent } from '../../shared/student.model'
import { ActivatedRoute } from '@angular/router'


@Component({
templateUrl:'./student-details.component.html',
styles:[`
.container {padding-left:20px;padding-right:20px}
  `]
})
export class StudentDetailsComponent{
student: IStudent
errorMessage: any;
constructor(private studentService : StudentService, private route:ActivatedRoute){

}

ngOnInit(){
  this.studentService.getStudent(+this.route.snapshot.params['id']).subscribe(
      data => this.student = data,
      error => { debugger;
        this.errorMessage = error
      }
  )
}
}
