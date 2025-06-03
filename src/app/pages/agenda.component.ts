import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AgendaItem {
  id: number;
  title: string;
  date: Date;
  hour: string;
  description?: string;
  color?: string;
}

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-8 max-w-6xl mx-auto bg-gradient-to-br from-amber-50 via-red-50 to-amber-100 min-h-screen">
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-amber-200/50">
        <!-- Your existing template content -->
      </div>
    </div>
  `
})
export class AgendaComponent implements OnInit {
  agendaItems: AgendaItem[] = [];
  currentDate = new Date();
  weeks: Date[][] = [];
  selectedDate: Date | null = null;
  showEventModal = false;
  newEvent: Partial<AgendaItem> = {};
  eventColors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];
  
  monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    this.weeks = [];
    let currentWeek: Date[] = [];
    
    while (startDate <= lastDay || currentWeek.length > 0) {
      if (currentWeek.length === 7) {
        this.weeks.push(currentWeek);
        currentWeek = [];
      }
      
      if (currentWeek.length < 7) {
        currentWeek.push(new Date(startDate));
        startDate.setDate(startDate.getDate() + 1);
      }
    }
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    this.showEventModal = true;
    this.newEvent = {
      date: date,
      color: this.eventColors[0]
    };
  }

  addEvent() {
    if (this.newEvent.title && this.newEvent.date) {
      const event: AgendaItem = {
        id: Date.now(),
        title: this.newEvent.title,
        date: this.newEvent.date,
        hour: this.newEvent.hour || '00:00',
        description: this.newEvent.description || '',
        color: this.newEvent.color || this.eventColors[0]
      };
      
      this.agendaItems.push(event);
      this.closeModal();
    }
  }

  closeModal() {
    this.showEventModal = false;
    this.newEvent = {};
    this.selectedDate = null;
  }

  getEventsForDate(date: Date): AgendaItem[] {
    return this.agendaItems.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  }

  previousMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
    this.generateCalendar();
  }
}
