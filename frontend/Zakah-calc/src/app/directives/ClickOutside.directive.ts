import {
  Directive,
  ElementRef,
  inject,
  output,
  Renderer2,
  DestroyRef,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  clickOutside = output<void>();

  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private destroyRef = inject(DestroyRef);

  private destroyed = false; // ✅ الحل الحقيقي

  constructor() {
    const unlisten = this.renderer.listen(
      'document',
      'click',
      (event: MouseEvent) => {
        // ⛔ stop immediately if destroyed
        if (this.destroyed) return;

        const clickedInside =
          this.elementRef.nativeElement.contains(event.target);

        if (!clickedInside) {
          this.clickOutside.emit();
        }
      }
    );

    this.destroyRef.onDestroy(() => {
      this.destroyed = true; // ✅ prevent late emits
      unlisten();
    });
  }
}
