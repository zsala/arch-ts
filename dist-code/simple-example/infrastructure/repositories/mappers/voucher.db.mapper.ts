
import Voucher from "../../../domain/voucher";
import { VoucherModel } from "../models";

export default class VoucherDbMapper {
  toDomain(dbVoucher: VoucherModel): Voucher {
    const voucher = new Voucher({
      id: dbVoucher.id,
      name: dbVoucher.name,
      discount: dbVoucher.discount,
    });
    return voucher;
  }
}
