import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AddUsers from './components/AddUsers';
import Home from './components/Home';
import Update from './components/Update';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      loader: ()=> fetch('http://localhost:5000/users')
    },
    {
      path: 'users/add',
      element: <AddUsers />
    },
    {
      path: 'update/:id',
      element: <Update />,
      loader: ({params})=>fetch(`http://localhost:5000/users/${params.id}`)
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
