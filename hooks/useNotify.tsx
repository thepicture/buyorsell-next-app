import { useState } from "react";

import { Snackbar } from "@mui/material";
import { useEffect } from "react";

const AUTO_HIDE_DURATION_MILLISECONDS = 6000;

export const useNotify = () => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = () => {
    setMessage("");
    setOpen(false);
  };

  const NotifyBar = () => (
    <Snackbar
      open={open}
      autoHideDuration={AUTO_HIDE_DURATION_MILLISECONDS}
      onClose={handleClose}
      message={message}
    />
  );

  return { notify: setMessage, NotifyBar };
};
