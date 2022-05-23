import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[loading]'
})
export class LoadingDirective implements OnInit, OnChanges{

  interval: any;
  @Input() loading: boolean;

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['loading']) {
        if (changes['loading'].currentValue === true) this.addLoadingSpinner();
        else if (changes['loading'].currentValue === false) this.removeLoadingSpinner(); 
      }
  }

  addLoadingSpinner() {
    let element: HTMLDivElement = this.el.nativeElement;
    if (!element.parentElement) {
      throw new Error('In order to place loading directive the element must have a parent with an unique id.')
    }

    let spinnerId = 'loadingSpinner-' + element.parentElement.id;
    element.style.opacity = '0.15';
    let div = document.createElement('div');
    div.id = spinnerId;
    for (let i = 0; i < 5; i++) 
      div.appendChild(document.createElement('div'));
    div.classList.add('lds-ring');
    div.style.position = 'absolute';
    div.style.top = element.parentElement.offsetTop + 70 + 'px';
    div.style.left = '50%';
    element.parentElement.appendChild(div);
    this.interval = setInterval(() => {
      this.resetPositionOfLoadingSpinners();
    }, 10);

  }

  removeLoadingSpinner() {
    let element: HTMLDivElement = this.el.nativeElement;
    element.style.opacity = '1';
    if (!element.parentElement) {
      throw new Error('In order to place loading directive the element must have a parent with an unique id.')
    }

    let spinnerId = 'loadingSpinner-' + element.parentElement.id;

    let spinners = document.querySelectorAll('[id^=' + spinnerId + ']');
    if (spinners) {
      spinners.forEach((spinner) => spinner.remove())
    }
  }

  resetPositionOfLoadingSpinners() {
    let loadingSpinners = document.querySelectorAll('[id^=loadingSpinner]');
    
    if (!loadingSpinners.length || loadingSpinners.length < 2) 
      clearInterval(this.interval);
    else if (loadingSpinners.length >= 2) {
      
    } 
  }

}