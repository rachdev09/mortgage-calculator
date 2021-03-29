import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'mortgage-calculator',
        loadChildren: () => import('@mortgage-calculator/mortgage-calculator.module').then(mod => mod.MortgageCalculatorModule)
      },
      {
        path: '**',
        redirectTo: '/mortgage-calculator'
      },
      {
        path: '',
        redirectTo: '/mortgage-calculator',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
