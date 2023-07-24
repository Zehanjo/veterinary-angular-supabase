import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { DOCUMENT_TYPE, PET_OWNER } from '../utils/tablesNames';
import { PetOwner, PetOwnerOrigin } from '../models/PetOwner';

@Injectable({
  providedIn: 'root'
})
export class PetOwnerService {
  private supabase : SupabaseClient;
  constructor() {
    this.supabase = createClient(
      "https://jdycrzvkdoomrgbkzqmi.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkeWNyenZrZG9vbXJnYmt6cW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAwNzM0MTgsImV4cCI6MjAwNTY0OTQxOH0.CfsjgTSPZjw4pSqxm96vG8emdAM6Plhxq8SIZ1nFpi8",
    )
   }

  async getAllPetOwner(){
    const petOwnerList = await this.supabase.rpc('get_pet_owner');
    return petOwnerList.data || [];
  }

  async addPetOwner(newPetOwnerOrigin:PetOwnerOrigin){
    const  addPetOwnerOrigin = await this.supabase.from(PET_OWNER).insert(newPetOwnerOrigin).select();
    return addPetOwnerOrigin || [];
  }

  async updatePetOwner(updatePetOwnerOrigin:PetOwnerOrigin){
    const  updatesPetOwnerOrigin = await this.supabase.from(PET_OWNER).update(updatePetOwnerOrigin).eq('id',updatePetOwnerOrigin.id).select();
    return updatesPetOwnerOrigin || [];
  }

  async deletePetOwner(deletePetOwner:PetOwner){
    const  deletePetOwnerOrigin = await this.supabase.from('PET_OWNER').delete().eq('id',deletePetOwner.id);
    return deletePetOwnerOrigin || [];
  }


  async getAllDocumentTypeByName(name:string){
    const documentTypeByName = await this.supabase.from("DOCUMENT_TYPE").select('*').eq('name',name);
    return documentTypeByName.data || [];
  }

  async getAllDocumentType(){
    const documentTypeList = await this.supabase.from("DOCUMENT_TYPE").select("*");
    return documentTypeList.data || [];
  }



}
