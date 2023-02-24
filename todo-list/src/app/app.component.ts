import { Component ,ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('todoTask') todo!: { nativeElement: { value: string; }; };
  @ViewChild('span') span :any;


  title = 'todo list';
  tasks:any [] =[];
  editContent = true;

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

  editTask(span:HTMLElement){
    span.contentEditable= "true";
    span.focus();
  }

  saveTask(task:any,span:HTMLElement){
    const index = this.tasks.indexOf(task);
    
    let str:string|undefined = span.textContent?.trim();
    if(str === ""){
      this.removeTask(task);
    }
    else if (str !=''){
      this.tasks[index].name = str;
      localStorage.setItem('todolist',JSON.stringify(this.tasks))
    }
    span.textContent = task.name;
    
    span.contentEditable = "false"
  }
}
