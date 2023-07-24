import { Component,OnInit } from '@angular/core';
import { Breed } from 'src/app/models/Breed';
import { Patient, PatientOrigin } from 'src/app/models/Patient';
import { Size } from 'src/app/models/Size';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit{
  patientList: Patient[] = [];
  breedList: Breed[] = [];
  sizeList: Size[] = [];
  // new
  // patientAdd : Patient = new Patient;
  loadPatients : Patient = new Patient();
  patientUpdate : PatientOrigin = new PatientOrigin();
  patientAdd : PatientOrigin = new PatientOrigin();

  // number
  selectedSize:number = -1;
  selectedBreed:number = -1;
  selectImg:any = [];

  constructor (private service: PatientService){}

  ngOnInit(){
    this.getAllPatient();
    this.fillSelectionBreed();
    this.fillSelectionSize();
  }

  async getAllPatient(){
    this.patientList = await this.service.getAllPatient();
  }

  async patientRegister(){
    console.log(this.selectedBreed,this.selectedSize);
    let date1 = new Date(this.patientAdd.birthdate);
    let date2 = this.sumarDias(date1,-1);
    this.patientAdd.birthdate = date2;
    this.patientAdd.id_size = this.selectedSize;
    this.patientAdd.id_breed = this.selectedBreed;
    if (this.patientAdd.birthdate) {
      const timeDiff = Date.now() - this.patientAdd.birthdate.getTime();
      const ageDate = new Date(timeDiff);
      this.patientAdd.age = Math.abs(ageDate.getUTCFullYear() - 1970);
      // console.log(this.patientAdd.age);
    }

    let response = await this.service.addPatient(this.patientAdd);
    console.log(response);
    this.ngOnInit();
    // console.log("photo",this.selectImg);
    // let response = this.service.uploadFile(this.selectImg[0]);
    // console.log(response);

  }

  async patientEdit(){
    this.patientUpdate.id = this.loadPatients.id;
    this.patientUpdate.name = this.loadPatients.name;
    this.patientUpdate.sex = this.loadPatients.sex;
    this.patientUpdate.birthdate = this.loadPatients.birthdate;
    if (this.patientUpdate.birthdate) {
      let date1 = new Date(this.patientUpdate.birthdate);
      const timeDiff = Date.now() - date1.getTime();
      const ageDate = new Date(timeDiff);
      this.patientUpdate.age = Math.abs(ageDate.getUTCFullYear() - 1970);
      // console.log(this.patientAdd.age);
    }
    // this.patientUpdate.age = this.loadPatients.age;
    this.patientUpdate.weight = this.loadPatients.weight;
    this.patientUpdate.photo = this.loadPatients.photo;

    if (this.selectedBreed == -1) {
      let data  = await this.service.getAllBreedByName(this.loadPatients.breed);
      this.patientUpdate.id_breed = data[0].id;
    }else{
      this.patientUpdate.id_breed = this.selectedBreed;
    }

    if (this.selectedSize == -1) {
      let data  = await this.service.getAllSizeByName(this.loadPatients.tamano);
      this.patientUpdate.id_size = data[0].id;
    }else{
      this.patientUpdate.id_size = this.selectedSize;
    }

    let response = await this.service.updatePatient(this.patientUpdate);
    console.log(response);
    this.ngOnInit();

  }

  async deletePatient(){
    console.log(this.loadPatients.id);
    let response = await this.service.deletePetOwner(this.loadPatients);
    if(response.status != 204){
      alert('No se puede eliminar este registro: Seleccione otro sujeto para la historia Clinica de la Mascota')
    }else{
      alert("eliminado correctamente");
    }
    console.log(response);
    this.ngOnInit();
  }

  loadPatient(patient:Patient){
    this.loadPatients = patient;
  }

  // Start Select
  async fillSelectionSize(){
    this.sizeList = await this.service.getAllSize();
  }
  async fillSelectionBreed(){
    this.breedList = await this.service.getAllBreed();
  }

  selectionBreed(event:any){
    this.selectedBreed = event.target.value;
  }
  selectionSize(event:any){
    this.selectedSize = event.target.value;
  }

  selectionImg(event:any){
    const imagen = event.target.files[0];
    this.selectImg.push(imagen)

    const formData = new FormData();
    this.selectImg.forEach((item:any) => {
      formData.append('files', item)
    });
    let response = this.service.uploadFile(formData);
    // console.log(response);

  }
  // End Select

  sumarDias(fecha:any, dias:any){
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }


}
