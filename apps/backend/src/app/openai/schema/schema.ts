import { z } from "zod/v3";


const menuItem = z.object({
    "label": z.string(),
    "route": z.string(),
    "icon": z.string(),
});

const navigationState =  z.object({
    "navigationConfig": z.array(menuItem),
    "message": z.string(),
});

export default navigationState;

export type NavigationState = z.infer<typeof navigationState>;