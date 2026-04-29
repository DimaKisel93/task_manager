import { Button, DialogContentText } from '@mui/material'
import { BaseModal } from './BaseModal'

interface DeleteTaskConfirmModalProps {
  open: boolean
  taskTitle: string
  isDeleting: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteTaskConfirmModal({
  open,
  taskTitle,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteTaskConfirmModalProps) {
  return (
    <BaseModal
      open={open}
      title="Delete task?"
      onClose={onClose}
      content={
        <DialogContentText>
          This action cannot be undone. Are you sure you want to delete "{taskTitle}"?
        </DialogContentText>
      }
      actions={
        <>
          <Button onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button color="error" variant="contained" disabled={isDeleting} onClick={onConfirm}>
            Delete
          </Button>
        </>
      }
    />
  )
}

