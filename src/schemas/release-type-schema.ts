import { z } from "zod/v4";
import { SymantecReleaseType } from "../types/enum/symantic-release-type";

export const SemanticReleaseEnumSchema = z.enum(SymantecReleaseType);
