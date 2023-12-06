import { Route, Switch } from 'react-router-dom';
import { Todolist } from '../pages/Todolist';
import { Kanban } from '../pages/Kanban';
import { Notetaking } from '../pages/Notetaking';

export const AppPage = () => {
  return (
    <Switch>
      <Route path="/Todolist">
        <Todolist />
      </Route>
      <Route path="/Kanban">
        <Kanban />
      </Route>
      <Route path="/Notetaking">
        <Notetaking />
      </Route>
    </Switch>
  )
}
