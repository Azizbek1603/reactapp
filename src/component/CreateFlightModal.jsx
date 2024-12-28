import { useState } from 'react';
import { X } from 'lucide-react';

const CreateFlightModal = ({ isOpen, onClose, onSubmit }) => {
  const [flightData, setFlightData] = useState({
    flight_number: '',
    airline: '',
    departure_airport: '',
    departure_country: '',
    arrival_airport: '',
    arrival_country: '',
    departure_time: '',
    arrival_time: '',
    status: 'Scheduled',
    aircraft: '',
    price: '',
    fuelSchedule: '',
    crewSchedule: {
      pilot: '',
      co_pilot: '',
      cabin_crew: '',
      crew_rest_period: '',
    },
    groundService: {
      runway: '',
      gate: '',
      taxi: '',
      bus: '',
      terminal: '',
    },
    weather: '',
    cargoDetails: '',
    restInformation: {
      name: '',
      address: '',
      latitude: '',
      longitude: '',
      rooms: '',
      amenities: '',
      type: 'Hotel',
      status: 'Operational',
      registered_pilot: '',
      duration: '',
      startTime: '',
      endTime: '',
      managedBy: '',
      managedByContact: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNestedChange = (category, field, value) => {
    setFlightData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(flightData);
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <button style={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        <h2 style={styles.modalTitle}>Create New Flight</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formSection}>
            <h3 style={styles.sectionTitle}>Flight Details</h3>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="flight_number">Flight Number</label>
                <input
                  type="text"
                  id="flight_number"
                  name="flight_number"
                  value={flightData.flight_number}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="airline">Airline</label>
                <input
                  type="text"
                  id="airline"
                  name="airline"
                  value={flightData.airline}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="departure_airport">Departure Airport</label>
                <input
                  type="text"
                  id="departure_airport"
                  name="departure_airport"
                  value={flightData.departure_airport}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="arrival_airport">Arrival Airport</label>
                <input
                  type="text"
                  id="arrival_airport"
                  name="arrival_airport"
                  value={flightData.arrival_airport}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="departure_time">Departure Time</label>
                <input
                  type="datetime-local"
                  id="departure_time"
                  name="departure_time"
                  value={flightData.departure_time}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="arrival_time">Arrival Time</label>
                <input
                  type="datetime-local"
                  id="arrival_time"
                  name="arrival_time"
                  value={flightData.arrival_time}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={flightData.status}
                  onChange={handleChange}
                  required
                  style={styles.input}
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Delayed">Delayed</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="aircraft">Aircraft</label>
                <input
                  type="text"
                  id="aircraft"
                  name="aircraft"
                  value={flightData.aircraft}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={flightData.price}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="fuelSchedule">Fuel Schedule</label>
                <input
                  type="text"
                  id="fuelSchedule"
                  name="fuelSchedule"
                  value={flightData.fuelSchedule}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>
          </div>

          <div style={styles.formSection}>
            <h3 style={styles.sectionTitle}>Crew Schedule</h3>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="pilot">Pilot</label>
                <input
                  type="text"
                  id="pilot"
                  name="pilot"
                  value={flightData.crewSchedule.pilot}
                  onChange={(e) => handleNestedChange('crewSchedule', 'pilot', e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="co_pilot">Co-Pilot</label>
                <input
                  type="text"
                  id="co_pilot"
                  name="co_pilot"
                  value={flightData.crewSchedule.co_pilot}
                  onChange={(e) => handleNestedChange('crewSchedule', 'co_pilot', e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="cabin_crew">Cabin Crew</label>
                <input
                  type="text"
                  id="cabin_crew"
                  name="cabin_crew"
                  value={flightData.crewSchedule.cabin_crew}
                  onChange={(e) => handleNestedChange('crewSchedule', 'cabin_crew', e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="crew_rest_period">Crew Rest Period</label>
                <input
                  type="text"
                  id="crew_rest_period"
                  name="crew_rest_period"
                  value={flightData.crewSchedule.crew_rest_period}
                  onChange={(e) => handleNestedChange('crewSchedule', 'crew_rest_period', e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>
          </div>

          <div style={styles.formSection}>
            <h3 style={styles.sectionTitle}>Ground Service</h3>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="runway">Runway</label>
                <input
                  type="text"
                  id="runway"
                  name="runway"
                  value={flightData.groundService.runway}
                  onChange={(e) => handleNestedChange('groundService', 'runway', e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="gate">Gate</label>
                <input
                  type="text"
                  id="gate"
                  name="gate"
                  value={flightData.groundService.gate}
                  onChange={(e) => handleNestedChange('groundService', 'gate', e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="taxi">Taxi</label>
                <input
                  type="text"
                  id="taxi"
                  name="taxi"
                  value={flightData.groundService.taxi}
                  onChange={(e) => handleNestedChange('groundService', 'taxi', e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="bus">Bus</label>
                <input
                  type="text"
                  id="bus"
                  name="bus"
                  value={flightData.groundService.bus}
                  onChange={(e) => handleNestedChange('groundService', 'bus', e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="terminal">Terminal</label>
                <input
                  type="text"
                  id="terminal"
                  name="terminal"
                  value={flightData.groundService.terminal}
                  onChange={(e) => handleNestedChange('groundService', 'terminal', e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>
          </div>

          <div style={styles.formSection}>
            <h3 style={styles.sectionTitle}>Additional Information</h3>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="weather">Weather</label>
                <input
                  type="text"
                  id="weather"
                  name="weather"
                  value={flightData.weather}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="cargoDetails">Cargo Details</label>
                <textarea
                  id="cargoDetails"
                  name="cargoDetails"
                  value={flightData.cargoDetails}
                  onChange={handleChange}
                  style={{...styles.input, height: '80px'}}
                />
              </div>
            </div>
          </div>

          <div style={styles.formSection}>
            <h3 style={styles.sectionTitle}>Rest Information</h3>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="rest_name">Hotel Name</label>
                <input
                  type="text"
                  id="rest_name"
                  name="rest_name"
                  value={flightData.restInformation.name}
                  onChange={(e) => handleNestedChange('restInformation', 'name', e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="rest_address">Hotel Address</label>
                <input
                  type="text"
                  id="rest_address"
                  name="rest_address"
                  value={flightData.restInformation.address}
                  onChange={(e) => handleNestedChange('restInformation', 'address', e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="rest_rooms">Available Rooms</label>
                <input
                  type="text"
                  id="rest_rooms"
                  name="rest_rooms"
                  value={flightData.restInformation.rooms}
                  onChange={(e) => handleNestedChange('restInformation', 'rooms', e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="rest_amenities">Amenities</label>
                <input
                  type="text"
                  id="rest_amenities"
                  name="rest_amenities"
                  value={flightData.restInformation.amenities}
                  onChange={(e) => handleNestedChange('restInformation', 'amenities', e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>
          </div>

          <button type="submit" style={styles.submitButton}>Create Flight</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed' ,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto' ,
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
    closeButton: {
    position: 'absolute' ,
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.5rem',
    color: '#333',
  },
  modalTitle: {
    marginTop: 0,
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' ,
    gap: '1.5rem',
  },
  formSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#34495e',
  },
  formRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '1rem',
  },
  formGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' ,
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  },
  submitButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
};

export default CreateFlightModal;
