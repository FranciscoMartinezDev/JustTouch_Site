import { RouterProvider } from 'react-router';
import { router } from './Routes';
import { AppProvider } from '@/Context/AppContext';
import { AutheticationProvider } from '@/Context/AuthenticationContext';
import { MenuProvider } from '@/Context/MenuContext';


function App() {
  return (
    <AppProvider>
      <AutheticationProvider>
        <MenuProvider>
          <RouterProvider router={router} />
        </MenuProvider>
      </AutheticationProvider>
    </AppProvider>
  )
}

export default App
