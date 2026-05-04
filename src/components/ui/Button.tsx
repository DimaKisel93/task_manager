import { Button, type ButtonProps } from '@mui/material'

type AppButtonProps = ButtonProps

export function AppButton(props: AppButtonProps) {
  return <Button {...props} />
}
