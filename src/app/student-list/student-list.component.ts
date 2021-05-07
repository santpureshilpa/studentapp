import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../student';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  dstudents: Student[] = [];
  student:Student=new Student(0,"","","",0,0);

  studs!: Observable<Student[]>;
  dstud!:Observable<Student>;
  Ustud!: Observable<Student>;

  constructor(private httpClientService:HttpClientService,private router:Router) { }

  ngOnInit(): void {
    this.studs=this.httpClientService.getStudents();
    this.studs.subscribe((data)=>this.students=data);
  }
  deleteStudent(studentId:number):void{
    this.dstud=this.httpClientService.deleteStudent(studentId);
    alert("Student deleted Successfully");
    location.reload();
    this.dstud.subscribe(()=>this.httpClientService.getStudents()); 
  }
  updateStudent(studentId:number):void{
    this.router.navigate(['update',studentId]);
}
}
