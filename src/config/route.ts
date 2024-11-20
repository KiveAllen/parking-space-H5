import Index from "../pages/Index.vue";
import Part from "../pages/Part.vue";
import User from "../pages/User.vue";
import Order from "../pages/Order.vue";

const routes = [
    {path: '/', title: '主页', component: Index},
    {path: '/part', title: '车位', component: Part},
    {path: '/order', title: '订单', component: Order},
    {path: '/user', title: '个人', component: User},
]

export default routes;
