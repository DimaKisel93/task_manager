import { Alert, CircularProgress } from '@mui/material'

interface ErrorStateProps {
  message: string
}

interface EmptyStateProps {
  message: string
}

interface LoadingStateProps {
  size?: number
}

export function LoadingState({ size }: LoadingStateProps) {
  return <CircularProgress size={size} />
}

export function ErrorState({ message }: ErrorStateProps) {
  return <Alert severity="error">{message}</Alert>
}

export function EmptyState({ message }: EmptyStateProps) {
  return <Alert severity="info">{message}</Alert>
}
