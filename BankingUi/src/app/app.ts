import { Component, OnInit  } from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [
   CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  transferForm!: FormGroup;


  constructor(private fb:FormBuilder) {
  }

  ngOnInit(): void {
      this.transferForm = this.fb.group({
        accountTo:['', [
          Validators.required,
          Validators.minLength(5)
        ]],
        amount:['', [
          Validators.required,
          Validators.minLength(1)
        ]]
      })
  }


}
