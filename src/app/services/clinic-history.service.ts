import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
// import { environment } from 'src/environments/environment';
import { CLINIC_HISTORY, INTERNMENT, PATIENT, PET_OWNER } from '../utils/tablesNames';
import { Observable } from 'rxjs';
import { ClinicHistory, ClinicHistoryOrigin } from '../models/ClinicHistory';
import { Internment } from '../models/Internment';
// import { supabase } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClinicHistoryService {
  private supabase : SupabaseClient;
  // private supabase = supabase;

  constructor() {
    this.supabase = createClient(
      "https://jdycrzvkdoomrgbkzqmi.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkeWNyenZrZG9vbXJnYmt6cW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAwNzM0MTgsImV4cCI6MjAwNTY0OTQxOH0.CfsjgTSPZjw4pSqxm96vG8emdAM6Plhxq8SIZ1nFpi8",
    )
  }

  // Clinic History
  async getAllClinicHistory(){
    const clinicHistory = await this.supabase.rpc('get_clinic_history');
    return clinicHistory.data || [];
  }

  async addClinicHistory(newClinicHistory:ClinicHistoryOrigin){
    const  addClinicHistory = await this.supabase.from(CLINIC_HISTORY).insert(newClinicHistory).select();
    return addClinicHistory || [];
  }

  // Internment
  async getAllInternmentById(id:number){
    const internment_list = await this.supabase.from(INTERNMENT).select("*").eq("id_clinic_history",id);
    return internment_list.data || [];
  }


  // Patient
  async getAllPatient(){
    const data_patient = await this.supabase.from(PATIENT).select("*");
    return data_patient.data || [];
  }

  // Owner
  async getAllPetOwner(){
    const data_pet_owner = await this.supabase.from(PET_OWNER).select("*");
    return data_pet_owner.data || [];
  }
  // Internment
  async addInternment(newInternmentOrigin:Internment){
    const  addnewInternmentOrigin = await this.supabase.from(INTERNMENT).insert(newInternmentOrigin).select();
    return addnewInternmentOrigin || [];
  }

  async updateInternment(updateInternment:Internment){
    const  updateInternments = await this.supabase.from("INTERNMENT").update(updateInternment).eq('id',updateInternment.id).select();
    return updateInternments || [];
  }

  async deleteInternment(deleteInternment:Internment){
    const  deleteInternments = await this.supabase.from('INTERNMENT').delete().eq('id',deleteInternment.id);
    return deleteInternments || [];
  }

}
