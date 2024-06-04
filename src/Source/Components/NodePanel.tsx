import { Box } from '@mui/material'
import MessageIcon from './Nodes/MessageIcon'
import SquareIcon from './Nodes/SquareIcon'

export default function NodePanel() {
  return (
    <Box sx={{
      padding: "10px 5px", display: "flex", 
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      flexWrap:"nowrap"
    }} >
      <MessageIcon />
      <SquareIcon />
    </Box>
  )
}
