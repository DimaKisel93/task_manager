import { AppButton } from '../ui'

interface FormModalActionsProps {
  cancelText: string
  submitText: string
  onCancel: () => void
  isSubmitting: boolean
  submitFormId?: string
  onConfirm?: () => void
  confirmColor?: 'primary' | 'error'
}

export function FormModalActions({
  cancelText,
  submitText,
  onCancel,
  isSubmitting,
  submitFormId,
  onConfirm,
  confirmColor = 'primary',
}: FormModalActionsProps) {
  const submitProps = submitFormId
    ? { type: 'submit' as const, form: submitFormId }
    : { type: 'button' as const, onClick: onConfirm }

  return (
    <>
      <AppButton onClick={onCancel} disabled={isSubmitting}>
        {cancelText}
      </AppButton>
      <AppButton
        {...submitProps}
        variant="contained"
        color={confirmColor}
        disabled={isSubmitting}
      >
        {submitText}
      </AppButton>
    </>
  )
}
