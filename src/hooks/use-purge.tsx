import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ROUTES } from "@/constants/routes";

type chatPurgeReasons = "chatDoesNotExist" | "userNotInChat" | "notAnAdmin";

export const usePurge = () => {
  const navigate = useNavigate();

  const purge = (reason: chatPurgeReasons) => {
    switch (reason) {
      case "chatDoesNotExist":
        toast.error("There is no such chat!");
        navigate(`${ROUTES.MESSAGES}`);
        break;
      case "userNotInChat":
        toast.error("You dont have permission to enter this chat!");
        navigate(`${ROUTES.MESSAGES}`);
        break;
      case "notAnAdmin":
        toast.error("You dont have admin permissions!");
        navigate(`${ROUTES.MESSAGES}`);
        break;
    }
  };

  return purge;
};
