import Main from "./components/Main/Main";
import { ModalProvider } from "./context/modalContext";
const App = () => {
  return (
    <ModalProvider>
        <Main/>
    </ModalProvider>
  )
}

export default App;
