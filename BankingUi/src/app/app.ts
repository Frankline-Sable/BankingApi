import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  transferForm!: FormGroup;


  constructor(private fb: FormBuilder,
              private http: HttpClient,) {
  }

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      accountTo: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      amount: ['', [
        Validators.required,
        Validators.minLength(1)
      ]]
    });
    this.loadHistory();
  }


  showForm() {
    console.log(this.transferForm.value);
    console.log(this.transferForm.valid);
  }

  protected submitTransfer() {
    if (this.transferForm.invalid) return;

    console.log(this.transferForm.value);
  }
  loadHistory() {
    this.http
      .get<any[]>('http://localhost:5255/api/transfer/history')
      .subscribe({
        next: (data) => {
          console.log('History:', data);
        },
        error: (err) => {
          console.error('Could not load history:', err);
        }
      });
  }
}
