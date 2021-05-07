import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../student';
import { HttpClientService } from '../service/http-client.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  addStudentForm=new FormGroup(
    {
      firstName:new FormControl('',[Validators.required,Validators.minLength(2)]),
      lastName:new FormControl('',[Validators.required,Validators.minLength(2)])

    }

  )
  student:Student=new Student(0,"","","",0,0);
Cstud:Observable<Student> | undefined;
submitted=false;

  constructor(private httpClientService:HttpClientService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.warn(this.addStudentForm.value)
    this.addStudentForm.reset();
  {
    this.submitted = true;
       this.Cstud=this.httpClientService.createStudent(this.student);
       this.Cstud.subscribe(data=>alert("Student created successfully."));
     // location.reload();
    this.router.navigate(['/students']);
  }

  }
}
