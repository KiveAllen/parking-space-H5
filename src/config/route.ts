import Index from "../pages/Index.vue";
import Part from "../pages/Part.vue";
import User from "../pages/User.vue";
import Order from "../pages/Order.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import PartAdd from "../pages/PartAdd.vue";

const routes = [
    {path: '/', title: '主页', component: Index},
    {path: '/part', title: '车位信息', component: Part},
    {path: '/partAdd', title: '添加车位', component: PartAdd},
    {path: '/order', title: '订单信息', component: Order},
    {path: '/user', title: '个人信息', component: User},
    {path: '/userLogin', title: '个人信息', component: UserLoginPage},
    {path: '/userUpdate', title: '修改个人信息', component: UserUpdatePage},
]

export default routes;
