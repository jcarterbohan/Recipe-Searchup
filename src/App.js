import Pages from "./pages/Pages";
import Categories from "./components/Categories";
import { BrowserRouter} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <h1>Hel</h1>
      <BrowserRouter>

      <Categories/> 
      <Pages/>
      </BrowserRouter>

    </div>
  );
}

export default App;