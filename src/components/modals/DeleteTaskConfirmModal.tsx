import { DialogContentText } from '@mui/material'
import { BaseModal } from './BaseModal'
import { FormModalActions } from './FormModalActions'

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
        <FormModalActions
          cancelText="Cancel"
          submitText="Delete"
          onCancel={onClose}
          isSubmitting={isDeleting}
          onConfirm={onConfirm}
          confirmColor="error"
        />
      }
    />
  )
}

