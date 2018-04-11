export enum RecordType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export interface RecordInterface {
  amount: number;
  type: RecordType;
}

export class Record {
  constructor(public amount: number, public type: RecordType) {}
}