import { useRef } from "react";

type ChildData = {
  [key: string]: boolean;
};

export const useAddUsersControls = () => {
  const childData = useRef<ChildData>({});

  const handleCollectChildData = (id: string, state: boolean) => {
    childData.current[id] = state;
  };

  const getUsersIDs = () => {
    const res: string[] = [];
    for (const [key, value] of Object.entries(childData.current)) {
      if (value) res.push(key);
    }
    return res;
  };

  const clearUsers = () => {
    childData.current = {};
  };

  return { getUsersIDs, clearUsers, handleCollectChildData };
};
