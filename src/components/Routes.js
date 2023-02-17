import React from 'react';
import { Routes as Switch, Route, Navigate} from 'react-router-dom'
import Results from './Results'

const Routes = () => {
  return (
    <div className='p-4'>
        <Switch>
            <Route exact path="/"  element={ () => <Navigate to="/search" />}  />
            <Route exact path={['/search', '/images', '/news', '/videos']}>
                <Results />
            </Route>
        </Switch>
    </div>
  )
}

export default Routes