import CreateCustomer from "./featured/customers/CreateCustomer";
import Customer from "./featured/customers/Customer";
import AccountOperations from "./featured/account/AccountOperations";
import BalanceDisplay from "./featured/account/BalanceDisplay";
import { useSelector } from "react-redux";

function App() {
  const fullName = useSelector(state => state.customer.fullName)



  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {fullName === "" 
      ? <CreateCustomer />
      : <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      }
      
      
    </div>
  );
}

export default App;
