import { Directive, Inject, OnDestroy, Optional } from '@angular/core';
import { ResolveComponent } from './resolve/resolve.component';
import { Resolver } from './resolver';
import { HG_RESOLVERSS } from './injection-tokens';
import { AsyncRenderBase } from './resolve-base';
import { ResolveDirective } from './resolve.directive';

@Directive({
  selector: '[hgResolveAttach]'
})
export class ResolveAttachDirective<T> implements OnDestroy {

  container: AsyncRenderBase;

  constructor(
    @Optional() resolveCmpInstance: ResolveComponent,
    @Optional() resolveDirInstance: ResolveDirective,
    @Inject(HG_RESOLVERSS) private resolvers: Resolver<T>[]
  ) {
    this.container = resolveCmpInstance || resolveDirInstance || null;
    if (!this.container) {
      console.warn('No async render found!');
      return;
    }
    this.resolvers.map(r => this.container.attachResolver(r));
  }

  ngOnDestroy() {
    this.resolvers.map(r => this.container.detachResolver(r));
  }

}