import Desktop from './Pages/Desktop'
import Mobile from './Pages/Mobile';

function App() {

  const ratio = window.innerWidth / window.innerHeight
  return (
    <div className="App">
      <Mobile />
      {/* {ratio > 1 ? <Desktop /> : <Mobile />} */}
    </div>
  );
}

export default App;
