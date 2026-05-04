import { MenuItem, TextField, type SxProps, type Theme } from '@mui/material'

interface SelectOption {
  value: string
  label: string
}

interface SelectFieldProps {
  label: string
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
  sx?: SxProps<Theme>
  size?: 'small' | 'medium'
  disabled?: boolean
  fullWidth?: boolean
  onClick?: (event: React.MouseEvent) => void
}

export function SelectField({
  label,
  value,
  options,
  onChange,
  sx,
  size = 'medium',
  disabled = false,
  fullWidth = false,
  onClick,
}: SelectFieldProps) {
  return (
    <TextField
      select
      label={label}
      value={value}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      onChange={(event) => onChange(event.target.value)}
      sx={sx}
      onClick={onClick}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}
