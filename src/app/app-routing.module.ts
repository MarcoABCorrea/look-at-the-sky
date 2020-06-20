import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AppRoutes } from './shared/routes';

const routes: Routes = [
  { path: AppRoutes.HOME, component: HomeComponent },
  { path: AppRoutes.NOT_FOUND, component: NotFoundComponent },
  { path: '**', redirectTo: AppRoutes.NOT_FOUND }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
