import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  // Setter of the property, executed when the property changes.
  @Input() set appUnless(value:boolean) {
    if (!value) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  };

  constructor(private templateRef: TemplateRef<any>,
              private vcRef: ViewContainerRef) {}

}
