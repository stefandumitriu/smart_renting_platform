import { NewApplication } from "../../models/listings/application";
import {
  ApplicationStatus,
  DbApplication,
} from "@packages/db/models/listings/application";
import { v4 as uuidv4 } from "uuid";

export function convertNewApplicationToDbApplication(
  newApplication: NewApplication
): DbApplication {
  return {
    ...newApplication,
    id: uuidv4(),
    status: ApplicationStatus.Waiting,
  };
}
