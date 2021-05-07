import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClientService } from '../service/http-client.service';
import { Student } from '../student';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  studentId: number=0;
  //semester:number=0;
  student!: Student;
  Ustud!: Observable<Student>;
  sid: string="";

  constructor(private route: ActivatedRoute,private router: Router,
    private httpClientService: HttpClientService) { }

  ngOnInit(): void {
    this.sid = this.route.snapshot.params['id'];
    this.studentId=Number.parseInt(this.sid);
    this.student=new Student(this.studentId,"","","",0,0);
    console.log(this.studentId);
    this.httpClientService.getStudentById(this.studentId).subscribe(data => {
      console.log(data)
      this.student=data;
    }, error => console.log(error)); 
  }
  onSubmit() {
    this.Ustud=this.httpClientService.updateStudent(this.student);
  this.Ustud.subscribe(data=>{alert("Student updated successfully.");},
  error => alert("employee does not exist in the database cannot be updated"));
  this.router.navigate(['/students']);
  }
  list(){
    this.router.navigate(['students']);
  }


}
