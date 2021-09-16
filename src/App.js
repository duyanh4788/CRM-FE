import ListUser from "./Component/ListUser";
import Modal from "./Component/Modal";
import ModalUser from "./Component/Modal/UpdateUser_modal/index";
function App() {
  return (
    <div className="App">
      <Modal />
      <ModalUser />
      <ListUser />
    </div>
  );
}

export default App;
