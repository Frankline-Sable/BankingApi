import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: "./app.html",
  styleUrl: "./app.css"


})
export class App implements OnInit {
  transferForm!: FormGroup;
  transactions: Transaction[] = [];
  apiUrl = "http://localhost:5255/api/transfer";

  constructor(private fb: FormBuilder, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      accountTo: ['', [
        Validators.required, Validators.minLength(5)
      ]],
      amount: [0, [
        Validators.required, Validators.minLength(1)
      ]],
    });
    this.loadHistory();
  }

  loadHistory() {
    this.http.get<Transaction[]>(this.apiUrl).subscribe({
      next: (data) =>{
        this.transactions = data;
        console.log('Transactions loaded', this.transactions.length);
      },
      error: (err) => console.log("Could not load transactions.", err)
    })
  }

  submitTransfer() {
    if (this.transferForm.invalid) return;

    // Generate unique header
    const headers = {'X-Idempotency-Key': uuidv4()};

    this.http.post(this.apiUrl, this.transferForm.value, {headers}).subscribe({
      next: (data) => {
        console.log("sent data", data);
        this.transferForm.reset({amount: 0});
      },
      error: (err) => {
        console.log("Could not load transfers.", err);
        alert(err.error || 'Server error Occurred');
      }
    })
  }

}

export class Transaction {
  id: number;
  account: string;
  amount: number;


  constructor(id: number, account: string, amount: number) {
    this.id = id;
    this.account = account;
    this.amount = amount;
  }
}
