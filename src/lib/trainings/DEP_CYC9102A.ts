import * as _ from '$lib/const';

export const DEP_CYC9102A = {
    code: "DEP_CYC9102A",
    name: "[DEPRECATED] Diplôme d'ingénieur Spécialité informatique Parcours Informatique Modelisation et Optimisation",
    curriculum: [
        { "ects": 15, "units": [_.UTC501, _.UTC502, _.UTC503, _.UTC504, _.UTC505], "required_children": 0, "children": [] },
        {
            "ects": 36, "units": [], "required_children": 0, "children": [
                { "ects": 6, "units": [_.RCP101, _.RCP104, _.RCP105, _.RCP110], "required_children": 0, "children": [] },
                { "ects": 6, "units": [_.NSY103, _.NSY104, _.NSY115, _.NSY014, _.NFP119, _.NFP121, _.GLG105, _.SEC102], "required_children": 0, "children": [] },
                { "ects": 6, "units": [_.NFE108, _.NFP107, _.NFE115, _.NFE113, _.NFE114, _.SEC101], "required_children": 0, "children": [] },
                { "ects": 6, "units": [_.RSX101, _.RSX102, _.RSX103, _.MUX101, _.MUX102, _.SMB101, _.SEC105], "required_children": 0, "children": [] },
            ]
        },
        { "ects": 6, "units": [_.ANG100, _.ANG330], "required_children": 0, "children": [] },
        { "ects": 18, "units": [_.UAAD91, _.UAEP01, _.UAEP02], "required_children": 0, "children": [] },
        { "ects": 12, "units": [_.RCP103, _.RCP105, _.RCP110, _.NSY135, _.RSX103, _.GLG101, _.NFP103, _.NFP106, _.NFP108, _.NFE107, _.SMB111], "required_children": 0, "children": [] },
        { "ects": 12, "units": [_.RCP207, _.RCP208, _.RCP209, _.STA211, _.STA201], "required_children": 0, "children": [] },

        { "ects": 18, "units": [_.CFA109, _.MSE102, _.MSE103, _.GFN106, _.PRS201, _.ESC101, _.MSE147, _.DSY101, _.DVE207, _.UEU001, _.UEU002, _.ESD104, _.ENG210, _.RTC201, _.GDN100, _.DNT104, _.MTR107, _.HSE133, _.HSE134, _.HSE225, _.ERG105, _.FPG114, _.TET102, _.DRS101, _.DRS102, _.DRS106, _.FAD111, _.FAB121, _.GME101], "required_children": 0, "children": [] },
        { "ects": 63, "units": [_.UA2B30, _.ENG221, _.UAEP03, _.UAMM91], "required_children": 0, "children": [] },
    ]
}