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
  editContent:any='';

  constructor(){

  let todolist = localStorage.getItem('todolist');
  if(todolist){
    this.tasks= JSON.parse(todolist);
  }

  }
  
  addTask(item:string){
    if(item.trim()!='')
    {
      this.tasks.push({id:this.tasks.length,name:item,select:false})
      this.todo.nativeElement.value='';
      localStorage.setItem('todolist',JSON.stringify(this.tasks))
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
    localStorage.setItem('todolist',JSON.stringify(this.tasks))
    console.log(this.tasks)
  }

  removeTask(task:any){
    const index = this.tasks.indexOf(task);
    if(index !== -1){
      this.tasks.splice(index,1);
    }
    localStorage.setItem('todolist',JSON.stringify(this.tasks))
  }

  // editTask(task:any){
  //   this.editContent = task;
  // }

  // saveTask(task:any){
  //   if(this.editContent === task)
  //   {
  //     task.name = task.name.trim();
  //     if(task.name.length === 0){
  //       this.removeTask(task);
  //     }
  //     this.editContent = '';
  //   }
  // }
 
}
