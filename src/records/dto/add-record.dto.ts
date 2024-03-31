import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { ProjectModeTypes } from "src/data/project-mode-types";

export class AddRecordDto {
    @IsNotEmpty()
    @IsEnum(ProjectModeTypes)
    type: ProjectModeTypes

    @IsNotEmpty()
    kloc: number

    @IsNotEmpty()
    adtAtr: JSON
}