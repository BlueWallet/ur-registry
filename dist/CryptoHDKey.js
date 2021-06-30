"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoHDKey = void 0;
const CryptoCoinInfo_1 = require("./CryptoCoinInfo");
const CryptoKeypath_1 = require("./CryptoKeypath");
const cbor_sync_1 = require("./lib/cbor-sync");
const DataItem_1 = require("./lib/DataItem");
const RegistryItem_1 = require("./RegistryItem");
const RegistryType_1 = require("./RegistryType");
var Keys;
(function (Keys) {
    Keys[Keys["is_master"] = 1] = "is_master";
    Keys[Keys["is_private"] = 2] = "is_private";
    Keys[Keys["key_data"] = 3] = "key_data";
    Keys[Keys["chain_code"] = 4] = "chain_code";
    Keys[Keys["use_info"] = 5] = "use_info";
    Keys[Keys["origin"] = 6] = "origin";
    Keys[Keys["children"] = 7] = "children";
    Keys[Keys["parent_fingerprint"] = 8] = "parent_fingerprint";
    Keys[Keys["name"] = 9] = "name";
    Keys[Keys["note"] = 10] = "note";
})(Keys || (Keys = {}));
class CryptoHDKey extends RegistryItem_1.RegistryItem {
    constructor(args) {
        super();
        this.getKey = () => this.key;
        this.getChainCode = () => this.chainCode;
        this.isMaster = () => this.master;
        this.isPrivateKey = () => !!this.privateKey;
        this.getUseInfo = () => this.useInfo;
        this.getOrigin = () => this.origin;
        this.getChildren = () => this.children;
        this.getParentFingerprint = () => this.parentFingerprint;
        this.getName = () => this.name;
        this.getNote = () => this.note;
        this.getRegistryType = () => {
            return RegistryType_1.RegistryTypes.CRYPTO_HDKEY;
        };
        this.setupMasterKey = (args) => {
            this.master = true;
            this.key = args.key;
            this.chainCode = args.chainCode;
        };
        this.setupDeriveKey = (args) => {
            this.master = false;
            this.privateKey = args.isPrivateKey;
            this.key = args.key;
            this.chainCode = args.chainCode;
            this.useInfo = args.useInfo;
            this.origin = args.origin;
            this.children = args.children;
            this.parentFingerprint = args.parentFingerprint;
            this.name = args.name;
            this.note = args.note;
        };
        this.toDataItem = () => {
            const map = {};
            if (this.master) {
                map[Keys.is_master] = true;
                map[Keys.key_data] = this.key;
                map[Keys.chain_code] = this.chainCode;
            }
            else {
                if (this.privateKey !== undefined) {
                    map[Keys.is_private] = this.privateKey;
                }
                map[Keys.key_data] = this.key;
                if (this.chainCode) {
                    map[Keys.chain_code] = this.chainCode;
                }
                if (this.useInfo) {
                    const useInfo = this.useInfo.toDataItem();
                    useInfo.setTag(this.useInfo.getRegistryType().getTag());
                    map[Keys.use_info] = useInfo;
                }
                if (this.origin) {
                    const origin = this.origin.toDataItem();
                    origin.setTag(this.origin.getRegistryType().getTag());
                    map[Keys.origin] = origin;
                }
                if (this.children) {
                    const children = this.children.toDataItem();
                    children.setTag(this.children.getRegistryType().getTag());
                    map[Keys.children] = children;
                }
                if (this.parentFingerprint) {
                    map[Keys.parent_fingerprint] = this.parentFingerprint.readUInt32BE();
                }
                if (this.name !== undefined) {
                    map[Keys.name] = this.name;
                }
                if (this.note !== undefined) {
                    map[Keys.note] = this.note;
                }
            }
            return new DataItem_1.DataItem(map);
        };
        if (args.isMaster) {
            this.setupMasterKey(args);
        }
        else {
            this.setupDeriveKey(args);
        }
    }
}
exports.CryptoHDKey = CryptoHDKey;
CryptoHDKey.fromDataItem = (dataItem) => {
    const map = dataItem.getData();
    const isMaster = !!map[Keys.is_master];
    const isPrivateKey = map[Keys.is_private];
    const key = map[Keys.key_data];
    const chainCode = map[Keys.chain_code];
    const useInfo = map[Keys.use_info]
        ? CryptoCoinInfo_1.CryptoCoinInfo.fromDataItem(map[Keys.use_info])
        : undefined;
    const origin = map[Keys.origin]
        ? CryptoKeypath_1.CryptoKeypath.fromDataItem(map[Keys.origin])
        : undefined;
    const children = map[Keys.children]
        ? CryptoKeypath_1.CryptoKeypath.fromDataItem(map[Keys.children])
        : undefined;
    let _parentFingerprint = map[Keys.parent_fingerprint];
    let parentFingerprint;
    if (_parentFingerprint) {
        parentFingerprint = Buffer.alloc(4);
        parentFingerprint.writeUInt32BE(_parentFingerprint);
    }
    const name = map[Keys.name];
    const note = map[Keys.note];
    return new CryptoHDKey({
        isMaster,
        isPrivateKey,
        key,
        chainCode,
        useInfo,
        origin,
        children,
        parentFingerprint,
        name,
        note,
    });
};
CryptoHDKey.fromCBOR = (_cborPayload) => {
    const dataItem = cbor_sync_1.decodeToDataItem(_cborPayload);
    return CryptoHDKey.fromDataItem(dataItem);
};
//# sourceMappingURL=CryptoHDKey.js.map