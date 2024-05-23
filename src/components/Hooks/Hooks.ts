import { useContext } from "react";
import { GlobalStateContext } from "../../Globalstate";

export const useGlobalState = () => {
    return useContext(GlobalStateContext)
}


//Utility Functions as Hooks: useHandleAddToReadBooks and useHandleAddToFavorites are hooks that encapsulate //the logic and can be used within a component.
//Custom Hook: useGlobalState encapsulates the useContext call.