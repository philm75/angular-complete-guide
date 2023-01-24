import { Content } from '@angular/compiler/src/render3/r3_ast';
import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ContentChild} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // Emulated is the default, ensures CSS styles are applied within the component only.
  encapsulation: ViewEncapsulation.None // Enables CSS application wide
})
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterViewInit,
    AfterViewChecked,
    AfterContentChecked,
    OnDestroy {

  // Expose element outside of the component
  @Input() element: {type:string, name:string, content:string};
  @Input() name: string;

  @ViewChild('heading', {static:true}) header: ElementRef;
  @ContentChild('contentParagraph', {static:true}) paragraph: ElementRef;

  constructor() {
    console.log('Constructor called...');
  }

  ngOnInit(): void {
    console.log('ngOnInit called...');
    console.log('Text Content='+this.header.nativeElement.textContent);
    console.log('Text Paragraph='+this.paragraph.nativeElement.textContent);
  }

  ngOnChanges(changes: SimpleChanges): void {
     console.log('ngOnChanges called...');
     console.log(changes);
  }

  // Events, etc trigger view check
  ngDoCheck() {
    console.log('ngDoCheck called...');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit called...');
    console.log('Text Paragraph='+this.paragraph.nativeElement.textContent);
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called...');
  }

  // Check elements when DOM has been rendered
  ngAfterViewInit() {
    console.log('ngAfterViewInit called...');
    console.log(this.header.nativeElement.textContent);
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called...');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy called...');
  }
}
