export enum RecordType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export interface RecordInterface {
  amount: number;
  type: RecordType;
}
export class Record implements RecordInterface {
  constructor(public amount: number, public type: RecordType) {}
}