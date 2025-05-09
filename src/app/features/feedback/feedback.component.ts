import { FeedbackService } from './../../services/feedback/feedback.service';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  imports: [ReactiveFormsModule, NgxPaginationModule, CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent implements OnInit{
  p: number = 1;
  itemsPerPage: number = 6;
  totalItems: number = 0;
  cards: any[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, private myService: FeedbackService) {
    this.form = this.fb.group({
      mesage: [''],
      userName: ['']
    });
  }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(page: number = 1):void {
    this.myService.getCards(page - 1, this.itemsPerPage).subscribe((res) => {
    this.cards = res.content;
    this.totalItems = res.totalElements;
    this.p = page;
  });
  }

  onSubmit() {
    if (this.form.valid) {
      this.myService.postCards(this.form.value).subscribe({
        next: () => {
          this.form.reset();
          this.loadFeedbacks(); // recarrega após enviar
        },
        error: (err) => console.error('Erro ao enviar feedback:', err)
      });
    }
  }

  onPageChange(page: number): void {
  this.loadFeedbacks(page);
}

}
