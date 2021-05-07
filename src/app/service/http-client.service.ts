import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Student } from '../student';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
student:Student[]=[];
  constructor(
    private httpClient:HttpClient
  ) { }
  private baseUrl="http://localhost:8080/api";
 
   public  getStudents():Observable<Student[]>{
      return this.httpClient.get<Student[]>("http://localhost:8080/api/get");
    }

    public  getStudentById(studentId:number):Observable<Student>{
      return this.httpClient.get<Student>("http://localhost:8080/api/get/{studentId}"+studentId);
    }

    public getStudentByFirstName(firstName:string):Observable<Student>{
      return this.httpClient.get<Student>("http://localhost:8080/api/getStudentByFirstName/{firstName}"+firstName);
    }
  
  public deleteStudent(studentId:number):Observable<Student>
  {
    return this.httpClient.delete<Student>(`${this.baseUrl}delete/{studentId}`+studentId);
  }

  public createStudent(student: Student):Observable<Student>
  {
    return this.httpClient.post<Student>(`${this.baseUrl}addStudentwithCourse/{courseId}`,this.student);
  }

  public updateStudent(student:Student):Observable<Student>
  {
    return this.httpClient.put<Student>(`${this.baseUrl}update/{studentId}`,student);
  }

}
