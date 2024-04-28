import { CYC9101A } from "./trainings/CYC9101A";
import { CYC9102A } from "./trainings/CYC9102A";
import { CYC9104A } from "./trainings/CYC9104A";
import { CYC9106A } from "./trainings/CYC9106A";
import { LG02501A } from "./trainings/LG02501A";
import { CYC9105A } from "./trainings/CYC9105A";
import { DEP_CYC9102A } from "./trainings/DEP_CYC9102A";

export interface Training {
    code: string;
    name: string;
    curriculum: SkillBlock[];
}

export interface SkillBlock {
    ects: number;
    units: TeachingUnit[];
    children: SkillBlock[];
    required_children: number
}

export interface TeachingUnit {
    code: string;
    title: string;
    ects: number;
}

export const trainings: Training[] = [
    CYC9101A,
    CYC9102A,
    CYC9104A,
    CYC9105A,
    CYC9106A,
    LG02501A,
    DEP_CYC9102A
]