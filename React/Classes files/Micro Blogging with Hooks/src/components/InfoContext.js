import { createContext } from "react";
const InfoContext = createContext({
    AddNewTweet: () => {},
    inAddingProcces:false,
    tweets:[],
})
export default InfoContext