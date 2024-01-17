import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
employeeForm!: FormGroup;
submitted = false;
employees: any[] = [];
filteredEmployees: any[] = [];
pageSize = 5;
currentPage = 0;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.employeeForm= this.fb.group({

      name: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.loadEmployeeData();

  }

  onSubmit(){
    this.submitted = true;

    if(this.employeeForm.valid){
      console.log(this.employeeForm.value);

      this.apiService.postEmployee(this.employeeForm.value).subscribe(response =>{
        console.log("responseMessage", response);
        this.employeeForm.reset();
        this.submitted= false;
        this.loadEmployeeData();
        
      },
      error=>{
        console.error("API error", error);
      }
      )
    }else{

    }
  }

  loadEmployeeData() {
    // Fetch employee data from the API
    this.apiService.getEmployees().subscribe(data => {
      this.employees = data;
      console.log("this.employee", this.employees);
      
      // this.applyPagination();
    });
  }

  applyPagination() {
    // // Apply pagination to the data
    // const startIndex = this.currentPage * this.pageSize;
    // this.filteredEmployees = this.employees.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    // // Handle page change
    // this.currentPage = page;
    // this.applyPagination();
  }

  applyFilter() {
    // // Apply filter based on search criteria
    // const name = this.employeeForm.value.get('name').value.toLowerCase();
    // const department = this.employeeForm.value.get('department').value.toLowerCase();

    // this.filteredEmployees = this.employees.filter(employee =>
    //   employee.name.toLowerCase().includes(name) && employee.department.toLowerCase().includes(department)
    // );

    // this.currentPage = 0; // Reset to the first page after applying the filter
  }
}
