import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { TaskComponent } from './components/task.component'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [TaskComponent],
    exports: [TaskComponent],
})
export class TaskModule {}
