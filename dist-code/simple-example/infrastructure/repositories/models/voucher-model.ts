import { IVoucherData } from "../interfaces";

export default class VoucherModel {
  id: string;
  name: string;
  discount: number;
  
  constructor(voucherData: IVoucherData) {
    this.id = voucherData.id;
    this.name = voucherData.name;
    this.discount = voucherData.discount;
  }
}
