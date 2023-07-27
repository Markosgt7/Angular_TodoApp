import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';//se importa la clase de task
import { CrudService } from 'src/app/service/crud.service';//se importa el servicio para tener accesos a los metodos

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  
  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue: string = '';

  constructor(private crudService: CrudService){

  }
  ngOnInit(): void {
    this.taskObj = new Task();
    this.taskArr = [];
    this.getallTask();
    
  }
  getallTask() {
    this.crudService.getAllTasks().subscribe(res =>{
      this.taskArr = res
    },err =>{
      alert("Hubo error al obtener la lista de tareas");
    });
  }
  addTask(){
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res =>{
      this.ngOnInit();
      this.addTaskValue= '';
    },err =>{
      alert("Error al agregar tarea"+ err);
    });
  }

  ediTak(){
    this.crudService.editTask(this.taskObj).subscribe(res =>{
      this.ngOnInit();
    }, err =>{  
      alert("Fallo al aditar la tarea");
    });
  }
  deleteTask(etask : Task){
    this.crudService.deleteTask(etask).subscribe(res =>{
      this.ngOnInit();
    }, err =>{
      alert("No se pudo elimintar la tarea");
    });
  }
}
