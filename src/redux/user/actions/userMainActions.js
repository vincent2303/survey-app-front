
import { 
    TOGGLE_DRAWER_ACTION
} from "./userTypes";

export function toggleDrawer(open) {
    return {
        type: TOGGLE_DRAWER_ACTION,
        payload: {
            toggleDrawer: open
        }
    }
}