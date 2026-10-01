"use client";

import { useState } from "react";
import { Button, Spinner, Toggle } from "tensile";

export function Settings() {
  const [digest, setDigest] = useState(false);
  return (
    <>
      <Toggle label="Weekly digest" name="digest" checked={digest} onCheckedChange={setDigest} />
      <Button onClick={() => setDigest(false)}>Reset digest</Button>
      <span role="status" aria-label="Loading preview"><Spinner /></span>
    </>
  );
}
