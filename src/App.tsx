import { useEffect } from 'react'
import './App.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import HomePage from './components/HomePage';
import Users from './components/Users';
import Posts from './components/Posts';

function App() {
  const notify = () => toast.success("Welcome! 🎉");

  useEffect(() => {
    notify();
  }, []);

  return (

    <>
      <BrowserRouter>
        <ToastContainer icon={false} />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/users" >
            <Users />
          </Route>
          <Route path="/posts" >
            <Posts />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
