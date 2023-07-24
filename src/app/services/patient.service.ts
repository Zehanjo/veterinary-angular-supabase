import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { HttpClient } from "@angular/common/http";
import { BREED, PATIENT, SIZE } from '../utils/tablesNames';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { Patient, PatientOrigin } from '../models/Patient';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private supabase : SupabaseClient;
  constructor(private http:HttpClient) {
    this.supabase = createClient(
      "https://jdycrzvkdoomrgbkzqmi.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkeWNyenZrZG9vbXJnYmt6cW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAwNzM0MTgsImV4cCI6MjAwNTY0OTQxOH0.CfsjgTSPZjw4pSqxm96vG8emdAM6Plhxq8SIZ1nFpi8",
    );

  }

  async getAllPatient(){
    const patientList = await this.supabase.rpc('get_patient');
    return patientList.data || [];
  }

  async addPatient(newPatientOrigin:PatientOrigin){
    const  addPetOrigin = await this.supabase.from(PATIENT).insert(newPatientOrigin).select();
    return addPetOrigin || [];
  }

  async updatePatient(updatePatientOrigin:PatientOrigin){
    const  updatesPatientOrigin = await this.supabase.from("PATIENT").update(updatePatientOrigin).eq('id',updatePatientOrigin.id).select();
    return updatesPatientOrigin || [];
  }

  async deletePetOwner(deletePatient:Patient){
    const  deletesPatient = await this.supabase.from('PATIENT').delete().eq('id',deletePatient.id);
    return deletesPatient || [];
  }

  async getAllBreed(){
    const breedList = await this.supabase.from(BREED).select();
    return breedList.data || [];
  }
  async getAllSize(){
    const SizeList = await this.supabase.from(SIZE).select();
    return SizeList.data || [];
  }

  async getAllSizeByName(name:string){
    const documentTypeByName = await this.supabase.from(SIZE).select('*').eq('name',name);
    return documentTypeByName.data || [];
  }
  async getAllBreedByName(name:string){
    const documentTypeByName = await this.supabase.from(BREED).select('*').eq('name',name);
    return documentTypeByName.data || [];
  }

  // Upload File
  async uploadFile(avatarFile:any){
    const data = await this.supabase.storage.from('profile_pet').upload('public/dog.jpg',avatarFile);
  }
  // uploadImage(vals:any):Observable<any>{
  //   let data = vals;
  //   return this.http.post('https://api.cloudinary.com/v1_1/dqn8qzewu/image/upload',data)
  // }
}
