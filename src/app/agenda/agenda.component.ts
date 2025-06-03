import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="agenda-container">
      <h2>Mi Agenda</h2>
      <div class="agenda-content">
        <!-- Aquí irá el contenido de tu agenda -->
        <p>Contenido de la agenda</p>
      </div>
    </div>
  `,
  styles: [`
    .agenda-container {
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }
    .agenda-content {
      margin-top: 20px;
    }
    h2 {
      color: #2c3e50;
      margin-bottom: 15px;
    }
  `]
})
export class AgendaComponent {
}
