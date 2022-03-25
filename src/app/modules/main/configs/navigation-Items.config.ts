import { INavItem } from "../../../models/nav-item.model";

export function getNavigationItems(): INavItem[] {
    return [
        {
            label: "Home",
            route: "home",
            routerLinkActive: "active",
        },
        {
            label: "Users",
            route: "users",
            routerLinkActive: "active",
        },
        {
            label: "Posts",
            route: "posts",
            routerLinkActive: "active",
        }
    ]
}
