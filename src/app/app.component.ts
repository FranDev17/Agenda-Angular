import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './pages/agenda.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AgendaComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-agenda></app-agenda>
    </div>
  `
})
export class AppComponent {
  title = 'agenda-manager';
}
