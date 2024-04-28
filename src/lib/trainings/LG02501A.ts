import * as _ from '$lib/const';

export const LG02501A = {
    code: "LG02501A",
    name: "Licence informatique",
    curriculum: [
        { ects: 15, units: [_.UTC501, _.UTC502, _.UTC503, _.UTC504, _.UTC505], required_children: 0, children: [] },
        {
            ects: 18,
            units: [],
            required_children: 3,
            children: [
                { ects: 6, units: [_.NFP119, _.NFP121, _.GLG105, _.NSY115], required_children: 0, children: [] },
                { ects: 6, units: [_.NFE108, _.NFP107, _.SEC101, _.NFE114], required_children: 0, children: [] },
                { ects: 6, units: [_.NSY103, _.NSY104, _.NSY014, _.SEC102, _.SMB101], required_children: 0, children: [] },
                { ects: 6, units: [_.RSX101, _.RSX102, _.MUX101, _.SEC105], required_children: 0, children: [] },
                { ects: 6, units: [_.RCP105, _.RCP101], required_children: 0, children: [] }
            ]
        },
        { ects: 10, units: [_.GDN100, _.ANG320], required_children: 0, children: [] },
        {
            ects: 17, units: [], required_children: 1, children: [
                { ects: 50, units: [_.UAAL0S], required_children: 0, children: [] },
                { ects: 17, units: [_.UAAL0T], required_children: 0, children: [] },
            ]
        }
    ]
}