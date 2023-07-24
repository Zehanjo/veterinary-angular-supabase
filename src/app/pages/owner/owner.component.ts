import { Component, OnInit } from '@angular/core';
import { DocumentType } from 'src/app/models/DocumentType';
import { PetOwner, PetOwnerOrigin } from 'src/app/models/PetOwner';
import { PetOwnerService } from 'src/app/services/pet-owner.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit{
  petOwnerList: PetOwner[] = [];
  documentTypeList: DocumentType[] = [];
  // new
  loadPetOwnerData: PetOwner = new PetOwner();
  petOwnerAdd: PetOwnerOrigin = new PetOwnerOrigin();
  petOwnerUpdate: PetOwnerOrigin = new PetOwnerOrigin();
  //
  selectedPetOwner:number = -1;

  constructor(private service: PetOwnerService) { }
  ngOnInit() {
    this.getAllPetOwner();
    this.fillSelectionDocumentType();
  }


  async getAllPetOwner(){
    this.petOwnerList = await this.service.getAllPetOwner();
  }

  async petOwnerRegister(){
    this.petOwnerAdd.id_type_document = this.selectedPetOwner;
    let response = await this.service.addPetOwner(this.petOwnerAdd);
    console.log(response);
    this.ngOnInit();
  }

  async petOwnerEdit(){
    this.petOwnerUpdate.id = this.loadPetOwnerData.id;
    this.petOwnerUpdate.lastname = this.loadPetOwnerData.lastname;
    this.petOwnerUpdate.mother_lastname = this.loadPetOwnerData.mother_lastname;
    this.petOwnerUpdate.firstname = this.loadPetOwnerData.firstname;
    this.petOwnerUpdate.phone = this.loadPetOwnerData.phone;
    this.petOwnerUpdate.gmail = this.loadPetOwnerData.gmail;
    this.petOwnerUpdate.address = this.loadPetOwnerData.address;
    this.petOwnerUpdate.reference = this.loadPetOwnerData.reference;
    this.petOwnerUpdate.nr_document = this.loadPetOwnerData.nr_document;
    if (this.selectedPetOwner == -1) {
      let data  = await this.service.getAllDocumentTypeByName(this.loadPetOwnerData.name_type_document);
      this.petOwnerUpdate.id_type_document = data[0].id;
    }else{
      this.petOwnerUpdate.id_type_document = this.selectedPetOwner;
    }
    let response = await this.service.updatePetOwner(this.petOwnerUpdate);
    console.log(response);
    this.ngOnInit();
  }

  async petOwnerDelete(){
    console.log(this.loadPetOwnerData.id);
    let response = await this.service.deletePetOwner(this.loadPetOwnerData);
    if(response.status != 204){
      alert('No se puede eliminar este registro: Seleccione otro sujeto para la historia Clinica de la Mascota')
    }else{
      alert("eliminado correctamente");
    }
    console.log(response);

  }

  loadPetOwner(data:PetOwner){
    this.loadPetOwnerData = data;
  }

  // Start Select

  selectionDocumentType(event:any){
    this.selectedPetOwner = event.target.value;
    console.log(this.selectedPetOwner);
  }

  async fillSelectionDocumentType(){
    this.documentTypeList = await this.service.getAllDocumentType();
  }

  // End Selects

}
