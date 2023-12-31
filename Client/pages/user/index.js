import { useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";

const UserIndex = () => {
    //state


    const { state: { user } } = useContext(Context);



    return (
        <UserRoute>
            <h1 className="jumbotron text-center square">
                Dashboard
            </h1>
        </UserRoute>
    )
}

export default UserIndex;