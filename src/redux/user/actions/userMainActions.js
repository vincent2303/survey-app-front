
import { 
    TOGGLE_DRAWER_ACTION,
    SWITCH_PAGE_ACTION,
} from "./userTypes";

export function toggleDrawer(open) {
    return {
        type: TOGGLE_DRAWER_ACTION,
        payload: {
            toggleDrawer: open
        }
    }
}

export function switchPage(page) {
    return {
        type: SWITCH_PAGE_ACTION,
        payload: {
            page: page
        }
    }
}
