import './App.css';
import Dashboard from './components/DashBoard';
import logo from './assets/logo.png';

function App() {
  return (
    <div>
      <div className="header">
        <img src={logo} alt="NeuroData Logo" className="logo" />
        <h1 className="title">Dynamic Neurological Dashboard</h1>
      </div>
      <Dashboard />
    </div>
  );
}

export default App;
