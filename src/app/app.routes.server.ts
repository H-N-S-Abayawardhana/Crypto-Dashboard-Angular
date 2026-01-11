import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'dashboard',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'coins',
    renderMode: RenderMode.Prerender
  },
  {
    // Parameterized routes can't be blindly prerendered without providing params.
    path: 'coin/:id',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
