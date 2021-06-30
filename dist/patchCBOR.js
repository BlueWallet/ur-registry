"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cbor_sync_1 = require("./lib/cbor-sync");
const DataItem_1 = require("./lib/DataItem");
const RegistryType_1 = require("./RegistryType");
const ScriptExpression_1 = require("./ScriptExpression");
const alreadyPatchedTag = [];
const patchTags = (tags) => {
    tags.forEach((tag) => {
        if (alreadyPatchedTag.find((i) => i === tag))
            return;
        cbor_sync_1.addSemanticEncode(tag, (data) => {
            if (data instanceof DataItem_1.DataItem) {
                if (data.getTag() === tag) {
                    return data.getData();
                }
            }
        });
        cbor_sync_1.addSemanticDecode(tag, (data) => {
            return new DataItem_1.DataItem(data, tag);
        });
        alreadyPatchedTag.push(tag);
    });
};
const registryTags = Object.values(RegistryType_1.RegistryTypes).filter(r => !!r.getTag()).map((r) => r.getTag());
const scriptExpressionTags = Object.values(ScriptExpression_1.ScriptExpressions).map((se) => se.getTag());
patchTags(registryTags.concat(scriptExpressionTags));
//# sourceMappingURL=patchCBOR.js.map