import { Component, EventEmitter, Output } from '@angular/core';
import { Filters } from '../../../front/interfaces/filters';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  searchTerm: string = '';
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() filterChanged: EventEmitter<Filters> = new EventEmitter<Filters>();

  constructor() { }

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.search.emit('');
  }

  applyFilter(key: string, value: string): void {
    const filters: Filters = {}; 
    filters[key] = value;
    this.filterChanged.emit(filters);
  }
}
