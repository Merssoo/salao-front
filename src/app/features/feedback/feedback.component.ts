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
  p: number = 1; // Página atual
  itemsPerPage: number = 6; // Número de itens por página
  totalItems: number = 0; // Total de itens
  totalPages: number = 0; // Total de páginas
  cards: any[] = []; // Feedbacks carregados
  form: FormGroup; // Formulário de feedback
  isLoading: boolean = false; // Flag para controlar o loading

  constructor(private fb: FormBuilder, private myService: FeedbackService) {
    this.form = this.fb.group({
      mesage: [''],
      userName: ['']
    });
  }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  // Função para carregar os feedbacks
  loadFeedbacks(page: number = 1): void {
    this.isLoading = true;
    this.myService.getCards(page - 1, this.itemsPerPage).subscribe((res) => {
      this.cards = res.content;
      this.totalItems = res.totalElements;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage); // Calcula o total de páginas
      this.p = page; // Atualiza a página atual
      this.isLoading =false
    });
  }

  // Função para enviar o formulário de feedback
  onSubmit() {
    if (this.form.valid) {
      this.myService.postCards(this.form.value).subscribe({
        next: () => {
          this.form.reset();
          this.loadFeedbacks(); // Recarga os feedbacks após enviar
        },
        error: (err) => console.error('Erro ao enviar feedback:', err)
      });
    }
  }

  // Função chamada ao mudar a página
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadFeedbacks(page);
    }
  }

  // Função para gerar a lista de páginas
  getPages(): number[] {
    let pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

}
