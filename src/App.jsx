import Sidebar from "./components/Sidebar/Sidebar"
import Main from './components/Main/Main'
function App() {

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Main />
      </div>
    </div>
  )
}

export default App
