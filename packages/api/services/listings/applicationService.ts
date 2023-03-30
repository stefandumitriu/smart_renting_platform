import { NewApplication } from "../../models/listings/application";
import { storeApplication } from "@packages/db/services/listings/applicationService";
import { convertNewApplicationToDbApplication } from "../../convertors/listings/application";
import { DbApplication } from "@packages/db/models/listings/application";

export async function createNewApplication(
  newApplication: NewApplication
): Promise<DbApplication> {
  return (
    await storeApplication(convertNewApplicationToDbApplication(newApplication))
  )[0];
}
