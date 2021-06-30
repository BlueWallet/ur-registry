"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bytes = void 0;
const cbor_sync_1 = require("./lib/cbor-sync");
const DataItem_1 = require("./lib/DataItem");
const RegistryItem_1 = require("./RegistryItem");
const RegistryType_1 = require("./RegistryType");
class Bytes extends RegistryItem_1.RegistryItem {
    constructor(bytes) {
        super();
        this.bytes = bytes;
        this.getRegistryType = () => {
            return RegistryType_1.RegistryTypes.BYTES;
        };
        this.getData = () => this.bytes;
        this.toDataItem = () => {
            return new DataItem_1.DataItem(this.bytes);
        };
    }
}
exports.Bytes = Bytes;
Bytes.fromDataItem = (dataItem) => {
    const bytes = dataItem.getData();
    if (!bytes) {
        throw new Error(`#[ur-registry][Bytes][fn.fromDataItem]: decoded [dataItem][#data] is undefined: ${dataItem}`);
    }
    return new Bytes(bytes);
};
Bytes.fromCBOR = (_cborPayload) => {
    const dataItem = cbor_sync_1.decodeToDataItem(_cborPayload);
    return Bytes.fromDataItem(dataItem);
};
//# sourceMappingURL=Bytes.js.map