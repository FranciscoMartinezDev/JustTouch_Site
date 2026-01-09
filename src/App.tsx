import { RouterProvider } from 'react-router';
import { router } from './Routes';
import { AppProvider } from '@/Context/AppContext';
import { AutheticationProvider } from '@/Context/AuthenticationContext';


function App() {
  return (
    <AppProvider>
      <AutheticationProvider>
        <RouterProvider router={router} />
      </AutheticationProvider>
    </AppProvider>
  )
}

export default App
