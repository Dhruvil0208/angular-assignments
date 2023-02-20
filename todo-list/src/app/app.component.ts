import { Component ,ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('todoTask') todo!: { nativeElement: { value: string; }; };
  title = 'todo list';
  tasks:any [] =[];

  addTask(item:string){
    if(item.trim()!='')
    {
      this.tasks.push({id:this.tasks.length,name:item,select:false})
      this.todo.nativeElement.value='';
    }
    else{
      alert('Task cannot be empty')
    }

    console.log(this.tasks);
    
  }

  onChangeTask($event:any){
    const id =$event.target.value;
    const isSelected = $event.target.checked;

    console.log(id, isSelected)
    this.tasks = this.tasks.map((d)=> {

      if(d.id == id){
        d.select = isSelected;
        return d;
      }
      return d;
    });
    console.log(this.tasks)
  }

  removeTask(task:any){
    const index = this.tasks.indexOf(task);
    if(index !== -1){
      this.tasks.splice(index,1);
    }
  }
 
}
