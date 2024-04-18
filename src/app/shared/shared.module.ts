import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzListModule } from 'ng-zorro-antd/list';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[NzCardModule,
    NzDividerModule,
    NzInputModule,
    NzSpinModule,
    NzLayoutModule,
    NzFormModule,
    NzListModule
  ]
})
export class SharedModule { }