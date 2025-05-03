import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studio',
  imports: [CommonModule],
  templateUrl: './studio.component.html',
  styleUrl: './studio.component.css'
})
export class StudioComponent {

  // Array de URLs das imagens para os cards
  imageUrls: string[] = [
    'salao-1.jpeg', 
    'salao-3.jpeg', 
    'salao-11.jpeg', 
    'salao-4.jpeg', 
    'salao-18.jpeg', 
    'salao-12.jpeg'
  ];

  // Função para alternar as imagens
  changeImage(cardIndex: number, direction: number): void {
    const imageSet = [
      ['salao-1.jpeg', 'salao-2.jpeg', 'salao-5.jpeg', 'salao-6.jpeg', 'salao-7.jpeg', 'salao-8.jpeg'],
      ['salao-3.jpeg', 'salao-4.jpeg'],
      ['salao-11.jpeg', 'salao-13.jpeg'],
      ['salao-4.jpeg', 'salao-4-alt.jpeg'],
      ['salao-18.jpeg', 'salao-19.jpeg'],
      ['salao-12.jpeg']
    ];
  
    const currentSet = imageSet[cardIndex];
    const currentIndex = currentSet.indexOf(this.imageUrls[cardIndex]);
  
    const newIndex = (currentIndex + direction + currentSet.length) % currentSet.length;
    this.imageUrls[cardIndex] = currentSet[newIndex];
  }

  touchStartX: number = 0;
  touchEndX: number = 0;

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(cardIndex: number, event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    const deltaX = this.touchEndX - this.touchStartX;

    if (deltaX > 50) {
      this.changeImage(cardIndex, -1); // Swipe para a direita
    } else if (deltaX < -50) {
    this.changeImage(cardIndex, 1); // Swipe para a esquerda
    }
  }

}
