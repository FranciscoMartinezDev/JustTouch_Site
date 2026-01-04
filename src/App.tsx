import { RouterProvider } from 'react-router';
import { router } from './Routes';
import { AppProvider } from '@/Context/AppContext';

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}

export default App
