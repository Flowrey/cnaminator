import { error } from "@sveltejs/kit";
import { trainings } from "$lib";

export function load({ params }) {
    const training = trainings.find((training) => training.code === params.code);

    if (!training) throw error(404);

    return {
        training,
    };
}