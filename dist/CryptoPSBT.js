"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoPSBT = void 0;
const cbor_sync_1 = require("./lib/cbor-sync");
const DataItem_1 = require("./lib/DataItem");
const RegistryItem_1 = require("./RegistryItem");
const RegistryType_1 = require("./RegistryType");
class CryptoPSBT extends RegistryItem_1.RegistryItem {
    constructor(psbt) {
        super();
        this.psbt = psbt;
        this.getRegistryType = () => RegistryType_1.RegistryTypes.CRYPTO_PSBT;
        this.getPSBT = () => this.psbt;
        this.toDataItem = () => {
            return new DataItem_1.DataItem(this.psbt);
        };
    }
}
exports.CryptoPSBT = CryptoPSBT;
CryptoPSBT.fromDataItem = (dataItem) => {
    const psbt = dataItem.getData();
    if (!psbt) {
        throw new Error(`#[ur-registry][CryptoPSBT][fn.fromDataItem]: decoded [dataItem][#data] is undefined: ${dataItem}`);
    }
    return new CryptoPSBT(psbt);
};
CryptoPSBT.fromCBOR = (_cborPayload) => {
    const dataItem = cbor_sync_1.decodeToDataItem(_cborPayload);
    return CryptoPSBT.fromDataItem(dataItem);
};
//# sourceMappingURL=CryptoPSBT.js.map