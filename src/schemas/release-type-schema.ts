import { z } from "zod/v4";
import { SemanticReleaseType } from "../types/enum/semantic-release-type";

export const SemanticReleaseEnumSchema = z.enum(SemanticReleaseType);
