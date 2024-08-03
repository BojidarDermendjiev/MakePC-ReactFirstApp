import { useContext, useEffect, useState } from "react";
import { authContext } from "../context/authContext";

export default function useAuth() {
  const { user: userContext } = useContext(authContext) || {};
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userContext) {
      setUser(userContext);
    }
  }, [userContext]);

  return [user, setUser];
}
