import { Component, OnInit } from '@angular/core';

import { CalcOperations } from '../../../assets/const/calculator';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  previousValue: string = '';
  currentValue: string = '0';
  currentOperation: CalcOperations | null;

  constructor() { }

  ngOnInit(): void {
  }

  handleInput(event: Event): void {
    const value: string = (event.target as HTMLDivElement).innerHTML.toString();

    if (this.currentOperation) {
      this.currentValue = value;
    } else if (value !== '0') {
      if (this.currentValue === '0') {
        this.currentValue = value;
      } else {
        this.currentValue += value;
      }
    } else if (this.currentValue !== '0') {
      this.currentValue += '0';
    }
  }

  handleOperation(event: Event): void {
    const operation: string = (event.target as HTMLDivElement).id;

    switch (operation) {
      case CalcOperations.Percentage:
        this.currentValue = (Number(this.currentValue) / 100).toString();
        break;
      case CalcOperations.ClearEntry:
        this.currentValue = '0';
        break;
      case CalcOperations.Clear:
        this.currentValue = '0';
        this.previousValue = '0';
        break;
      case CalcOperations.Backspace:
        this.currentValue = this.currentValue.length === 1 ? '0' : this.currentValue.slice(0, -1);
        break;
      case CalcOperations.Reciprocal:
        this.currentValue = (1 / Number(this.currentValue)).toString();
        break;
      case CalcOperations.Square:
        this.currentValue = (Number(this.currentValue) ** Number(this.currentValue)).toString();
        break;
      case CalcOperations.SquareRoot:
        this.currentValue = Math.sqrt(Number(this.currentValue)).toString();
        break;
      case CalcOperations.Division:
        this.currentOperation = CalcOperations.Division;
        this.previousValue = this.currentValue;
        break;
      case CalcOperations.Multiplication:
        this.currentOperation = CalcOperations.Multiplication;
        this.previousValue = this.currentValue;
        break;
      case CalcOperations.Subtraction:
        this.currentOperation = CalcOperations.Subtraction;
        this.previousValue = this.currentValue;
        break;
      case CalcOperations.Addition:
        this.currentOperation = CalcOperations.Addition;
        this.previousValue = this.currentValue;
        break;
      case CalcOperations.SignInversion:
        if (Number(this.currentValue) > 0) {
          const negativeCurrentValue = '-' + this.currentValue;

          this.currentValue = negativeCurrentValue;
        } else if (this.currentValue.charAt(0) === '-') {
          this.currentValue = this.currentValue.slice(1);
        }
        break;
      case CalcOperations.Equality:
        if (this.currentOperation === CalcOperations.Division) {
          this.currentValue = (Number(this.previousValue) / Number(this.currentValue)).toString();
        }
        if (this.currentOperation === CalcOperations.Multiplication) {
          this.currentValue = (Number(this.previousValue) * Number(this.currentValue)).toString();
        }
        if (this.currentOperation === CalcOperations.Subtraction) {
          this.currentValue = (Number(this.previousValue) - Number(this.currentValue)).toString();
        }
        if (this.currentOperation === CalcOperations.Addition) {
          this.currentValue = (Number(this.previousValue) + Number(this.currentValue)).toString();
        }
        
        this.currentOperation = CalcOperations.Equality;
        break;
    }
  }
}
