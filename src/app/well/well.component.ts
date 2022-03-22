import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Well } from '../Model/types';

@Component({
  selector: 'app-well',
  templateUrl: './well.component.html',
  styleUrls: ['./well.component.css'],
})
export class WellComponent implements OnInit {
  @Output() well = new EventEmitter<Well>();

  private _key?: number;
  @Input() set key(key: number) {
    this._key = key;
    this.populateKey();
  }

  get type() {
    return this.wellForm.get('type');
  }
  get name() {
    return this.wellForm.get('name');
  }
  get sourcekey() {
    return this.wellForm.get('sourcekey');
  }
  wellForm!: FormGroup;
  valid = true;
  constructor() {}
  populateKey() {
    this.wellForm?.controls['sourcekey'].setValue(this._key);
  }
  ngOnInit(): void {
    this.wellForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', [
        Validators.required,
        Validators.pattern('(rls|esp)'),
      ]),
      sourcekey: new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    if (this.wellForm.invalid) {
      this.markFormAsTouched();
    } else {
      const well = {
        name: this.name?.value,
        type: this.type?.value,
        sourceKey: this.sourcekey?.value,
      };
      this.well.emit(well);
      this.resetWellForm();
      //this.wellForm.reset();
    }
  }
  private resetWellForm(): void {
    this.wellForm.controls['name'].reset();
    this.wellForm.controls['type'].reset();
  }
  private markFormAsTouched(): void {
    this.wellForm.controls['name'].markAsTouched();
    this.wellForm.controls['type'].markAsTouched();
    this.wellForm.controls['sourcekey'].markAsTouched();
  }
}
