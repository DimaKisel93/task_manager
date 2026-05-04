import { AppBar, Box, Button, Container, Toolbar } from '@mui/material'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { TasksPage } from './pages/TasksPage'
import { TaskDetailsPage } from './pages/TaskDetailsPage'
import { appStyles } from './constants/styles'

function App() {
  return (
    <Box sx={appStyles.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Менеджер задач
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={appStyles.container}>
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/task/:taskId" element={<TaskDetailsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </Box>
  )
}

export default App
