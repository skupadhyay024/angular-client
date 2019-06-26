import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';
import {Subject, Observable} from 'rxjs/RX'
import {catchError} from 'rxjs/operators'
import { IStudent } from './student.model'

@Injectable()
export class StudentService {
      baseUrl: string = 'http://localhost:8085/students-service/'

    constructor(private _http: HttpClient) { }



  getStudents():Observable<IStudent []> {
      return this._http.get<IStudent []>(this.baseUrl + 'students')
                .pipe(catchError(this.handleError<IStudent[]>('getStudents',[])))
    }

    getStudent(id):Observable<IStudent> {
        return this._http.get<IStudent>(this.baseUrl + 'student/'+ id)
                  .pipe(catchError(this.handleError<IStudent>('getStudent')))
      }

      saveStudent(student) {
        let options = {headers: new HttpHeaders({'Content-Type':'application/json'})};
        return this._http.post<IStudent>(this.baseUrl, student,options)
          .pipe(catchError(this.handleError<IStudent>('saveStudent')))
        }

    private handleError<T> (operation = 'operation', result?: T){
      return(error: any): Observable<T> => {
          console.error(error);
            return Observable.of(result as T);
      }
    }



    // getStudentById(id){
    //   return this._http.get(this.baseUrl +"GetStudentById/"+ id)
    //           .map((response: Response) => response.json())
    //           .catch(this._errorHandler)
    // }
    //
    // saveStudent(student){
    //   return this._http.post(this.baseUrl +   "saveStudent", student)
    //           .map((response: Response) => response.json())
    //           .catch(this._errorHandler)
    // }
    //
    // deleteStudent(id){
    //   return this._http.delete(this.baseUrl + "DeleteStudent/" + id)
    //             .map((response:Response) =>  response.json())
    //             .catch(this._errorHandler)
    // }

}
