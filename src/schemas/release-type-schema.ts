import { z } from "zod";
import { SymantecReleaseType } from "../types/enum/symantic-release-type";

export const SemanticReleaseEnumSchema = z.nativeEnum(SymantecReleaseType);
