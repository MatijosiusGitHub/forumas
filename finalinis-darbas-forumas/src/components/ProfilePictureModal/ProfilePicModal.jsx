import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const style2 = {
  color: "transparent",
  width: "250px",
  height: "250px",
  borderRadius: "50%",
  cursor: "pointer",
};

export default function BasicModal({ user }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button className="knope" sx={style2} onClick={handleOpen}>
        See picture
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <Typography
            id="modal-modal-title"
            variant="undefined"
            component="image"
          >
            <img src={user.picture} alt="main picture" />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
