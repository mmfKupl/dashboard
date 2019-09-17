import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'task', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'task/:id', component: TaskComponent },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
