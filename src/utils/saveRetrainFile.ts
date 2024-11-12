// src/utils/saveRetrainFile.ts
import { RetrainEntry } from "../types/types";

export const saveRetrainData = async (data: RetrainEntry[]) => {
  const fileData = JSON.stringify(data, null, 2);
  const blob = new Blob([fileData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  /* const a = document.createElement("a");
  a.href = url;
  a.download = "retrain.json";
  a.click(); */

  URL.revokeObjectURL(url);
};