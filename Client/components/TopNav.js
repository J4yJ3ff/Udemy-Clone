import { Menu } from "antd";
import Link from "next/link";
import { AppstoreOutlined, CoffeeOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined, CarryOutOutlined, TeamOutlined } from '@ant-design/icons';
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";




import { Context } from "../context";


const { Item, SubMenu, ItemGroup } = Menu; // avoid using item.menu

const TopNav = () => {

    const [current, setCurrent] = useState("");

    const { state, dispatch } = useContext(Context);

    const router = useRouter();

    const { user } = state;

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname])

    const logout = async () => {
        dispatch({ type: "LOGOUT" });
        window.localStorage.removeItem("user");
        const { data } = await axios.get("/api/logout");
        toast(data.message);
        router.push("/login");
    }

    return (
        <Menu mode="horizontal" selectedKeys={[current]} className="mb-2">
            <Item key="/" onClick={(e) => setCurrent(e.key)} icon={<AppstoreOutlined />}>
                <Link href="/" >App</Link>
            </Item>

            {user && user.role && user.role.includes("Instructor")
                ?
                (<Item key="/instructor/course/create" onClick={(e) => setCurrent(e.key)} icon={<CarryOutOutlined />}>
                    <Link href="/instructor/course/create">Create Course</Link>
                </Item>)
                :
                (
                    <Item key="/user/become-instructor" onClick={(e) => setCurrent(e.key)} icon={<TeamOutlined />}>
                        <Link href="/user/become-instructor">Become Instructor</Link>
                    </Item>
                )}

            {user === null && (
                <>
                    <Item key="login" onClick={(e) => setCurrent(e.key)} icon={<LoginOutlined />}>
                        <Link href="/login">Login</Link>
                    </Item>

                    <Item key="/register" onClick={(e) => setCurrent(e.key)} icon={<UserAddOutlined />}>
                        <Link href="/register">Register</Link>
                    </Item>
                </>
            )}

            {user && user.role && user.role.includes("Instructor") &&
                (
                    <>
                        <Item key="login" onClick={(e) => setCurrent(e.key)} style={{ marginLeft: 'auto'}} icon={<LoginOutlined />}>
                            <Link href="/instructor">Instructor</Link>
                        </Item>
                    </>
                )
            }

            {user !== null && (
                <SubMenu icon={<CoffeeOutlined />} title={user && user.name} style={{ marginLeft: '20px' }}>
                    <ItemGroup>
                        <Item key="/user">
                            <Link href="/user">Dashboard</Link>
                        </Item>
                        <Item onClick={logout} icon={<LogoutOutlined />} >
                            Logout
                        </Item>
                    </ItemGroup>
                </SubMenu>

            )}


        </Menu>
    );
};

export default TopNav;