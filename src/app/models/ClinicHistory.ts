export class ClinicHistory {
  id!: number;
  created_at: Date = new Date();
  photo!: string;
  name!: string;
  age!: number;
  owner_firstname!: string;
  owner_lastname!: string;
  address!: string;
}

export class ClinicHistoryOrigin {
  id!: number;
  created_at!: Date;
  id_patient!:number;
  id_owner!:number;
}
