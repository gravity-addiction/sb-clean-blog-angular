import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'version',
        loadChildren: () =>
            import('modules/app-common/app-common-routing.module').then(
                m => m.AppCommonRoutingModule
            ),
    },
    {
        path: '',
        loadChildren: () =>
            import('modules/blog/blog-routing.module').then(m => m.BlogRoutingModule),
    },
    {
        path: 'events',
        loadChildren: () =>
            import('modules/events/events-routing.module').then(m => m.EventsRoutingModule),
    },
    {
        path: 'records',
        loadChildren: () =>
            import('modules/records/records-routing.module').then(m => m.RecordsRoutingModule),
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),
    },
    {
        path: 'error',
        loadChildren: () =>
            import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
    {
        path: '**',
        pathMatch: 'full',
        loadChildren: () =>
            import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
