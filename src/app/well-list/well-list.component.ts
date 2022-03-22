import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Well } from '../Model/types';
import { WellComponent } from '../well/well.component';

@Component({
  selector: 'app-well-list',
  templateUrl: './well-list.component.html',
  styleUrls: ['./well-list.component.css'],
})
export class WellListComponent {
  @ViewChild('sourceKey') sk!: ElementRef;
  @ViewChild(WellComponent) child!: WellComponent;
  wells: Well[] = [];
  clickedKey!: number;
  sourceKeys: number[] = [100001, 101010101, 1001001];

  constructor() {}

  clickKey(key: number) {
    this.clickedKey = key;
  }

  addWell(data: Well) {
    const key = this.child.sourcekey?.value;
    this.wells.push({
      name: data.name,
      type: data.type,
      sourceKey: data.sourceKey,
    });
  }
}
