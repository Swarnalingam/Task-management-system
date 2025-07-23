import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../../service/session.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  taskHeader: any = [];

  editTask: any = {};

  taskDetails: any = [];
  isOpenTaskModal: boolean = false;
  isMakeTask: boolean = false;
  isAllowToCreate: boolean = true;
  isAllowToEdit: boolean = true;
  isAllowToDelete: boolean = true;
  isAllowToView: boolean = true;
  isDeleteTaskModal: boolean = false;
  taskIndex: number = -1;
  activeUser:any={};
  isSave:boolean = false

  constructor(private sessionService: SessionService) { 
    this.onLoadTask();
  }

  ngOnInit(): void {

    let userIds = this.sessionService.credentials.map((user: any) => user.userId);

    this.taskHeader = [
      { label: 'Task Name', fieldName: 'taskName', viewClass: "col col-12", isView: true, isAdd: true, fieldRenderType: 'textField', isRequired:true },
      { label: 'Assignee', fieldName: 'assignee', viewClass: "col col-8", isView: true, isAdd: true, fieldRenderType: 'selectField', pickList: [...userIds], isRequired:true },
      { label: 'Status', fieldName: 'status', viewClass: "col col-5", isView: true, isAdd: true, fieldRenderType: 'selectField', pickList: ['New', 'Inprogress', 'Completed'] },
      { label: 'Due Date', fieldName: 'dueDate', viewClass: "col col-5", isView: true, isAdd: true, fieldRenderType: 'datePicker',isRequired:true },
      { label: 'Priority', fieldName: 'priority', viewClass: "col col-3", isView: true, isAdd: true, fieldRenderType: 'selectField', pickList: ['Low', 'Medium', 'High'],isRequired:true },
      { label: 'Created by', fieldName: 'createdBy', isView: true, fieldRenderType: 'textField' },
      { label: 'Create On', fieldName: 'createdAt', isView: true, fieldRenderType: 'datePicker' },
      { label: 'Description', fieldName: 'description', viewClass: "col col-12", isView: false, isAdd: true, fieldRenderType: 'textAreaField' }
    ]

    this.taskDetails = this.sessionService.getTask();

    this.activeUser=this.sessionService.getUser();
    if(this.activeUser.userType=='manager'){
      this.isAllowToCreate=false
    } else if(this.activeUser.userType=='other'){
        this.isAllowToCreate=false;
        this.isAllowToDelete=false
    }

  }


  onLoadTask() {
    this.sessionService.subjectTaskChange.subscribe(res => {
      if (!!res) {
        this.taskDetails = this.sessionService.getTask();
        this.sessionService.subjectTaskChange.next(false);
      }

    })

  }

  onMakeTask(rowIndex: number = -1) {
    this.isOpenTaskModal = true;
    this.isMakeTask = true;
    this.editTask.rowIndex = rowIndex;
    if (rowIndex > -1) {
      this.editTask = { ...this.editTask, ...this.taskDetails[rowIndex] }
    }
  }

  onViewTask(rowIndex: number = -1) {
    this.isOpenTaskModal = true;
    this.editTask.rowIndex = rowIndex;
    if (rowIndex > -1) {
      this.editTask = { ...this.editTask, ...this.taskDetails[rowIndex] }
    }
  }

  onCloseTask() {
    this.isOpenTaskModal = false;
    this.isMakeTask = false;
    this.editTask = {};
    this.isSave=false;
  }

  onCreateTask() {
    let rowIndex = this.editTask.rowIndex;
    delete this.editTask.rowIndex;
    this.isSave=true;
    let isAvoidToSave=this.formFields.some((field:any)=>!this.editTask?.[field.fieldName] && !!field?.isRequired);
    if(isAvoidToSave){
      alert('Please fill Required Fields');
      return
    }
    
    if (rowIndex > -1) {
       this.editTask.modifiedAt = new Date();
      this.editTask.modifiedBy = this.sessionService.getUser().userId;
      this.taskDetails[rowIndex] = this.editTask;
    } else {
     this.editTask.createdAt = new Date();
    this.editTask.createdBy = this.sessionService.getUser().userId;
      this.taskDetails.push(this.editTask)
    }
    this.sessionService.setTask(this.taskDetails);
    this.onCloseTask();
  }

  get tableHeader() {
    return this.taskHeader.filter((header: any) => header.isView)
  }

  get formFields() {
    return this.taskHeader.filter((header: any) => header.isAdd)
  }

  onDeleteConfirmation(rowIndex: number=-1) {
    this.isOpenTaskModal=false;
    this.isDeleteTaskModal = true;
    this.taskIndex = rowIndex;
  }

  onDeleteTask() {
    this.taskDetails.splice(this.taskIndex, 1);
    this.sessionService.setTask(this.taskDetails);
    this.onCloseConfirm()
  }

  onCloseConfirm() {
    this.isDeleteTaskModal = !this.isDeleteTaskModal;
    this.taskIndex = -1;
  }

}
