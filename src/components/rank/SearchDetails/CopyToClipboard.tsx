import { useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface IProps {
  text: string;
}

const CopyToClipboardButton = (props: IProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(props.text.toString());
  };

  return (
    <>
      <Tooltip title="Copy Address">
        <IconButton onClick={handleClick} color="primary">
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
      <Snackbar
        message="Copied to clibboard"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
};

export default CopyToClipboardButton;
