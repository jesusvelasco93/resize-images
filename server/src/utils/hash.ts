import * as crypto from "crypto";

const Hash = {
  md5: (data: Buffer) => crypto.createHash("md5").update(data).digest("hex"),
};

export default Hash;
