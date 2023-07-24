import { Component, OnInit } from '@angular/core';
import { style, transition, trigger,animate } from '@angular/animations';

import { ClinicHistoryService } from 'src/app/services/clinic-history.service';
import { ClinicHistory, ClinicHistoryOrigin } from 'src/app/models/ClinicHistory';
import { Internment } from 'src/app/models/Internment';
import { Patient } from 'src/app/models/Patient';
import { PetOwner } from 'src/app/models/PetOwner';

@Component({
  selector: 'app-clinic-history',
  templateUrl: './clinic-history.component.html',
  styleUrls: ['./clinic-history.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('0.5s ease-out',
                    style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 300, opacity: 1 }),
            animate('0.5s ease-in',
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ],
})
export class ClinicHistoryComponent implements OnInit{
  // read
  clinicHistory : ClinicHistory[] = [];
  internmentByID : Internment[] = [];
  patientList: Patient[] = [];
  petOwnerList: PetOwner[] = [];
  ngDataSwitch:number =1;
  // bool
  details : boolean = false;
  // new
  loadInternment:Internment  = new Internment();
  internmentAdd: Internment = new Internment();
  clinicHistoryByOne: ClinicHistory = new ClinicHistory();
  clinicHistoryAdd: ClinicHistoryOrigin = new ClinicHistoryOrigin();
  // id
  selectedPetOwner:number = -1;
  selectedPatient:number = -1;
  selectedCliniHistory:number = -1;
  constructor(private service: ClinicHistoryService) { }

  async ngOnInit() {
    this.clinicHistory = await this.service.getAllClinicHistory();
    this.fillSelectionPatient();
    this.fillSelectionPetOwner();
  }

  async clinicHistoryRegister(){
    var date = new Date();
    var date3 = this.sumarDias(date,-1);
    var date2 = new Date(date3.getTime());
    this.clinicHistoryAdd.id_owner = this.selectedPetOwner;
    this.clinicHistoryAdd.id_patient = this.selectedPatient;
    this.clinicHistoryAdd.created_at = date2;
    let response = await this.service.addClinicHistory(this.clinicHistoryAdd);
    // if (response.status == 201) {
    //   alert('Registrado Correctamente')
    // }
    this.ngOnInit();
  }

  async internment(data:ClinicHistory){
    this.clinicHistoryByOne = data;
    this.internmentByID = await this.service.getAllInternmentById(data.id);
    this.show();
    console.log(this.clinicHistoryByOne);

  }
  // Start About Select
  async fillSelectionPatient(){
    this.patientList = await this.service.getAllPatient();
  }
  async fillSelectionPetOwner(){
    this.petOwnerList = await this.service.getAllPetOwner();
  }

  selectionPatient(event:any){
    this.selectedPatient = event.target.value;
    console.log(this.selectedPatient);

  }

  selectionPetOwner(event:any){
    this.selectedPetOwner = event.target.value;
    console.log(this.selectedPetOwner);
  }

  selectionClinicHistory(event:any){
    this.selectedCliniHistory = event.target.value;
  }

  // End About Select


  // About Internment
  async internmentRegister(){
    let date_admission = new Date(this.internmentAdd.date_admission);
    let date_departure = new Date(this.internmentAdd.date_departure);
    let date_admission1 = this.sumarDias(date_admission,-0);
    let date_departure1 = this.sumarDias(date_departure,-0);
    this.internmentAdd.date_admission = date_admission1;
    this.internmentAdd.date_departure = date_departure1;
    this.internmentAdd.id_clinic_history = this.clinicHistoryByOne.id;
    let response = await this.service.addInternment(this.internmentAdd);
    console.log(response);
    this.charge();
  }

  async internmentEdit(){
    let response = await this.service.updateInternment(this.loadInternment);
    console.log(response);

    this.charge();
  }

  async deleteInternment(){
    console.log(this.loadInternment.id);
    let response = await this.service.deleteInternment(this.loadInternment);
    if(response.status != 204){
      alert('No se puede eliminar este registro: Seleccione otro sujeto para la historia Clinica de la Mascota')
    }else{
      alert("eliminado correctamente");
    }
    console.log(response);
    this.charge();
  }

  async charge(){
    let data:ClinicHistory= new ClinicHistory();
    this.internmentByID = await this.service.getAllInternmentById(this.clinicHistoryByOne.id);
  }

  async loadInternments(data:Internment){
    this.loadInternment = data;
  }

  show(){
    this.details = !this.details;
  }

  formatDate(date:Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
  }

  sumarDias(fecha:any, dias:any){
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  changeSwitch(nro:number){
    this.ngDataSwitch = nro;
    console.log(this.ngDataSwitch);

  }
}
