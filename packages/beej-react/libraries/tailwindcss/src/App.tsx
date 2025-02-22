import CustomInput from "./components/custom/custom-input";
import Button from "./components/ui/button";

function App() {
  return (
    <div className="p-12">
      <Button variant="ghost" colorscheme={"primary"}>
        This is button
      </Button>
      <CustomInput label="Name" required colorscheme={"success"} />
    </div>
  );
}

export default App;
