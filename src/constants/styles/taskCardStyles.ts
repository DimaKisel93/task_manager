export const taskCardStyles = {
  default: {
    transition: 'all 0.2s ease',
    border: '2px solid',
    borderColor: 'primary.main',
  },
  overdue: {
    border: '2px solid',
    borderColor: 'error.main',
  },
  statusControl: {
    mt: 1,
    minWidth: 180,
  },
  description: {
    mt: 1,
  },
  chipsRow: {
    mt: 1,
  },
  captionPrimary: {
    mt: 1,
    color: 'text.secondary',
    display: 'block',
  },
  captionSecondary: {
    color: 'text.secondary',
    display: 'block',
  },
  getCard: (isOverdue: boolean) => ({
    ...taskCardStyles.default,
    ...(isOverdue ? taskCardStyles.overdue : {}),
  }),
}
