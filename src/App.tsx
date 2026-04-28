import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { TasksPage } from './pages/TasksPage'
import { TaskDetailsPage } from './pages/TaskDetailsPage'

function App() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f7fb' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Tasks
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/tasks/:taskId" element={<TaskDetailsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </Box>
  )
}

export default App
