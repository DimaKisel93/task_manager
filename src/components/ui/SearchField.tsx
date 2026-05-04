import { TextField, type SxProps, type Theme } from '@mui/material'

interface SearchFieldProps {
  label: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  sx?: SxProps<Theme>
}

export function SearchField({ label, placeholder, value, onChange, sx }: SearchFieldProps) {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      sx={sx}
    />
  )
}
