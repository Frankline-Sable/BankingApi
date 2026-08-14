import { Component, signal,  } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('BankingUi');
}
