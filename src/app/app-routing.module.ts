import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitySearchComponent } from './components/city-search/city-search.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'city-search/:userId',component:CitySearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
