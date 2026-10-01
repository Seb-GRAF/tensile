"use client";

import { useState } from "react";
import { Toggle } from "tensile";

export function Settings() {
  const [digest, setDigest] = useState(false);
  return <Toggle label="Weekly digest" name="digest" checked={digest} onCheckedChange={setDigest} />;
}
