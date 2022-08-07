import fs from "fs";
import { Service } from "typedi";
import VoucherModel from "./models/voucher-model";

export const folderPathVouchers = "./local-data/vouchers/";

@Service()
export default class VoucherRepository {
  getById(id: string): VoucherModel | null {
    let data;
    try {
      const path = folderPathVouchers + id.toLowerCase() + ".json";
      data = fs.readFileSync(path, "utf8");
      const voucher: VoucherModel = JSON.parse(data);
      return voucher;
    } catch (err) {
      return null;
    }
  }
}
