import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            children: [
                {
                    path: "/",
                    name: "dashboard",
                    component: () => import("../views/DashboardView.vue"),
                },
                {
                    path: "chat",
                    name: "chat",
                    component: () => import("../views/ChatView.vue"),
                },
                {
                    path: "schedule",
                    name: "schedule",
                    component: () => import("../views/ScheduleView.vue"),
                },
                {
                    path: "employees",
                    name: "employees",
                    component: () => import("../views/EmployeeView.vue"),
                    children: [
                        {
                            path: "",
                            name: "employees-list",
                            component: () =>
                                import("../views/EmployeeListView.vue"),
                        },
                        {
                            path: "add",
                            name: "add-employee",
                            component: () =>
                                import("../views/AddEmployeeView.vue"),
                        },
                    ],
                },
            ],
        },
        {
            path: "/signin",
            name: "signin",
            component: () => import("../views/SignIn.vue"),
        },
        {
            path: "/signup",
            name: "signup",
            component: () => import("../views/SignUp.vue"),
        },
    ],
});

export default router;
