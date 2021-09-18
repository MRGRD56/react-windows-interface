import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";

const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators({

    }, dispatch);
}

export default useActions;
